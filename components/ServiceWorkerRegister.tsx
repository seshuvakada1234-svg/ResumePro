'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        let useMonetag = false;
        
        try {
          // Fast reachability probe with a 1.5 second timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1500);
          
          await fetch("https://5gvci.com/act/files/service-worker.min.js?r=sw", {
            method: "HEAD",
            mode: "no-cors",
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          useMonetag = true;
        } catch (e) {
          console.warn("Monetag Service Worker domain is blocked or offline. Falling back to clean Mode.");
        }

        const swUrl = useMonetag ? '/sw.js?monetag=true' : '/sw.js?monetag=false';

        try {
          const registration = await navigator.serviceWorker.register(swUrl);
          console.log('ServiceWorker registered with scope:', registration.scope, 'with monetag:', useMonetag);
        } catch (error) {
          console.error('ServiceWorker registration failed:', error);
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
