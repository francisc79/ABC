const CACHE_NAME = 'alfabeto-v1';
const urlsToCache = [
  './',
  './index.html',
  './selecionaletra.css',
  './selecionaletra.js',
  './brick.png',
  './mixkit-game-show-fun-suspense-942.wav',
  './mixkit-correct-answer-tone-2870.wav',
  './mixkit-completion-of-a-level-2063.wav'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});