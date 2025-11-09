
var CACHE_NAME = "enfroApp-sc-v2";
var REQUIRED_FILES = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./css/bootstrap.min.css",
  "./css/swiper-bundle.min.css",
  "./js/main.js",
  "./js/jquery.min.js",
  "./js/bootstrap.min.js",
  "./pan-application.html",
  "./passport-prep.html",
  "./services.html",
  "./service-detail.html",
  "./data/services.json",
  "./js/sovereign-i18n.js",
  "./js/sovereign-security.js"
];

self.addEventListener('install', function(event) {
  // Perform install step:  loading each required file into cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Add all offline dependencies to the cache
        return cache.addAll(REQUIRED_FILES);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
        // Not in cache - return the result from the live server
        // `fetch` is essentially a "fallback"
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  // Calling claim() to force a "controllerchange" event on navigator.serviceWorker
  event.waitUntil(self.clients.claim());
});