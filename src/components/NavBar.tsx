"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import SocialLink from "./SocialLink";

export default function NavBar() {
	const [scrolled, setScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [activeSection, setActiveSection] = useState("about");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string,
	) => {
		e.preventDefault();
		setIsMobileMenuOpen(false);
		setTimeout(() => {
			const element = document.getElementById(id);
			if (element) {
				const offset =
					element.getBoundingClientRect().top + window.scrollY - 100;
				window.scrollTo({ top: offset, behavior: "smooth" });
			}
		}, 100);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (
						entry.isIntersecting &&
						entry.intersectionRatio >= 0.2
					) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				threshold: [0.2, 0.5],
				rootMargin: "-15% 0px -50% 0px",
			},
		);

		const refreshObserver = () => {
			const sections = document.querySelectorAll("section[id]");
			sections.forEach((section) => observer.observe(section));
		};

		refreshObserver();

		const timeoutId = setTimeout(refreshObserver, 1500);

		return () => {
			observer.disconnect();
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<>
			<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-[10001] will-change-transform">
				<div
					className={`transition-all duration-500 ${
						scrolled
							? "bg-[#0f172a]/80 shadow-2xl shadow-cyan-900/10 border-slate-700/50"
							: "bg-transparent border-transparent"
					} backdrop-blur-md border rounded-full px-6 py-3 flex justify-between items-center md:gap-8`}
				>
					<h1
						role="button"
						className="text-xl font-bold text-cyan-400 font-mono cursor-pointer tracking-tighter hover:text-white transition-colors md:whitespace-nowrap"
						onClick={() =>
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							})
						}
					>
						&lt;MS /&gt;
					</h1>

					<div className="hidden md:flex gap-1">
						{["about", "skills", "projects", "contact"].map(
							(item) => (
								<a
									key={item}
									href={`#${item}`}
									onClick={(e) => handleNavClick(e, item)}
									className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300"
								>
									{activeSection === item && (
										<motion.span
											layoutId="nav-indicator"
											className="absolute inset-0 rounded-full bg-slate-800/80 border border-slate-700"
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
									<span className="relative z-10">
										{item.charAt(0).toUpperCase() +
											item.slice(1)}
									</span>
								</a>
							),
						)}
					</div>

					<div className="hidden md:flex gap-3 pl-4 border-l border-slate-700/50">
						<SocialLink
							href="https://github.com/M07ammadSayed"
							icon={Github}
							label="Visit GitHub Profile"
							aria-label="GitHub Profile"
						/>
						<SocialLink
							href="https://www.linkedin.com/in/muhammad-sayyid/"
							icon={Linkedin}
							label="Visit LinkedIn Profile"
							aria-label="LinkedIn Profile"
						/>
					</div>

					<button
						className="md:hidden text-slate-300 p-2"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label={
							isMobileMenuOpen ? "Close menu" : "Open menu"
						}
					>
						{isMobileMenuOpen ? (
							<X size={24} />
						) : (
							<Menu size={24} />
						)}
					</button>
				</div>
			</nav>

			{/* --- MOBILE MENU --- */}
			{mounted &&
				typeof document !== "undefined" &&
				createPortal(
					<AnimatePresence>
						{isMobileMenuOpen && (
							<>
								<motion.div
									key="mobile-backdrop"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setIsMobileMenuOpen(false)}
									className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9998] md:hidden"
								/>
								<motion.div
									key="mobile-menu"
									initial={{
										opacity: 0,
										y: -20,
										scale: 0.95,
									}}
									animate={{
										opacity: 1,
										y: 0,
										scale: 1,
									}}
									exit={{
										opacity: 0,
										y: -20,
										scale: 0.95,
									}}
									className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-[#0f172a] border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 md:hidden z-[9999]"
								>
									{[
										"about",
										"skills",
										"projects",
										"contact",
									].map((item) => (
										<a
											key={item}
											href={`#${item}`}
											onClick={(e) => {
												handleNavClick(e, item);
												setIsMobileMenuOpen(false);
											}}
											className="p-3 text-center text-slate-300 hover:bg-slate-800 rounded-xl transition font-medium"
										>
											{item.charAt(0).toUpperCase() +
												item.slice(1)}
										</a>
									))}
									<div className="mt-2 pt-4 pb-3 border-t border-slate-700/50 flex justify-center gap-6">
										<SocialLink
											href="https://github.com/M07ammadSayed"
											icon={Github}
											label="Visit GitHub Profile"
											aria-label="GitHub Profile"
										/>
										<SocialLink
											href="https://www.linkedin.com/in/muhammad-sayyid/"
											icon={Linkedin}
											label="Visit LinkedIn Profile"
											aria-label="LinkedIn Profile"
										/>
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
}
