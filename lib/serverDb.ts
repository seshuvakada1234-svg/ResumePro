import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, doc, getDoc, setDoc, updateDoc, type Firestore } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';
import { ResumeData } from '@/types/resume';

export interface StoredResumeRecord {
  id: string;
  accessToken: string;
  data: ResumeData;
  targetRole?: string;
  targetJobDescription?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

let serverApp: FirebaseApp | null = null;
let serverAuth: Auth | null = null;
let serverDb: Firestore | null = null;
let authPromise: Promise<void> | null = null;

function getServerDb(): { db: Firestore; auth: Auth } {
  if (!serverApp) {
    serverApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  }
  if (!serverAuth) {
    serverAuth = getAuth(serverApp);
  }
  if (!serverDb) {
    try {
      serverDb = initializeFirestore(serverApp, {
        experimentalForceLongPolling: true,
        experimentalAutoDetectLongPolling: false,
      }, firebaseConfig.firestoreDatabaseId);
    } catch {
      serverDb = getFirestore(serverApp, firebaseConfig.firestoreDatabaseId);
    }
  }

  return { db: serverDb, auth: serverAuth };
}

async function ensureAuthenticated(): Promise<void> {
  const { auth } = getServerDb();
  if (auth.currentUser) return;

  if (!authPromise) {
    authPromise = (async () => {
      try {
        await signInAnonymously(auth);
      } catch (err: any) {
        console.error('Server Firestore auth error:', err.message);
        throw new Error('Failed to authenticate with database backend');
      } finally {
        authPromise = null;
      }
    })();
  }

  await authPromise;
}

function cleanPayload<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function persistResumeRecord(record: StoredResumeRecord): Promise<void> {
  await ensureAuthenticated();
  const { db } = getServerDb();
  const ref = doc(db, 'mcp_resumes', record.id);
  
  // Persist directly to Firestore with sanitized payload (no undefined keys)
  const payload = cleanPayload({
    id: record.id,
    accessToken: record.accessToken,
    data: record.data,
    targetRole: record.targetRole || '',
    targetJobDescription: record.targetJobDescription || '',
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    expiresAt: record.expiresAt,
  });

  await setDoc(ref, payload);
}

export async function fetchResumeRecord(id: string): Promise<StoredResumeRecord | null> {
  if (!id) return null;
  await ensureAuthenticated();
  const { db } = getServerDb();
  const ref = doc(db, 'mcp_resumes', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data() as StoredResumeRecord;

  // Check expiration (30 days)
  if (data.expiresAt && new Date(data.expiresAt).getTime() < Date.now()) {
    return null;
  }

  return data;
}

export async function updateResumeRecord(
  id: string,
  updatedRecord: StoredResumeRecord
): Promise<void> {
  await ensureAuthenticated();
  const { db } = getServerDb();
  const ref = doc(db, 'mcp_resumes', id);

  const payload = cleanPayload({
    id: updatedRecord.id,
    accessToken: updatedRecord.accessToken,
    data: updatedRecord.data,
    targetRole: updatedRecord.targetRole || '',
    targetJobDescription: updatedRecord.targetJobDescription || '',
    createdAt: updatedRecord.createdAt,
    updatedAt: updatedRecord.updatedAt,
    expiresAt: updatedRecord.expiresAt,
  });

  await setDoc(ref, payload);
}
