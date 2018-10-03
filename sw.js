var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
  '/',
  'fallback.json',
  'assets/woman.jpg',
  'assets/main.css',
  'js/main.js',
  'js/jquery.min.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheNames){
          return cacheNames != CACHE_NAME
        }).map(function(cacheName) {
            return caches.delete(cacheName)
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var request = event.request;
  var url     = new URL(request.url);
  //Separate response if cache from internal 
  if(url.origin === location.origin){
      event.respondWith(
        caches.match(request).then(function(response){
          return response || fetch(request)
        })
      );  
  }else{// API cache
      event.respondWith(
        caches.open("Api-cache").then(function(cache){
          return fetch(request).then(function(apiRespone){
            cache.put(request, apiRespone.clone())
            return apiRespone
          })
        }).catch(function(){
          return caches.match(request).then(function(){
            if(response) return response
              return caches.match('/fallback.json')
          })
        })
      );
  }
});