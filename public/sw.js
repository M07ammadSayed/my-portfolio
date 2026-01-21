// const CACHE_NAME = "muhammad-portfolio-v20";
// const OFFLINE_URL = "/offline";

// const PRECACHE_ASSETS = [
// 	OFFLINE_URL,
// 	"/",
// 	"/favicon.ico",
// 	"/favicon-96x96.png",
// 	"/manifest.json",
// 	"/icon.svg",
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

const CACHE_NAME = "muhammad-portfolio-v30"; // إصدار جديد تماماً
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
	"/",
	OFFLINE_URL,
	"/manifest.json",
	"/favicon.ico",
	"/favicon-96x96.png",
	"/icon.svg",
];

// 1. التثبيت والتخزين المسبق
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			// بنحمل كل ملف لوحده عشان نضمن نجاح العملية حتى لو في أيقونة ناقصة
			return Promise.allSettled(
				PRECACHE_ASSETS.map((asset) =>
					fetch(asset).then((res) => {
						if (res.ok) return cache.put(asset, res);
					}),
				),
			);
		}),
	);
	self.skipWaiting();
});

// 2. تفعيل وتنظيف الكاش القديم
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

// 3. معالجة الطلبات والتحويل الإجباري للأوفلاين
self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// استثناء الـ Extensions والروابط الخارجية عشان الـ Console ينضف
	if (
		url.origin !== location.origin ||
		url.href.includes("vercel") ||
		url.href.startsWith("chrome-extension")
	) {
		return;
	}

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				const offlineResponse = await cache.match(OFFLINE_URL);

				// لو المتصفح بيحاول يفتح أي صفحة والنت قطع، بنرمي صفحة الـ offline فوراً
				if (offlineResponse) {
					return offlineResponse;
				}

				// Fallback أخير لو الكاش لسه مخلصش
				return new Response(
					"Offline mode activated. Please refresh when online.",
					{
						status: 200,
						headers: { "Content-Type": "text/html" },
					},
				);
			}),
		);
	} else {
		// معالجة الملفات (صور، JS، CSS) - استراتيجية Cache First
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) return cachedResponse;

				return fetch(request)
					.then((networkResponse) => {
						// تخزين تلقائي لملفات Next.js والصور أثناء تصفحك والنت شغال
						if (
							networkResponse.ok &&
							(url.pathname.includes("_next/static") ||
								url.pathname.match(
									/\.(webp|png|jpg|jpeg|svg|js|css|woff2)$/,
								))
						) {
							const responseToCache = networkResponse.clone();
							caches
								.open(CACHE_NAME)
								.then((c) => c.put(request, responseToCache));
						}
						return networkResponse;
					})
					.catch(() => {
						// كتم أخطاء الـ Console للملفات المفقودة وأنت أوفلاين
						if (request.destination === "script")
							return new Response("");
					});
			}),
		);
	}
});
