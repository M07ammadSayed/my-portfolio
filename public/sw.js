const CACHE_NAME = "muhammad-portfolio-v6000";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
	"/",
	OFFLINE_URL,
	"/manifest.json",
	"/favicon.ico",
	"/icon.svg",
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
					const responseToCache = networkResponse.clone();
					event.waitUntil(
						caches
							.open(CACHE_NAME)
							.then((cache) =>
								cache.put(request, responseToCache),
							),
					);
					return networkResponse;
				})
				.catch(async () => {
					const cachedResponse = await caches.match(request);
					if (cachedResponse) return cachedResponse;
					return caches.match(OFFLINE_URL);
				}),
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			const fetchPromise = fetch(request)
				.then((networkResponse) => {
					if (
						networkResponse &&
						networkResponse.status === 200 &&
						networkResponse.type === "basic"
					) {
						const responseToCache = networkResponse.clone();
						event.waitUntil(
							caches
								.open(CACHE_NAME)
								.then((cache) =>
									cache.put(request, responseToCache),
								),
						);
					}
					return networkResponse;
				})
				.catch(() => {
					if (
						url.pathname.endsWith(".js") ||
						url.pathname.endsWith(".css")
					) {
						return new Response("// Offline", { status: 200 });
					}
				});

			return cachedResponse || fetchPromise;
		}),
	);
});
