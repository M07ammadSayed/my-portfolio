"use client";
import { useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import SocialLink from "./SocialLink";

const NAV_ITEMS = ["about", "skills", "projects", "contact"] as const;

export default function NavBar() {
	const [mounted, setMounted] = useState(false);
	const [activeSection, setActiveSection] = useState("about");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

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

	// Track scroll for subtle navbar background
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
		},
		[],
	);

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
			<nav
				className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-auto z-[10001] will-change-transform"
				role="navigation"
				aria-label="Main navigation"
			>
				<div
					className={`transition-all duration-500 ease-out border rounded-full px-5 py-3 flex justify-between items-center md:gap-8 ${
						isScrolled
							? "bg-[#080810]/70 border-slate-800/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
							: "bg-transparent border-transparent backdrop-blur-md"
					}`}
				>
					<button
						type="button"
						className="text-xl font-bold text-[#06b6d4] font-mono tracking-tighter hover:text-white transition-colors duration-200 md:whitespace-nowrap"
						onClick={() =>
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							})
						}
						aria-label="Scroll to top"
					>
						&lt;MS /&gt;
					</button>

					<div className="hidden md:flex gap-1">
						{NAV_ITEMS.map(
							(item) => (
								<a
									key={item}
									href={`#${item}`}
									onClick={(e) => handleNavClick(e, item)}
									className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
										activeSection === item
											? "text-[#ffffff]"
											: "text-slate-400 hover:text-[#ffffff]"
									}`}
								>
									{activeSection === item && (
										<motion.span
											layoutId="nav-indicator"
											className="absolute inset-0 rounded-full bg-[#080810]/80 border border-slate-700/80"
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
									<span className="relative z-10 capitalize">
										{item}
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
						className="md:hidden text-[#ffffff] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label={
							isMobileMenuOpen ? "Close menu" : "Open menu"
						}
						aria-expanded={isMobileMenuOpen}
					>
						<AnimatePresence mode="wait">
							{isMobileMenuOpen ? (
								<motion.div
									key="close"
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<X size={22} />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: -90, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Menu size={22} />
								</motion.div>
							)}
						</AnimatePresence>
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
									transition={{ duration: 0.3 }}
									onClick={() => setIsMobileMenuOpen(false)}
									className="fixed inset-0 bg-[#080810]/80 backdrop-blur-sm z-[9998] md:hidden"
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
									transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
									className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-[#080810]/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-1 md:hidden z-[9999]"
								>
									{NAV_ITEMS.map((item, i) => (
										<motion.a
											key={item}
											href={`#${item}`}
											onClick={(e) => {
												handleNavClick(e, item);
												setIsMobileMenuOpen(false);
											}}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.05 }}
											className={`p-4 text-center rounded-xl transition-all duration-200 font-medium min-h-[44px] flex items-center justify-center ${
												activeSection === item
													? "text-[#06b6d4] bg-[#06b6d4]/5"
													: "text-[#ffffff] hover:bg-slate-800/50"
											}`}
										>
											<span className="capitalize">{item}</span>
										</motion.a>
									))}
									<div className="mt-3 pt-4 pb-3 border-t border-slate-700/50 flex justify-center gap-6">
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
