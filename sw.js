var GENERAL_CACHE_NAME = 'pwa-sikhgame'
var CACHE_NAME = GENERAL_CACHE_NAME + 'v1';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll([
       '/pwa-sikhgame/',
       '/pwa-sikhgame/index.html',
       '/pwa-sikhgame/bulma.min.css',
       '/pwa-sikhgame/index.css',
       '/pwa-sikhgame/manifest.json',
       '/pwa-sikhgame/vue.js'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || new Response("Nothing in the cache for this request");
    })
  );
});

// Remove old cache
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME !== cacheName &&  cacheName.startsWith(GENERAL_CACHE_NAME)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
