import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initializeFirestore, setLogLevel } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ USE DIRECT CONFIG (NO JSON IMPORT)
const firebaseConfig = {
  apiKey: "AIzaSyD4A7vwD4oZVJtejO2E0riqOnEyOgGjQk0",
  authDomain: "studio-8830367951-73851.firebaseapp.com",
  projectId: "studio-8830367951-73851",
  storageBucket: "studio-8830367951-73851.firebasestorage.app",
  messagingSenderId: "303359164045",
  appId: "1:303359164045:web:9bbbde70f885e31cf9acc4"
};

// ✅ SAFE INIT (PREVENTS MULTIPLE INIT ERRORS)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

setLogLevel('error');

// ✅ FIRESTORE
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: false,
});

// ✅ AUTH
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ GOOGLE LOGIN
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// ✅ LOGOUT
export const logout = () => signOut(auth);

// ✅ TYPES
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// ✅ ERROR HANDLER
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errorMessage = error instanceof Error ? error.message : String(error);

  if (
    errorMessage.includes('CANCELLED') ||
    errorMessage.includes('Disconnecting idle stream') ||
    errorMessage.includes('Timed out waiting for new targets')
  ) {
    console.warn(`Benign Firestore message (${operationType} on ${path}):`, errorMessage);
    return;
  }

  console.error('Firestore Error:', {
    error: errorMessage,
    operationType,
    path,
  });

  throw new Error(errorMessage);
}