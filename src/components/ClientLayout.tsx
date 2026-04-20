"use client";

import { useEffect, useState } from "react";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [activeSection, setActiveSection] = useState("about");
	const [scrolled, setScrolled] = useState(false);

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
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			if (!isLoading) {
				document.body.style.overflow = "unset";
			}
		}
	}, [isMobileMenuOpen, isLoading]);

	useEffect(() => {
		setMounted(true);

		// --- Console Signature ---
		console.log(
			"%c Developed by Muhammad Sayyid ",
			"background: #020617; color: #22d3ee; border: 1px solid #22d3ee; padding: 5px 10px; border-radius: 5px; font-family: monospace; font-size: 12px; font-weight: bold;"
		);
		console.log(
			"%c Looking for a Secure Full-Stack Engineer? Let's talk! 🚀 ",
			"color: #94a3b8; font-family: monospace; font-size: 11px; margin-top: 5px;"
		);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const sections = ["about", "skills", "projects", "contact"];
			const scrollPosition = window.scrollY + 200;
			sections.forEach((section) => {
				const element = document.getElementById(section);
				if (
					element &&
					scrollPosition >= element.offsetTop &&
					scrollPosition < element.offsetTop + element.offsetHeight
				) {
					setActiveSection(section);
				}
			});
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
}
