const CACHE_NAME = "muhammad-portfolio-v4";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
	"/",
	OFFLINE_URL,
	"/favicon.ico",
	"/favicon-96x96.png",
	"/web-app-manifest-192x192.png",
	"/web-app-manifest-512x512.png",
	"/manifest.json",
	"/icon.svg",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(async (cache) => {
			console.log("Forcing cache for offline assets...");
			const promises = PRECACHE_ASSETS.map(async (url) => {
				try {
					const response = await fetch(url, { cache: "reload" });
					if (!response.ok)
						throw new Error("Network response was not ok");
					return cache.put(url, response);
				} catch (error) {
					console.error(`Failed to cache ${url}:`, error);
				}
			});
			return Promise.all(promises);
		}),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((name) => name !== CACHE_NAME)
					.map((name) => caches.delete(name)),
			);
		}),
	);
});

self.addEventListener("fetch", (event) => {
	const url = new URL(event.request.url);

	if (
		url.origin !== location.origin ||
		url.pathname.includes("vercel") ||
		url.pathname.startsWith("/_next") ||
		url.href.includes("vercel.live") ||
		url.href.includes("vercel-insights") ||
		url.href.includes("google-analytics") ||
		url.href.includes("collect?") ||
		url.href.startsWith("chrome-extension")
	) {
		return;
	}

	if (event.request.mode === "navigate") {
		event.respondWith(
			fetch(event.request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				const match =
					(await cache.match(OFFLINE_URL)) ||
					(await cache.match("/offline"));
				return match || cache.match("/");
			}),
		);
	} else {
		event.respondWith(
			caches.match(event.request).then((response) => {
				if (response) return response;
				if (
					!navigator.onLine &&
					(event.request.url.includes(".css") ||
						event.request.url.includes(".js"))
				) {
					return new Response("", {
						status: 200,
						headers: { "Content-Type": "text/css" },
					});
				}
				return fetch(event.request);
			}),
		);
	}
});

// self.addEventListener("fetch", (event) => {
// 	const url = new URL(event.request.url);

// 	if (
// 		url.origin !== location.origin ||
// 		url.pathname.includes("vercel") ||
// 		url.pathname.startsWith("/_next") ||
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
// 				const offlineResponse =
// 					(await cache.match("/offline")) ||
// 					(await cache.match("/offline/"));
// 				if (offlineResponse) {
// 					return offlineResponse;
// 				}
// 				return cache.match("/");
// 			}),
// 		);
// 	} else {
// 		event.respondWith(
// 			caches.match(event.request).then((response) => {
// 				return response || fetch(event.request);
// 			}),
// 		);
// 	}
// });

// self.addEventListener("fetch", (event) => {
// 	const url = event.request.url;

// 	if (
// 		url.origin !== location.origin ||
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
// 				const match = await cache.match(OFFLINE_URL);
// 				if (match) return match;
// 				return await cache.match("/");
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
