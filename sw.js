// Service Worker for Burnout Test
const CACHE_NAME = 'burnout-test-v2';
const urlsToCache = [
  '/burnout-test/',
  '/burnout-test/index.html',
  '/burnout-test/css/style.css',
  '/burnout-test/js/app.js',
  '/burnout-test/js/i18n.js',
  '/burnout-test/js/locales/de.json',
  '/burnout-test/js/locales/en.json',
  '/burnout-test/js/locales/es.json',
  '/burnout-test/js/locales/fr.json',
  '/burnout-test/js/locales/hi.json',
  '/burnout-test/js/locales/id.json',
  '/burnout-test/js/locales/ja.json',
  '/burnout-test/js/locales/ko.json',
  '/burnout-test/js/locales/pt.json',
  '/burnout-test/js/locales/ru.json',
  '/burnout-test/js/locales/tr.json',
  '/burnout-test/js/locales/zh.json',
  '/burnout-test/icon-192.svg',
  '/burnout-test/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/burnout-test/index.html'))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
