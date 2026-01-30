const CACHE_NAME = "muhammad-portfolio-v1";
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll([OFFLINE_URL, "/manifest.json", "/icon.svg"]);
		}),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
	if (event.request.mode === "navigate") {
		event.respondWith(
			fetch(event.request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				return await cache.match(OFFLINE_URL);
			}),
		);
	}
});
