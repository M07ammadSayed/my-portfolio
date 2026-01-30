// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: true,
// 	productionBrowserSourceMaps: false,
// 	typescript: {
// 		ignoreBuildErrors: true,
// 	},
// 	async headers() {
// 		return [
// 			{
// 				source: "/offline",
// 				headers: [
// 					{
// 						key: "Cache-Control",
// 						value: "public, max-age=31536000, immutable",
// 					},
// 					{ key: "X-Frame-Options", value: "DENY" },
// 					{ key: "X-Content-Type-Options", value: "nosniff" },
// 					{
// 						key: "Referrer-Policy",
// 						value: "strict-origin-when-cross-origin",
// 					},
// 					{
// 						key: "Permissions-Policy",
// 						value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
// 					},
// 				],
// 			},
// 		];
// 	},
// };

// export default nextConfig;

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	// disable: false,
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
	turbopack: {},
	reactStrictMode: true,
	productionBrowserSourceMaps: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	async headers() {
		return [
			{
				source: "/offline",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
				],
			},
		];
	},
});
