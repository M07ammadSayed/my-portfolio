const CACHE_NAME = "muhammad-portfolio-v013239";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
	OFFLINE_URL,
	"/manifest.json",
	"/favicon.ico",
	"/icon.svg",
	"/web-app-manifest-192x192.png",
	"/web-app-manifest-512x512.png",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== CACHE_NAME)
						.map((key) => caches.delete(key)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (!url.protocol.startsWith("http")) return;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((networkResponse) => {
					return networkResponse;
				})
				.catch(async () => {
					const cache = await caches.open(CACHE_NAME);
					return await cache.match(OFFLINE_URL);
				}),
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			return cachedResponse || fetch(request);
		}),
	);
});
