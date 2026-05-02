"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PremiumLoader from "./PremiumLoader";
import ScrollProgress from "./ScrollProgress";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
	ssr: false,
});
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
	ssr: false,
});
const VisualBackground = dynamic(
	() => import("@/components/VisualBackground"),
	{ ssr: false },
);

export default function PageManager({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.history.scrollRestoration = "manual";
		}
	}, []);

	useEffect(() => {
		if (isLoading) {
			document.body.style.overflow = "hidden";
			window.scrollTo(0, 0);
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isLoading]);

	useEffect(() => {
		setMounted(true);

		// --- Console Signature ---
		console.log(
			"%c Developed by Muhammad Sayyid ",
			"background: #080810; color: #22d3ee; border: 1px solid #22d3ee; padding: 5px 10px; border-radius: 5px; font-family: monospace; font-size: 12px; font-weight: bold;",
		);
		console.log(
			"%c Looking for a Secure Full-Stack Engineer? Let's talk! 🚀 ",
			"color: #94a3b8; font-family: monospace; font-size: 11px; margin-top: 5px;",
		);
	}, []);



	const handleLoaderComplete = useCallback(() => {
		document.documentElement.style.setProperty(
			"scroll-behavior",
			"auto",
			"important",
		);
		document.body.style.setProperty("scroll-behavior", "auto", "important");
		window.scrollTo(0, 0);
		setIsLoading(false);
		setTimeout(() => {
			document.documentElement.style.removeProperty("scroll-behavior");
			document.body.style.removeProperty("scroll-behavior");
			setIsLoaded(true);
		}, 500);
	}, []);

	useEffect(() => {
		const fallback = setTimeout(() => {
			if (isLoading) handleLoaderComplete();
		}, 3000);
		return () => clearTimeout(fallback);
	}, [isLoading, handleLoaderComplete]);
	return (
		<>
			<AnimatePresence mode="wait">
				{mounted && isLoading && (
					<PremiumLoader onComplete={handleLoaderComplete} />
				)}
			</AnimatePresence>
			<motion.div
				className="min-h-[100dvh] bg-[#080810] text-[#ffffff] font-sans text-base leading-relaxed tracking-tight overflow-x-hidden relative"
				style={{
					opacity: isLoading ? 0 : 1,
					transition: "opacity 1s ease-in-out",
				}}
				role="main"
			>
				{mounted && (
					<>
						<CustomCursor />
						<VisualBackground />
						<ScrollToTop />
					</>
				)}
				<ScrollProgress isLoaded={isLoaded} />
				{children}
			</motion.div>
		</>
	);
}
