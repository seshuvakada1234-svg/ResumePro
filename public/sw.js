// Dynamic service worker loader
const urlParams = new URL(self.location.href).searchParams;
const loadMonetag = urlParams.get('monetag') === 'true';

if (loadMonetag) {
  try {
    self.options = {
      domain: "5gvci.com",
      zoneId: 11149426
    };

    self.lary = "";

    importScripts("https://5gvci.com/act/files/service-worker.min.js?r=sw");
  } catch (e) {
    console.error("Monetag SW error:", e);
  }
} else {
  console.log("Service Worker started in offline-fallback/clean registration mode.");
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
