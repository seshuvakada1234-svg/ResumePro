"use client";

import React, { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdUnit: React.FC<AdUnitProps> = ({ slot, className = '' }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center min-h-[100px] overflow-hidden ${className}`}>
      <div className="text-center w-full">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Advertisement</p>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};
