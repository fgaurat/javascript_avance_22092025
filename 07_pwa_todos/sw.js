const STATIC_CACHE = 'pwa-todos-static-v1';
const API_CACHE = 'pwa-todos-api-cache-v1';
const API_URL = 'http://localhost:3000/todos';
const STATIC_ASSETS = [
  './',
  'index.html',
  'main.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

const responseWithSourceHeader = (response, source) => {
  const headers = new Headers(response.headers);
  headers.set('X-Cache-Source', source);
  return new Response(response.clone().body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, API_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(event.request.url);

  if (requestURL.href === API_URL) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(API_CACHE);
            cache.put(API_URL, networkResponse.clone());
          }
          return responseWithSourceHeader(networkResponse, 'network');
        } catch (error) {
          const cache = await caches.open(API_CACHE);
          const cachedResponse = await cache.match(API_URL);
          if (cachedResponse) {
            return responseWithSourceHeader(cachedResponse, 'cache');
          }
          return new Response(JSON.stringify([]), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'X-Cache-Source': 'fallback-empty',
            },
          });
        }
      })()
    );
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(STATIC_CACHE);
          const cachedPage = await cache.match('index.html');
          if (cachedPage) {
            return cachedPage;
          }
          return new Response('Mode hors connexion', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        }
      })()
    );
    return;
  }

  if (requestURL.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
        );
      })
    );
  }
});
