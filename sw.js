self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("fireguard-cache").then(cache => {
            return cache.addAll([
                "/site-2.0/",
                "/site-2.0/index.html",
                "/site-2.0/manifest.json",
                "/site-2.0/icon-192.png",
                "/site-2.0/icon-512.png"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
