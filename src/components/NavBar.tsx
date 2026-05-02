"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import SocialLink from "./SocialLink";

export default function NavBar() {
        const [mounted, setMounted] = useState(false);
        const [activeSection, setActiveSection] = useState("about");
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [scrolled, setScrolled] = useState(false);

        useEffect(() => {
                if (isMobileMenuOpen) {
                        document.body.style.overflow = "hidden";
                } else {
                        document.body.style.overflow = "unset";
                }
                return () => { document.body.style.overflow = "unset"; };
        }, [isMobileMenuOpen]);

        useEffect(() => {
                setMounted(true);
        }, []);

        useEffect(() => {
                const onScroll = () => setScrolled(window.scrollY > 40);
                window.addEventListener("scroll", onScroll, { passive: true });
                onScroll();
                return () => window.removeEventListener("scroll", onScroll);
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

        const navStyle: React.CSSProperties = scrolled
                ? {
                        background: "rgba(8, 8, 16, 0.85)",
                        borderColor: "rgba(30, 42, 58, 0.8)",
                        boxShadow: "0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(6,182,212,0.06) inset",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                  }
                : {
                        background: "rgba(8, 8, 16, 0.01)",
                        borderColor: "transparent",
                        boxShadow: "none",
                        backdropFilter: "blur(0px)",
                        WebkitBackdropFilter: "blur(0px)",
                  };

        return (
                <>
                        <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] md:w-auto z-[10001] will-change-transform">
                                <div
                                        className="border rounded-full px-5 py-2.5 flex justify-between items-center md:gap-8 transition-all duration-500"
                                        style={navStyle}
                                >
                                        <button
                                                type="button"
                                                className="text-base font-bold text-[#06b6d4] font-mono tracking-tighter hover:text-white transition-colors duration-300 md:whitespace-nowrap"
                                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                        >
                                                &lt;MS /&gt;
                                        </button>

                                        <div className="hidden md:flex gap-0.5">
                                                {["about", "skills", "projects", "contact"].map((item) => (
                                                        <a
                                                                key={item}
                                                                href={`#${item}`}
                                                                onClick={(e) => handleNavClick(e, item)}
                                                                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 hover:text-[#06b6d4]"
                                                                style={{ color: activeSection === item ? "#ffffff" : "#64748b" }}
                                                        >
                                                                {activeSection === item && (
                                                                        <motion.span
                                                                                layoutId="nav-indicator"
                                                                                className="absolute inset-0 rounded-full"
                                                                                style={{
                                                                                        background: "rgba(8,8,16,0.9)",
                                                                                        border: "1px solid rgba(30,42,58,0.9)",
                                                                                }}
                                                                                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                                                                        />
                                                                )}
                                                                <span className="relative z-10">
                                                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                                                </span>
                                                        </a>
                                                ))}
                                        </div>

                                        <div className="hidden md:flex gap-3 pl-4 border-l border-[#1e2a3a]/60">
                                                <SocialLink
                                                        href="https://github.com/M07ammadSayed"
                                                        icon={Github}
                                                        label="Visit GitHub Profile"
                                                />
                                                <SocialLink
                                                        href="https://www.linkedin.com/in/muhammad-sayyid/"
                                                        icon={Linkedin}
                                                        label="Visit LinkedIn Profile"
                                                />
                                        </div>

                                        <button
                                                className="md:hidden text-[#94a3b8] hover:text-white transition-colors duration-200 p-2"
                                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                        >
                                                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                                        </button>
                                </div>
                        </nav>

                        {mounted && typeof document !== "undefined" && createPortal(
                                <AnimatePresence>
                                        {isMobileMenuOpen && (
                                                <>
                                                        <motion.div
                                                                key="mobile-backdrop"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.25 }}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="fixed inset-0 z-[9998] md:hidden"
                                                                style={{ background: "rgba(8,8,16,0.7)", backdropFilter: "blur(4px)" }}
                                                        />
                                                        <motion.div
                                                                key="mobile-menu"
                                                                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                                className="fixed top-20 left-1/2 -translate-x-1/2 w-[88%] rounded-2xl p-3 flex flex-col gap-1 md:hidden z-[9999]"
                                                                style={{
                                                                        background: "rgba(13,13,26,0.97)",
                                                                        border: "1px solid rgba(30,42,58,0.8)",
                                                                        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
                                                                        backdropFilter: "blur(16px)",
                                                                }}
                                                        >
                                                                {["about", "skills", "projects", "contact"].map((item) => (
                                                                        <a
                                                                                key={item}
                                                                                href={`#${item}`}
                                                                                onClick={(e) => {
                                                                                        handleNavClick(e, item);
                                                                                        setIsMobileMenuOpen(false);
                                                                                }}
                                                                                className="p-3 text-center text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-sm"
                                                                        >
                                                                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                                                        </a>
                                                                ))}
                                                                <div className="mt-1 pt-3 pb-1 border-t border-[#1e2a3a]/60 flex justify-center gap-6">
                                                                        <SocialLink
                                                                                href="https://github.com/M07ammadSayed"
                                                                                icon={Github}
                                                                                label="Visit GitHub Profile"
                                                                        />
                                                                        <SocialLink
                                                                                href="https://www.linkedin.com/in/muhammad-sayyid/"
                                                                                icon={Linkedin}
                                                                                label="Visit LinkedIn Profile"
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
