const CACHE_NAME = 'alfabeto-v2';
const APP_SHELL = [
  './',
  './index.html',
  './selecionaletra.css',
  './selecionaletra.js',
  './manifest.json',
  './brick.png',
  './brick.jpg',
  './abc.jpg',
  './mixkit-game-show-fun-suspense-942.wav',
  './mixkit-correct-answer-tone-2870.wav',
  './mixkit-completion-of-a-level-2063.wav'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy));
        }
        return response;
      });
    })
  );
});
