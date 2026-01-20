import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (
		pathname.includes("manifest") ||
		pathname.includes("sw.js") ||
		pathname.endsWith(".png") ||
		pathname.endsWith(".ico") ||
		pathname.endsWith(".webmanifest")
	) {
		return NextResponse.next();
	}

	const nonce = btoa(
		String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)))
	);

	const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: https:;
        font-src 'self' data:;
        connect-src 'self' https://*.vercel-scripts.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
        frame-src 'self' https://vercel.live;
        worker-src 'self' blob:;
        manifest-src 'self' https://muhammad-sayyid.vercel.app;
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `
		.replace(/\s{2,}/g, " ")
		.trim();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	response.headers.set("Content-Security-Policy", cspHeader);
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	response.headers.set(
		"Permissions-Policy",
		"camera=(), microphone=(), geolocation=()"
	);

	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!api|_next/static|_next/image|favicon.ico|manifest|sw.js|.*\\.png$|.*\\.jpg$).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
