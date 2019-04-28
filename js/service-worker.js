self.addEventListener('install', function(event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(

    // Add cache the urls from urlsToCache
      caches.open('rest-static-v1').then(function (cache) {
          return cache.addAll([
          '/',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/css/styles.css',
          '/img/',
        ]);
      }).then(function() {
          console.log('WORKER: install completed');
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) return response;
        return fetch(event.request);
      })
  );
});