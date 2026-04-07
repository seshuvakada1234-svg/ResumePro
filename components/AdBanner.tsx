'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  className?: string;
  minHeight?: {
    mobile: string;
    desktop: string;
  };
}

const ADS_CLIENT = "ca-pub-6397085715997255";

export const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = 'my-6 px-2',
  minHeight = { mobile: '100px', desktop: '250px' },
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    try {
      if (!adRef.current || isInitialized.current) return;

      // Prevent duplicate initialization
      if (adRef.current.getAttribute('data-adsbygoogle-status') === 'done') {
        isInitialized.current = true;
        return;
      }

      // Push ad safely
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      isInitialized.current = true;
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adSlot]);

  return (
    <div
      className={`w-full overflow-hidden flex justify-center items-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 transition-all relative ${className}`}
      style={{
        minHeight: minHeight.mobile,
      }}
    >
      {/* Responsive height styling */}
      <style jsx>{`
        div {
          min-height: ${minHeight.mobile};
        }
        @media (min-width: 768px) {
          div {
            min-height: ${minHeight.desktop};
          }
        }
      `}</style>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: minHeight.mobile,
        }}
        data-ad-client={ADS_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />

      {/* Optional label */}
      <div className="absolute text-[10px] text-gray-300 pointer-events-none uppercase tracking-widest font-bold">
        Advertisement
      </div>
    </div>
  );
};