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

export const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = 'my-6 px-2',
  minHeight = { mobile: '100px', desktop: '250px' },
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeAd = () => {
      if (!adRef.current || isInitialized.current) return;

      // Check if the ad has already been initialized by AdSense
      if (adRef.current.getAttribute('data-adsbygoogle-status') === 'done') {
        isInitialized.current = true;
        return;
      }

      // Check for available width to prevent "No slot size" errors
      const width = containerRef.current?.offsetWidth || 0;
      
      // AdSense typically needs at least 120px for responsive ads, 
      // but we'll be safe and wait for at least 100px.
      // Also ensure the element is visible in the viewport or at least has a height.
      if (width < 100) {
        return;
      }

      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        isInitialized.current = true;
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };

    // Use ResizeObserver to wait for the container to have a valid width
    // Wrap in requestAnimationFrame to avoid "ResizeObserver loop completed with undelivered notifications"
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width >= 100 && !isInitialized.current) {
          window.requestAnimationFrame(() => {
            initializeAd();
          });
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initial attempt after a short delay to ensure layout stability
    const timer = setTimeout(initializeAd, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [adSlot]); // Re-run if adSlot changes (though usually it shouldn't)

  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX';

  return (
    <div 
      ref={containerRef}
      className={`w-full overflow-hidden flex justify-center items-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 transition-all relative ${className}`}
      style={{
        minHeight: `var(--ad-min-height, ${minHeight.mobile})`,
      }}
    >
      <style jsx>{`
        div {
          --ad-min-height: ${minHeight.mobile};
        }
        @media (min-width: 768px) {
          div {
            --ad-min-height: ${minHeight.desktop};
          }
        }
      `}</style>
      
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
      
      {/* Placeholder text for development/debugging, hidden in production if ad loads */}
      <div className="absolute text-[10px] text-gray-300 pointer-events-none uppercase tracking-widest font-bold">
        Advertisement
      </div>
    </div>
  );
};
