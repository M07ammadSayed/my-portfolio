// const CACHE_NAME = "ms-portfolio-v1551";
// const ASSETS_TO_CACHE = ["/", "/offline", "/manifest.webmanifest", "/icon.png"];

// self.addEventListener("install", (event) => {
// 	self.skipWaiting();
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)),
// 	);
// });

// self.addEventListener("activate", (event) => {
// 	event.waitUntil(
// 		caches.keys().then((keys) => {
// 			return Promise.all(
// 				keys.map((key) => {
// 					if (key !== CACHE_NAME) return caches.delete(key);
// 				}),
// 			);
// 		}),
// 	);
// 	self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
// 	if (
// 		event.request.url.includes("check=") ||
// 		event.request.url.includes("t=")
// 	) {
// 		event.respondWith(
// 			fetch(event.request).catch(() => {
// 				return new Response("offline", { status: 503 });
// 			}),
// 		);
// 		return;
// 	}

// 	if (event.request.mode === "navigate") {
// 		event.respondWith(
// 			fetch(event.request).catch(() => caches.match("/offline.html")),
// 		);
// 	} else {
// 		event.respondWith(
// 			caches
// 				.match(event.request)
// 				.then((res) => res || fetch(event.request)),
// 		);
// 	}
// });

const CACHE_NAME = "ms-portfolio-v1552";
const ASSETS_TO_CACHE = ["/", "/offline.html", "/manifest.webmanifest", "/icon.png"];

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (
        event.request.url.includes("check=") ||
        event.request.url.includes("t=") ||
        event.request.url.includes("google-analytics")
    ) {
        return;
    }

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match("/offline.html");
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((res) => {
                return res || fetch(event.request);
            })
        );
    }
});