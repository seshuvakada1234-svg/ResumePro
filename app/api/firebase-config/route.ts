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
          config = {
            apiKey: parsed.apiKey,
            authDomain: parsed.authDomain,
            projectId: parsed.projectId,
            storageBucket: parsed.storageBucket || '',
            messagingSenderId: parsed.messagingSenderId || '',
            appId: parsed.appId || '',
          };
        }
      } catch (err) {
        console.error('Error reading firebase-applet-config.json:', err);
      }
    }

    if (!config) {
      config = {
        apiKey: process.env.FIREBASE_API_KEY || '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
        projectId: process.env.FIREBASE_PROJECT_ID || '',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.FIREBASE_APP_ID || '',
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
