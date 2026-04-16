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
		document: "/offline",
	},
	workboxOptions: {
		runtimeCaching: [
			{
				urlPattern: ({ request }) => request.mode === "navigate",
				handler: "NetworkOnly",
			},
		],
	},
});

export default withPWA({
	reactStrictMode: true,
	productionBrowserSourceMaps: false,
	typescript: {
		ignoreBuildErrors: true,
	},
});
