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

const CACHE_NAME = "portfolio-fixed-v1";
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
		caches.open(CACHE_NAME).then((cache) => {
			// بنحمل كل ملف لوحده عشان لو الأيقونة مثلاً ضايعة، صفحة الأوفلاين تتسجل برضه
			return Promise.allSettled(
				PRECACHE_ASSETS.map((asset) =>
					fetch(asset).then((res) => res.ok && cache.put(asset, res)),
				),
			);
		}),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys.map((key) => key !== CACHE_NAME && caches.delete(key)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url); // ده Object

	// حل مشكلة الـ includes والـ startsWith (بنستخدم الـ href اللي هو string)
	if (
		url.origin !== location.origin ||
		url.href.startsWith("chrome-extension")
	) {
		return;
	}

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				// بنرجع صفحة الأوفلاين فوراً لو مفيش نت
				return (
					(await cache.match(OFFLINE_URL)) || (await cache.match("/"))
				);
			}),
		);
	} else {
		event.respondWith(
			caches.match(request).then(
				(res) =>
					res ||
					fetch(request).catch(() => {
						// كتم أخطاء الـ Console الحمراء اللي في صورك
						if (request.destination === "script")
							return new Response("");
					}),
			),
		);
	}
});
