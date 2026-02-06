const CACHE_NAME = "my-portfolio-v312034";
const OFFLINE_URL = "/offline";

const PRECACHE_ASSETS = [
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

	if (
		url.hostname.includes("google-analytics.com") ||
		url.hostname.includes("analytics.google.com") ||
		url.pathname.includes("_vercel/insights") ||
		url.pathname.includes("/vitals") ||
		request.method !== "GET"
	) {
		if (!navigator.onLine) {
			event.respondWith(new Response(null, { status: 204 }));
			return;
		}
	}

	if (!request.url.startsWith("http")) return;

	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request).catch(() => caches.match(OFFLINE_URL)),
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
