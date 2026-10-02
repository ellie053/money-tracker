const CACHE_NAME = "my-money-v1";

const APP_FILES = [
   "./",
   "./index.html",
   "./manifest.json",
   "./boho-background",
   "./icons/icon-192.png",
   "./icons/icon-512.png"
];


self.addEventListener("install", event => {

   event.waitUntil(

       caches.open(CACHE_NAME)
           .then(cache => {

               return cache.addAll(APP_FILES);

           })

   );

});


self.addEventListener("activate", event => {

   event.waitUntil(

       caches.keys()
           .then(cacheNames => {

               return Promise.all(

                   cacheNames.map(name => {

                       if (name !== CACHE_NAME) {

                           return caches.delete(name);

                       }

                   })

               );

           })

   );

});


self.addEventListener("fetch", event => {

   event.respondWith(

       caches.match(event.request)
           .then(cachedResponse => {

               return cachedResponse ||
                   fetch(event.request);

           })

   );

});