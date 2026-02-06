const CACHE_NAME = "muhammad-portfolio-v0132";
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
		Promise.all([
			caches
				.keys()
				.then((keys) =>
					Promise.all(
						keys
							.filter((key) => key !== CACHE_NAME)
							.map((key) => caches.delete(key)),
					),
				),
			self.clients.claim(),
		]),
	);
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	if (
		url.hostname.includes("google-analytics") ||
		url.hostname.includes("vercel") ||
		url.pathname.includes("/_next/static/media/") ||
		request.method !== "GET"
	) {
		if (!navigator.onLine) {
			event.respondWith(new Response(null, { status: 204 }));
			return;
		}
	}

	if (!url.protocol.startsWith("http")) return;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(async () => {
				const cache = await caches.open(CACHE_NAME);
				const offlineResponse = await cache.match(OFFLINE_URL);
				return (
					offlineResponse || new Response("Offline", { status: 503 })
				);
			}),
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse;

			return fetch(request).catch(() => {
				return new Response(null, { status: 404 });
			});
		}),
	);
});
