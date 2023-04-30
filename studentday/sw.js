const CACHE_NAME = 'my-cache-01';
const OFFLINE_URL = '/studentday/offline.html';

// Install the Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          '/studentday',
          '/studentday/index.html',
          '/studentday/assets/index-2c0059c2.css',
          '/studentday/assets/index-5c03fc3f.js',
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
