import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
	skipWaiting: true,
	sw: "sw.js",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	fallbacks: {
		document: "/offline.html",
	},
	workboxOptions: {
		exclude: [/\.html$/, /\/$/],
		runtimeCaching: [
			{
				urlPattern: ({ request }) => request.mode === "navigate",
				handler: "NetworkOnly",
			},
		],
	},
});

export default withPWA({
	output: "export",
	reactStrictMode: true,
	productionBrowserSourceMaps: false,
	typescript: {
		ignoreBuildErrors: true,
	},
});
