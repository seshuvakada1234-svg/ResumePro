'use client';

import React, { useState, useEffect } from 'react';
import {
  signInWithGoogle,
  logout,
  subscribeToAuth,
} from '@/lib/firebase';
import type { User } from 'firebase/auth';
import {
  LogIn,
  LogOut,
  User as UserIcon,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  X,
  RefreshCw,
} from 'lucide-react';

interface AuthErrorInfo {
  code: string;
  message: string;
  domain?: string;
  isUnauthorizedDomain?: boolean;
}

export const Auth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorInfo, setErrorInfo] = useState<AuthErrorInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 4000);

    subscribeToAuth(
      (u) => {
        if (!isMounted) return;
        clearTimeout(timeout);
        setUser(u);
        setLoading(false);
        if (u) {
          setErrorInfo(null);
        }
      },
      (err: any) => {
        if (!isMounted) return;
        clearTimeout(timeout);
        console.error('Auth state subscription error:', err);
        setLoading(false);
        const code = err?.code || '';
        const message = err?.message || 'Authentication error';
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

        if (code === 'auth/unauthorized-domain' || message.includes('unauthorized-domain')) {
          setErrorInfo({
            code: 'auth/unauthorized-domain',
            message:
              'This domain is not yet in the Firebase Authorized Domains list.',
            domain: currentHost,
            isUnauthorizedDomain: true,
          });
        }
      }
    ).then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setErrorInfo(null);
    setIsLoggingIn(true);
    try {
      // Initiates full-page redirect to Google OAuth without any popup window
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Login action encountered an error:', err);
      setIsLoggingIn(false);
      const code = err?.code || '';
      const message = err?.message || 'Failed to sign in with Google';
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

      if (code === 'auth/unauthorized-domain' || message.includes('unauthorized-domain')) {
        setErrorInfo({
          code: 'auth/unauthorized-domain',
          message:
            'This domain is not yet in the Firebase Authorized Domains list.',
          domain: currentHost,
          isUnauthorizedDomain: true,
        });
      } else {
        setErrorInfo({
          code,
          message:
            code === 'auth/network-request-failed'
              ? 'Network request failed. Please check your internet connection or ad blocker.'
              : message,
        });
      }
    }
  };

  const copyDomain = () => {
    if (errorInfo?.domain && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(errorInfo.domain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-1 sm:gap-4 shrink-0 flex-nowrap">
        <div className="flex items-center gap-1 md:gap-2 p-0.5 md:px-3 md:py-1.5 bg-gray-50 rounded-full border border-gray-100 shrink-0 flex-nowrap">
          {user.photoURL ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.photoURL}
              alt={user.displayName || ''}
              className="w-10 h-10 md:w-6 md:h-6 rounded-full profile-avatar object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-10 h-10 md:w-6 md:h-6 rounded-full bg-gray-200/50 flex items-center justify-center profile-avatar shrink-0">
              <UserIcon size={16} className="text-gray-400" />
            </div>
          )}
          <span className="text-sm font-medium text-gray-700 hidden sm:inline select-none truncate max-w-[100px]">
            {user.displayName}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 md:gap-2 px-1.5 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-600 hover:text-red-600 transition-colors shrink-0 flex-nowrap"
          title="Sign Out"
        >
          <LogOut className="logout-icon w-5 h-5 md:w-[18px] md:h-[18px]" size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-6 md:py-2.5 bg-indigo-600 text-white text-xs md:text-base font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap shrink-0 flex-nowrap disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isLoggingIn ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
            <span className="text-[11px] md:text-base font-bold">Redirecting...</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4 md:w-[18px] md:h-[18px]" size={18} />
            <span className="text-[11px] md:text-base font-bold">Login with Google</span>
          </>
        )}
      </button>

      {/* Helpful, Non-Blocking Modal for Deployment & Auth Diagnostics */}
      {errorInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setErrorInfo(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative border border-gray-100 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setErrorInfo(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {errorInfo.isUnauthorizedDomain
                    ? 'Firebase: Authorized Domain Required'
                    : 'Google Sign-In Issue'}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {errorInfo.code || 'Authentication Notice'}
                </p>
              </div>
            </div>

            {errorInfo.isUnauthorizedDomain ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Firebase Authentication requires every deployed domain to be added to
                  your project&apos;s <strong>Authorized Domains</strong> whitelist before Google OAuth can complete.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500 block">Domain to authorize:</span>
                    <span className="text-sm font-mono font-bold text-indigo-700 truncate block">
                      {errorInfo.domain}
                    </span>
                  </div>
                  <button
                    onClick={copyDomain}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-xs shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5 text-xs text-gray-700 space-y-2">
                  <span className="font-bold text-indigo-900 block">Quick 1-Minute Fix:</span>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>
                      Go to{' '}
                      <a
                        href="https://console.firebase.google.com/project/studio-8830367951-73851/authentication/settings"
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 font-semibold underline inline-flex items-center gap-0.5 hover:text-indigo-800"
                      >
                        Firebase Authentication Settings
                        <ExternalLink size={12} />
                      </a>
                    </li>
                    <li>
                      Scroll down to <strong>Authorized domains</strong> and click <strong>Add domain</strong>
                    </li>
                    <li>
                      Paste <code className="bg-white px-1 py-0.5 rounded border border-indigo-200 font-bold">{errorInfo.domain}</code> and save
                    </li>
                  </ol>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setErrorInfo(null)}
                    className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Continue as Guest
                  </button>
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <RefreshCw size={14} /> Retry Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {errorInfo.message}
                </p>
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setErrorInfo(null)}
                    className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <RefreshCw size={14} /> Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};