self.options = {
  domain: "5gvci.com",
  zoneId: 11149426
};

self.lary = "";

try {
  importScripts("https://5gvci.com/act/files/service-worker.min.js?r=sw");
} catch (e) {
  console.error("Monetag SW importScripts error:", e);
}
