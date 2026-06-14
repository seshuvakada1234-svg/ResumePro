'use client';

import React from 'react';
import { signInWithGoogle, logout, auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export const Auth: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000); // failsafe

    const unsubscribe = auth.onAuthStateChanged(
      (u) => { clearTimeout(timeout); setUser(u); setLoading(false); },
      (err) => { clearTimeout(timeout); console.error(err); setLoading(false); }
    );

    return () => { unsubscribe(); clearTimeout(timeout); };
  }, []);

  if (loading) return (
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  );

  if (user) {
    return (
      <div className="flex items-center gap-1 sm:gap-4 shrink-0 flex-nowrap">
        <div className="flex items-center gap-1 md:gap-2 p-0.5 md:px-3 md:py-1.5 bg-gray-50 rounded-full border border-gray-100 shrink-0 flex-nowrap">
          {user.photoURL ? (
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
          <span className="text-sm font-medium text-gray-700 hidden sm:inline select-none truncate max-w-[100px]">{user.displayName}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 md:gap-2 px-1.5 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-600 hover:text-red-600 transition-colors shrink-0 flex-nowrap"
        >
          <LogOut className="logout-icon w-5 h-5 md:w-[18px] md:h-[18px]" size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-6 md:py-2.5 bg-indigo-600 text-white text-xs md:text-base font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap shrink-0 flex-nowrap"
    >
      <LogIn className="w-4 h-4 md:w-[18px] md:h-[18px]" size={18} />
      <span className="text-[11px] md:text-base font-bold">Login with Google</span>
    </button>
  );
};