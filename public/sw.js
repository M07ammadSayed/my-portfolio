const CACHE_NAME = "muhammad-portfolio-v0304190";
const RUNTIME_CACHE = "muhammad-portfolio-runtime-v1";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
	OFFLINE_URL,
	"/manifest.json",
	"/favicon.ico",
	"/icon.svg",
	"/web-app-manifest-192x192.png",
	"/web-app-manifest-512x512.png",
];

const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

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
					const cachedResponse = await caches.match(request);
					if (cachedResponse) return cachedResponse;

					const cache = await caches.open(CACHE_NAME);
					return cache.match(OFFLINE_URL);
				}),
		);
		return;
	}

	if (url.pathname.startsWith("/api/")) {
		event.respondWith(
			Promise.race([
				fetch(request).then((response) => {
					if (response.ok) {
						const responseClone = response.clone();
						caches.open(RUNTIME_CACHE).then((cache) => {
							cache.put(request, responseClone);
						});
					}
					return response;
				}),
				new Promise((_, reject) =>
					setTimeout(() => reject(new Error("timeout")), 3000),
				),
			]).catch(async () => {
				const cachedResponse = await caches.match(request);
				if (cachedResponse) return cachedResponse;
				return new Response(JSON.stringify({ error: "Offline" }), {
					headers: { "Content-Type": "application/json" },
					status: 503,
				});
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
				if (cachedResponse) {
					const dateHeader = cachedResponse.headers.get("date");
					const cachedTime = dateHeader
						? new Date(dateHeader).getTime()
						: 0;
					const isFresh = Date.now() - cachedTime < CACHE_MAX_AGE;

					if (isFresh) return cachedResponse;
				}

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
						if (cachedResponse) return cachedResponse;
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
				if (response.ok) {
					const responseClone = response.clone();
					caches.open(RUNTIME_CACHE).then((cache) => {
						cache.put(request, responseClone);
					});
				}
				return response;
			})
			.catch(async () => {
				const cachedResponse = await caches.match(request);
				if (cachedResponse) return cachedResponse;
				throw new Error(
					"Network request failed and no cache available",
				);
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
