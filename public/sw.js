const CACHE_NAME = "muhammad-portfolio-v4";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
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
		caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)),
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
	const url = event.request.url;

	if (
		url.origin !== location.origin ||
		url.includes("vercel.live") ||
		url.includes("vercel-insights") ||
		url.includes("google-analytics") ||
		url.includes("collect?") ||
		url.startsWith("chrome-extension")
	) {
		return;
	}

	if (event.request.mode === "navigate") {
		event.respondWith(
			fetch(event.request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				return await cache.match(OFFLINE_URL);
			}),
		);
	} else {
		event.respondWith(
			caches.match(event.request).then((cachedResponse) => {
				if (cachedResponse) return cachedResponse;

				if (!navigator.onLine) {
					return new Response(null, {
						status: 404,
						statusText: "Offline",
					});
				}

				return fetch(event.request)
					.then((networkResponse) => {
						if (
							networkResponse.status === 200 &&
							(url.includes("_next/static") ||
								url.includes("/fonts") ||
								url.pathname.match(
									/\.(webp|png|jpg|jpeg|svg)$/,
								))
						) {
							const responseToCache = networkResponse.clone();
							caches
								.open(CACHE_NAME)
								.then((cache) =>
									cache.put(event.request, responseToCache),
								);
						}
						return networkResponse;
					})
					.catch(() => new Response(null, { status: 404 }));
			}),
		);
	}
});
