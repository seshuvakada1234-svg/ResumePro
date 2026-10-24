import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';
import { getFirestore, initializeFirestore, setLogLevel, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

let cachedServices: FirebaseServices | null = null;
let initPromise: Promise<FirebaseServices> | null = null;
let isSignInInProgress = false;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

function getOrInitFirestore(app: FirebaseApp, databaseId?: string): Firestore {
  try {
    return databaseId
      ? initializeFirestore(app, {
          experimentalForceLongPolling: true,
          experimentalAutoDetectLongPolling: false,
        }, databaseId)
      : initializeFirestore(app, {
          experimentalForceLongPolling: true,
          experimentalAutoDetectLongPolling: false,
        });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('already been started')) {
      return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
    }
    throw err;
  }
}

export async function getFirebaseServices(): Promise<FirebaseServices> {
  if (cachedServices) {
    return cachedServices;
  }

  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK can only be initialized in the browser.');
  }

  if (!initPromise) {
    initPromise = (async () => {
      if (getApps().length > 0) {
        const app = getApp();
        const auth = getAuth(app);
        const databaseId = (app.options as any)?.firestoreDatabaseId;
        const db = getOrInitFirestore(app, databaseId);
        const storage = getStorage(app);
        cachedServices = { app, auth, db, storage };
        return cachedServices;
      }

      // Fetch config dynamically from server route so credentials never get baked into static client bundles
      const res = await fetch('/api/firebase-config');
      if (!res.ok) {
        throw new Error('Failed to fetch Firebase configuration');
      }

      const data = await res.json();
      if (!data?.payload) {
        throw new Error('Invalid Firebase configuration response');
      }

      // Decode payload at runtime
      const decodedJson = atob(data.payload);
      const config = JSON.parse(decodedJson);

      if (!config.apiKey || !config.projectId) {
        throw new Error('Incomplete Firebase configuration');
      }

      const app = initializeApp(config);
      setLogLevel('error');

      const auth = getAuth(app);
      const db = getOrInitFirestore(app, config.firestoreDatabaseId);
      const storage = getStorage(app);

      cachedServices = { app, auth, db, storage };
      return cachedServices;
    })();
  }

  return initPromise;
}

// Pre-warm Firebase initialization in the browser so auth is immediately ready on user click
if (typeof window !== 'undefined') {
  getFirebaseServices().catch((err) => {
    console.warn('Pre-warming Firebase initialization deferred:', err);
  });
}

// ✅ GOOGLE LOGIN (REDIRECT - ZERO POPUPS, PREVENTS BROWSER POPUP BLOCKING)
export async function signInWithGoogle() {
  if (isSignInInProgress) {
    console.warn('Sign-in with Google redirect is already in progress.');
    return;
  }
  isSignInInProgress = true;
  try {
    const services = cachedServices || (await getFirebaseServices());
    await signInWithRedirect(services.auth, googleProvider);
  } catch (err: unknown) {
    isSignInInProgress = false;
    console.error('Sign-in with Google redirect error:', err);
    throw err;
  }
}

// ✅ GOOGLE LOGIN REDIRECT ALIAS
export async function signInWithGoogleRedirect() {
  return signInWithGoogle();
}

// ✅ LOGOUT
export async function logout() {
  const { auth } = await getFirebaseServices();
  return signOut(auth);
}

// ✅ AUTH STATE SUBSCRIPTION WITH REDIRECT RESULT CHECK
export async function subscribeToAuth(
  onUser: (user: User | null) => void,
  onError?: (err: Error) => void
): Promise<() => void> {
  try {
    const { auth } = await getFirebaseServices();
    
    // Process any returning redirect flow seamlessly
    try {
      const redirectResult = await getRedirectResult(auth);
      if (redirectResult?.user) {
        onUser(redirectResult.user);
      }
    } catch (redirectErr: any) {
      console.warn('Redirect sign-in inspection:', redirectErr);
      if (onError && redirectErr instanceof Error) {
        onError(redirectErr);
      }
    }

    return onAuthStateChanged(auth, onUser, onError);
  } catch (err) {
    if (onError && err instanceof Error) {
      onError(err);
    }
    return () => {};
  }
}

// Legacy proxies to ensure backwards compatibility without breaking any callers
export const auth: Auth = new Proxy({} as Auth, {
  get(_target, prop) {
    if (cachedServices) {
      return (cachedServices.auth as any)[prop];
    }
    if (prop === 'onAuthStateChanged') {
      return (observerOrNext: any, error?: any, completed?: any) => {
        let cleanup: (() => void) | undefined;
        let isCleanedUp = false;
        getFirebaseServices()
          .then(({ auth }) => {
            if (!isCleanedUp) {
              cleanup = onAuthStateChanged(auth, observerOrNext, error, completed);
            }
          })
          .catch((err) => {
            if (error) error(err);
          });
        return () => {
          isCleanedUp = true;
          if (cleanup) cleanup();
        };
      };
    }
    return undefined;
  },
});

export const db: Firestore = new Proxy({} as Firestore, {
  get(_target, prop) {
    if (cachedServices) {
      return (cachedServices.db as any)[prop];
    }
    return undefined;
  },
});

export const storage: FirebaseStorage = new Proxy({} as FirebaseStorage, {
  get(_target, prop) {
    if (cachedServices) {
      return (cachedServices.storage as any)[prop];
    }
    return undefined;
  },
});

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