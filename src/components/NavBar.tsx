"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import SocialLink from "./SocialLink";

const navItems = ["about", "skills", "projects", "contact"];

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
		const handleScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		setIsMobileMenuOpen(false);
		setTimeout(() => {
			const element = document.getElementById(id);
			if (element) {
				const offset = element.getBoundingClientRect().top + window.scrollY - 100;
				window.scrollTo({ top: offset, behavior: "smooth" });
			}
		}, 100);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: [0.2, 0.5], rootMargin: "-15% 0px -50% 0px" },
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
			<nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] md:w-auto z-[10001] will-change-transform">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className={`transition-all duration-500 ${
						scrolled
							? "bg-[#0a0a14]/85 shadow-[0_8px_32px_rgba(139,92,246,0.12)] border-violet-500/20"
							: "bg-[#0a0a14]/40 border-white/5"
					} backdrop-blur-xl border rounded-2xl px-5 py-3 flex justify-between items-center md:gap-6`}
				>
					{/* Logo */}
					<h1
						role="button"
						className="text-lg font-bold font-mono tracking-tighter cursor-pointer group relative"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					>
						<span className="relative z-10 bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-80">
							&lt;MS /&gt;
						</span>
						<span className="absolute -inset-2 rounded-lg bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
					</h1>

					{/* Desktop Nav Links */}
					<div className="hidden md:flex gap-1">
						{navItems.map((item) => (
							<a
								key={item}
								href={`#${item}`}
								onClick={(e) => handleNavClick(e, item)}
								className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:text-violet-300 text-slate-400"
							>
								{activeSection === item && (
									<motion.span
										layoutId="nav-indicator"
										className="absolute inset-0 rounded-xl bg-violet-500/10 border border-violet-500/20"
										transition={{ type: "spring", stiffness: 350, damping: 35 }}
									/>
								)}
								<span className={`relative z-10 transition-colors ${activeSection === item ? "text-violet-300" : ""}`}>
									{item.charAt(0).toUpperCase() + item.slice(1)}
								</span>
							</a>
						))}
					</div>

					{/* Social Links */}
					<div className="hidden md:flex gap-2 pl-4 border-l border-white/8">
						<SocialLink href="https://github.com/M07ammadSayed" icon={Github} label="Visit GitHub Profile" />
						<SocialLink href="https://www.linkedin.com/in/muhammad-sayyid/" icon={Linkedin} label="Visit LinkedIn Profile" />
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-slate-400 hover:text-violet-300 transition-colors p-1.5 rounded-lg hover:bg-violet-500/10"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
					>
						<AnimatePresence mode="wait">
							{isMobileMenuOpen ? (
								<motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
									<X size={22} />
								</motion.span>
							) : (
								<motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
									<Menu size={22} />
								</motion.span>
							)}
						</AnimatePresence>
					</button>
				</motion.div>
			</nav>

			{/* Mobile Menu Portal */}
			{mounted &&
				typeof document !== "undefined" &&
				createPortal(
					<AnimatePresence>
						{isMobileMenuOpen && (
							<>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setIsMobileMenuOpen(false)}
									className="fixed inset-0 bg-[#06060f]/90 backdrop-blur-md z-[9998] md:hidden"
								/>
								<motion.div
									initial={{ opacity: 0, y: -15, scale: 0.97 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -15, scale: 0.97 }}
									transition={{ type: "spring", stiffness: 300, damping: 28 }}
									className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 w-[88%] bg-[#0d0d1a]/95 backdrop-blur-xl border border-violet-500/15 rounded-2xl p-3 shadow-[0_20px_60px_rgba(139,92,246,0.2)] flex flex-col gap-1 md:hidden z-[9999]"
								>
									{navItems.map((item, i) => (
										<motion.a
											key={item}
											href={`#${item}`}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.07 }}
											onClick={(e) => { handleNavClick(e, item); setIsMobileMenuOpen(false); }}
											className={`p-3 text-center rounded-xl transition-all font-medium text-sm ${
												activeSection === item
													? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
													: "text-slate-400 hover:bg-white/5 hover:text-slate-200"
											}`}
										>
											{item.charAt(0).toUpperCase() + item.slice(1)}
										</motion.a>
									))}
									<div className="mt-1 pt-3 pb-1 border-t border-white/6 flex justify-center gap-6">
										<SocialLink href="https://github.com/M07ammadSayed" icon={Github} label="Visit GitHub Profile" />
										<SocialLink href="https://www.linkedin.com/in/muhammad-sayyid/" icon={Linkedin} label="Visit LinkedIn Profile" />
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
