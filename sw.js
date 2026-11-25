const CACHE_NAME = 'topfast-reports-v3';
const APP_SHELL = [
  './',
  './index.html',
  './crm-benchmark.html',
  './crm-issues.html',
  './submit.html',
  './admin.html',
  './report-viewer.html',
  './ai-config.js',
  './ai-assistant.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Skip cross-origin APIs (Cloudflare Worker / fonts) and large audio streams
  if (url.origin !== location.origin || url.pathname.endsWith('.m4a')) return;

  // Network-first for HTML/JSON so edits are always fresh; cache fallback for offline/instant mobile launch
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
