const CACHE_NAME = "muhammad-portfolio-v00971";
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

	if (
		url.hostname.includes("google-analytics") ||
		url.hostname.includes("analytics.google") ||
		url.hostname.includes("vercel") ||
		url.pathname.includes("/_next/static/media/") ||
		request.method !== "GET"
	) {
		if (!navigator.onLine) {
			event.respondWith(new Response(null, { status: 204 }));
			return;
		}
	}

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(() => {
				return caches.match(OFFLINE_URL);
			}),
		);
		return;
	}

	event.respondWith(
		caches.match(request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse;

			return fetch(request).catch(
				() => new Response(null, { status: 404 }),
			);
		}),
	);
});
