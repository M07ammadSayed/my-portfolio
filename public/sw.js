const CACHE_NAME = "v23746517";
const OFFLINE_URL = "/offline";

const STATIC_ASSETS = [
	"/offline",
	"/favicon.ico",
	"/icon.svg",
	"/manifest.json",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
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
					keys
						.filter((key) => key !== CACHE_NAME)
						.map((key) => caches.delete(key)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	if (event.request.mode === "navigate") {
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.match(OFFLINE_URL);
			}),
		);
		return;
	}

	if (
		event.request.method !== "GET" ||
		!event.request.url.startsWith(self.location.origin)
	) {
		return;
	}

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				if (response.ok) {
					const clone = response.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, clone);
					});
				}
				return response;
			})
			.catch(() => caches.match(event.request)),
	);
});
