const CACHE_NAME = "cafeteria-cecytem-v4";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./encargada.html",
    "./cafeteria.css",
    "./manifest.json",

    "./imagenes/cecylogo.jpg",
    "./imagenes/icon-192.png",
    "./imagenes/icon-512.png",

    "./imagenes/imagestacosdorados.jpg",
    "./imagenes/tortajamon.jpg",
    "./imagenes/imagesyogurt.jpg",
    "./imagenes/Hamburguesa.jpg",
    "./imagenes/imagesburrito.jpg",
    "./imagenes/imageshotcakes.jpg",
    "./imagenes/imagesquesadillas.jpg",
    "./imagenes/imageshotdog.jpg",
    "./imagenes/imageslicuado.jpg",
    "./imagenes/imagestortamilanesa.jpg",
    "./imagenes/imagestacosbistec.jpg",
    "./imagenes/imagesensaladafrutas.jpg",
    "./imagenes/imagespizza.jpg",
    "./imagenes/clubsandwich.jpg",
    "./imagenes/waffles.jpg"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(ARCHIVOS);

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(nombres => {

            return Promise.all(

                nombres
                    .filter(nombre => nombre !== CACHE_NAME)
                    .map(nombre => caches.delete(nombre))

            );

        })

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                return respuesta || fetch(event.request);

            })

    );

});
