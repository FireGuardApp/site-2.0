const CACHE_NAME = "fireguard-cache-v1";

const ASSETS = [
    "/site-2.0/",
    "/site-2.0/index.html",
    "/site-2.0/manifest.json",
    "/site-2.0/icon-192.png",
    "/site-2.0/icon-512.png",
    "/site-2.0/favicon.ico"
];

// Установка SW — кэширование
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Активация SW — очистка старых кэшей
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key =>
                    key !== CACHE_NAME ? caches.delete(key) : null
                )
            )
        )
    );
    self.clients.claim();
});

// Перехват запросов
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
