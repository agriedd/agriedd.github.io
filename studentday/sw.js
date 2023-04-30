const CACHE_NAME = 'my-cache';
const OFFLINE_URL = '/studentday/offline.html';

// Install the Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          '/studentday',
          '/studentday/index.html',
          '/studentday/styles.css',
          '/studentday/app.js',
          OFFLINE_URL
        ])
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        } else if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
          return caches.match(OFFLINE_URL);
        }
        return fetch(event.request);
      })
  );
});
