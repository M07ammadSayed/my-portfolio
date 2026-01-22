const CACHE_NAME = "muhammad-portfolio-v777";
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

				return fetch(event.request).catch(() => {
					return new Response(null, {
						status: 204,
						statusText: "Offline",
					});
				});
			}),
		);
	}
});
