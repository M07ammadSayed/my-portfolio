// const CACHE_NAME = "muhammad-portfolio-v20";
// const OFFLINE_URL = "/offline";

// const PRECACHE_ASSETS = [
// 	OFFLINE_URL,
// 	"/",
// 	"/favicon.ico",
// 	"/favicon-96x96.png",
// 	"/apple-touch-icon.png",
// 	"/web-app-manifest-192x192.png",
// 	"/web-app-manifest-512x512.png",
// 	"/manifest.json",
// 	"/icon.svg",
// 	"/src/components/CustomCursor.tsx",
// ];

// self.addEventListener("install", (event) => {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)),
// 	);
// 	self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
// 	event.waitUntil(
// 		caches.keys().then((cacheNames) => {
// 			return Promise.all(
// 				cacheNames
// 					.filter((name) => name !== CACHE_NAME)
// 					.map((name) => caches.delete(name)),
// 			);
// 		}),
// 	);
// });

// self.addEventListener("fetch", (event) => {
// 	const url = event.request.url;

// 	if (
// 		url.includes("vercel.live") ||
// 		url.includes("vercel-insights") ||
// 		url.includes("google-analytics") ||
// 		url.includes("collect?") ||
// 		url.startsWith("chrome-extension")
// 	) {
// 		return;
// 	}

// 	if (event.request.mode === "navigate") {
// 		event.respondWith(
// 			fetch(event.request).catch(async () => {
// 				const cache = await caches.open(CACHE_NAME);
// 				const offlineResponse = await cache.match(OFFLINE_URL);
// 				return offlineResponse;
// 			}),
// 		);
// 	} else {
// 		event.respondWith(
// 			caches.match(event.request).then((cachedResponse) => {
// 				if (cachedResponse) return cachedResponse;

// 				if (!navigator.onLine) {
// 					return new Response(null, {
// 						status: 404,
// 						statusText: "Offline",
// 					});
// 				}

// 				return fetch(event.request)
// 					.then((networkResponse) => {
// 						if (
// 							networkResponse.status === 200 &&
// 							(url.includes("_next/static") ||
// 								url.includes("/fonts") ||
// 								url.pathname.match(
// 									/\.(webp|png|jpg|jpeg|svg)$/,
// 								))
// 						) {
// 							const responseToCache = networkResponse.clone();
// 							caches
// 								.open(CACHE_NAME)
// 								.then((cache) =>
// 									cache.put(event.request, responseToCache),
// 								);
// 						}
// 						return networkResponse;
// 					})
// 					.catch(() => new Response(null, { status: 404 }));
// 			}),
// 		);
// 	}
// });

const CACHE_NAME = "portfolio-cache-v1";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = ["/", OFFLINE_URL, "/manifest.json", "/favicon.ico"];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return Promise.all(
				PRECACHE_ASSETS.map((url) => {
					return fetch(url)
						.then((res) => {
							if (res.ok) return cache.put(url, res);
						})
						.catch(() =>
							console.warn(`Failed to precache: ${url}`),
						);
				}),
			);
		}),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((key) => key !== CACHE_NAME && caches.delete(key)),
			);
		}),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (
		url.origin !== location.origin ||
		request.url.startsWith("chrome-extension") ||
		url.includes("vercel.live") ||
		url.includes("vercel-insights") ||
		url.includes("google-analytics") ||
		url.includes("collect?")
	) {
		return;
	}

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				const cachedResponse = await cache.match(request);
				if (cachedResponse) return cachedResponse;

				return cache.match(OFFLINE_URL);
			}),
		);
	} else {
		event.respondWith(
			caches.match(request).then((response) => {
				return (
					response ||
					fetch(request)
						.then((netRes) => {
							if (
								netRes.ok &&
								url.pathname.match(
									/\.(js|css|png|jpg|jpeg|svg|woff2)$/,
								)
							) {
								const clone = netRes.clone();
								caches
									.open(CACHE_NAME)
									.then((c) => c.put(request, clone));
							}
							return netRes;
						})
						.catch(() => {
							if (request.destination === "script")
								return new Response("");
						})
				);
			}),
		);
	}
});
