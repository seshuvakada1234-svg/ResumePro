import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let config: Record<string, string> | null = null;

    // Check firebase-applet-config.json securely on server only
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      try {
        const raw = fs.readFileSync(configPath, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.apiKey && parsed.projectId) {
          // Normalize key in case of character 0 vs O typo
          const cleanApiKey = parsed.apiKey === 'AIzaSyD4A7vwD4oZVJtej02E0riqOnEyOgGjQk0'
            ? 'AIzaSyD4A7vwD4oZVJtejO2E0riqOnEyOgGjQk0'
            : parsed.apiKey;

          config = {
            apiKey: cleanApiKey,
            authDomain: parsed.authDomain || 'studio-8830367951-73851.firebaseapp.com',
            projectId: parsed.projectId || 'studio-8830367951-73851',
            storageBucket: parsed.storageBucket || 'studio-8830367951-73851.firebasestorage.app',
            messagingSenderId: parsed.messagingSenderId || '303359164045',
            appId: parsed.appId || '1:303359164045:web:9bbbde70f885e31cf9acc4',
            firestoreDatabaseId: parsed.firestoreDatabaseId || '',
          };
        }
      } catch (err) {
        console.error('Error reading firebase-applet-config.json:', err);
      }
    }

    if (!config) {
      config = {
        apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyD4A7vwD4oZVJtejO2E0riqOnEyOgGjQk0',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'studio-8830367951-73851.firebaseapp.com',
        projectId: process.env.FIREBASE_PROJECT_ID || 'studio-8830367951-73851',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'studio-8830367951-73851.firebasestorage.app',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '303359164045',
        appId: process.env.FIREBASE_APP_ID || '1:303359164045:web:9bbbde70f885e31cf9acc4',
        firestoreDatabaseId: '',
      };
    }

    // Obfuscate payload so credentials are not transmitted as plain readable keys
    const encodedPayload = Buffer.from(JSON.stringify(config)).toString('base64');

    return NextResponse.json(
      { payload: encodedPayload },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Firebase config route error:', error);
    return NextResponse.json({ error: 'Config unavailable' }, { status: 500 });
  }
}
