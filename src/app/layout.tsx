import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import InstallPrompt from "@/components/InstallPrompt";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "Muhammad Sayyid | AppSec Engineer",
	description:
		"Application Security Engineer & Full-Stack Developer securing modern web applications. Expert in White-box Testing, Secure Code Review.",
	applicationName: "Muhammad Sayyid",
	keywords: [
		"Application Security",
		"AppSec",
		"Secure Coding",
		"OWASP Top 10",
		"Web Security",
		"React.js",
		"Node.js",
		"Cybersecurity Portfolio",
		"Full-Stack Portfolio",
		"Web Developer",
		"Next.js",
		"Pentesting",
		"Bug Bounty",
		"M07ammadSayed",
		"Muhammad Sayyid",
		"flex0geek hackerone",
		"appsec github",
		"open-appsec",
		"DevSecOps",
		"SDR",
		"SAST & DAST",
		"OAuth2 & JWT",
		"API Security",
	],
	metadataBase: new URL("https://muhammad-sayyid.vercel.app"),
	openGraph: {
		title: "Muhammad Sayyid | AppSec Engineer",
		description:
			"Application Security Engineer & Full-Stack Developer securing modern web applications. Expert in White-box Testing, Secure Code Review.",
		url: "https://muhammad-sayyid.vercel.app/",
		siteName: "Muhammad Sayyid",
		type: "website",
		images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Muhammad Sayyid | AppSec Engineer",
		description:
			"Application Security Engineer & Full-Stack Developer. Expert in White-box Testing and Secure Code Review.",
		images: ["/opengraph-image.png"],
		creator: "@M07ammad_Sayed",
	},
	alternates: {
		canonical: "https://muhammad-sayyid.vercel.app",
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [
			{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
		],
		other: [{ rel: "shortcut icon", url: "/favicon.ico" }],
		apple: [
			{
				url: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	},
	verification: {
		google: "THFxf1VSo42NqnEMbGPsjkHxmLNUwef2LRZl8WWjO9w",
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "<MS />",
	},
	category: "technology",
};

export const viewport: Viewport = {
	themeColor: "#020617",
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": "https://muhammad-sayyid.vercel.app/#website",
				url: "https://muhammad-sayyid.vercel.app",
				name: "Muhammad Sayyid",
				publisher: {
					"@id": "https://muhammad-sayyid.vercel.app/#person",
				},
			},
			{
				"@type": "Person",
				"@id": "https://muhammad-sayyid.vercel.app/#person",
				name: "Muhammad Sayyid",
				alternateName: "M07ammadSayed",
				url: "https://muhammad-sayyid.vercel.app",
				image: "https://muhammad-sayyid.vercel.app/icon.svg",
				jobTitle:
					"Application Security Engineer & Full-Stack Developer",
				alumniOf: {
					"@type": "CollegeOrUniversity",
					name: "Zagazig University",
				},
				sameAs: [
					"https://github.com/M07ammadSayed",
					"https://www.linkedin.com/in/muhammad-sayyid/",
				],
				description:
					"Full-Stack Web Developer proficient in React, Next.js, Node.js, and MongoDB. 3rd year student at Faculty of Technology and Development.",
				knowsAbout: [
					"Web Development",
					"JavaScript",
					"React.js",
					"Next.js",
					"Node.js",
					"Express",
					"PostgreSQL",
					"Tailwind CSS",
					"Backend Development",
					"Database Management",
					"RESTful APIs",
					"Linux Administration",
					"Network Security",
					"Software Development Life Cycle (SDLC)",
				],
			},
		],
	};

	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<link
					rel="manifest"
					href="/manifest.json"
					crossOrigin="use-credentials"
				/>
				<meta name="apple-mobile-web-app-title" content="<MS />" />
				<meta name="application-name" content="Muhammad Sayyid" />
			</head>
			<body
				className={`${inter.className} ${jetbrainsMono.variable} bg-[#020617] text-slate-200 antialiased selection:bg-cyan-500/30`}
				suppressHydrationWarning={true}
			>
				{children}

				<Analytics />
				<SpeedInsights />
				<InstallPrompt />

				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-WGWDPQMLKR"
					strategy="lazyOnload"
				/>
				<Script id="google-analytics" strategy="lazyOnload">
					{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-WGWDPQMLKR');
                    `}
				</Script>

				<Script id="register-sw" strategy="afterInteractive">
					{`
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', function() {
                                navigator.serviceWorker.register('/sw.js').then(function(reg) {
                                    reg.update();
                                    console.log('SW registered and updated!');
                                }).catch(function(err) {
                                    console.error('SW registration failed:', err);
                                });
                            });
                        }
                    `}
				</Script>
			</body>
		</html>
	);
}
