"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
        const [isVisible, setIsVisible] = useState(false);
        const { scrollYProgress } = useScroll();
        const pathLength = useSpring(scrollYProgress, {
                stiffness: 100,
                damping: 30,
        });

        useEffect(() => {
                const toggleVisibility = () => setIsVisible(window.scrollY > 300);
                window.addEventListener("scroll", toggleVisibility, { passive: true });
                return () => window.removeEventListener("scroll", toggleVisibility);
        }, []);

        const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

        return (
                <AnimatePresence>
                        {isVisible && (
                                <motion.button
                                        aria-label="Scroll to top"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.93 }}
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.6, transition: { delay: 0.5 } }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={scrollToTop}
                                        className="fixed bottom-8 right-8 z-[90] p-3 rounded-full group transition-colors duration-300"
                                        style={{
                                                background: "rgba(13,13,26,0.9)",
                                                border: "1px solid rgba(30,42,58,0.8)",
                                                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                                                backdropFilter: "blur(12px)",
                                        }}
                                        onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(6,182,212,0.35)";
                                        }}
                                        onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(30,42,58,0.8)";
                                        }}
                                >
                                        <svg
                                                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                                                viewBox="0 0 100 100"
                                        >
                                                <motion.circle
                                                        cx="50"
                                                        cy="50"
                                                        r="46"
                                                        fill="none"
                                                        stroke="#06b6d4"
                                                        strokeWidth="3"
                                                        strokeDasharray="1 1"
                                                        pathLength={pathLength}
                                                        style={{ opacity: 0.6 }}
                                                />
                                        </svg>
                                        <ArrowUp className="w-5 h-5 text-[#475569] group-hover:text-[#06b6d4] transition-colors duration-300" />
                                </motion.button>
                        )}
                </AnimatePresence>
        );
}
