'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const pushed = useRef(false);

  // ✅ Wait until width exists
  useEffect(() => {
    const check = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;

      // AdSense typically needs at least 120px for responsive ads.
      // We'll wait for at least 120px to be safe.
      if (width >= 120) {
        setReady(true);
      }
    };

    check();

    const observer = new ResizeObserver(check);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // ✅ Push ad only when ready
  useEffect(() => {
    if (!ready || pushed.current) return;

    // Small delay for layout stability
    const timer = setTimeout(() => {
      try {
        if (
          adRef.current &&
          adRef.current.getAttribute('data-adsbygoogle-status') !== 'done'
        ) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed.current = true;
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center ${className}`}
      style={{ minHeight: minHeight.mobile }}
    >
      {/* Responsive height */}
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

      {ready && (
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
      )}
    </div>
  );
};