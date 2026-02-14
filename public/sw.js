const CACHE_NAME = "muhammad-portfolio-v672310315";
const RUNTIME_CACHE = "muhammad-portfolio-runtime-v2";
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
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(PRECACHE_ASSETS))
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener("activate", (event) => {
	const cacheWhitelist = [CACHE_NAME, RUNTIME_CACHE];
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => !cacheWhitelist.includes(key))
						.map((key) => caches.delete(key)),
				),
			)
			.then(() => self.clients.claim()),
	);
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (!url.protocol.startsWith("http")) return;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const responseClone = response.clone();
					caches.open(RUNTIME_CACHE).then((cache) => {
						cache.put(request, responseClone);
					});
					return response;
				})
				.catch(async () => {
					const cache = await caches.open(CACHE_NAME);
					return cache.match(OFFLINE_URL);
				}),
		);
		return;
	}

	if (
		request.destination === "image" ||
		request.destination === "font" ||
		request.destination === "style" ||
		request.destination === "script"
	) {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) return cachedResponse;

				return fetch(request)
					.then((response) => {
						if (response.ok) {
							const responseClone = response.clone();
							caches.open(RUNTIME_CACHE).then((cache) => {
								cache.put(request, responseClone);
							});
						}
						return response;
					})
					.catch(() => {
						if (request.destination === "image") {
							return new Response(
								'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Offline</text></svg>',
								{
									headers: {
										"Content-Type": "image/svg+xml",
									},
								},
							);
						}
						throw new Error(
							"Network request failed and no cache available",
						);
					});
			}),
		);
		return;
	}

	event.respondWith(
		fetch(request)
			.then((response) => {
				if (response.ok && request.method === "GET") {
					const responseClone = response.clone();
					caches.open(RUNTIME_CACHE).then((cache) => {
						cache.put(request, responseClone);
					});
				}
				return response;
			})
			.catch(() => {
				return new Response("", {
					status: 503,
					statusText: "Service Unavailable",
				});
			}),
	);
});

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}

	if (event.data && event.data.type === "CLEAR_CACHE") {
		event.waitUntil(
			caches
				.keys()
				.then((keys) =>
					Promise.all(keys.map((key) => caches.delete(key))),
				),
		);
	}
});
