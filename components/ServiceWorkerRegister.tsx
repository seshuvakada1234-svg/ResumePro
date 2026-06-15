'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        // 1. Securely register the main clean PWA Service Worker on the root scope
        try {
          const mainRegistration = await navigator.serviceWorker.register('/sw.js');
          console.log('Main PWA ServiceWorker registered with scope:', mainRegistration.scope);
        } catch (error) {
          console.error('Main ServiceWorker registration failed:', error);
        }

        // 2. Perform a fast network probe to check if Monetag domain is accessible.
        // Adblockers usually block these domains completely, causing scripts or network calls to fail.
        // If it is blocked, we avoid registering the Monetag SW to prevent registration timeout errors.
        let isMonetagAvailable = false;
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1500);
          
          await fetch("https://5gvci.com/act/files/service-worker.min.js?r=sw", {
            method: "HEAD",
            mode: "no-cors",
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          isMonetagAvailable = true;
        } catch (e) {
          console.warn("Monetag domain is blocked or unreachable (usually due to Adblocker). Skipping Monetag SW registration.");
        }

        if (isMonetagAvailable) {
          try {
            // Register Monetag SW under a dedicated scope to prevent any conflicts with the main SW
            const monetagRegistration = await navigator.serviceWorker.register('/monetag-sw.js', {
              scope: '/monetag-ads/'
            });
            console.log('Monetag ServiceWorker registered with scope:', monetagRegistration.scope);
          } catch (error) {
            console.error('Monetag ServiceWorker registration failed:', error);
          }
        }
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        const handleLoad = () => {
          registerSW();
        };
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []);

  return null;
}
