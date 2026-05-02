"use client";
import { Github, Download } from "lucide-react";
import { motion } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";
import { useRef, useState } from "react";

function MagneticWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
        const ref = useRef<HTMLDivElement>(null);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
                if (!ref.current) return;
                const { clientX, clientY } = e;
                const { height, width, left, top } = ref.current.getBoundingClientRect();
                const middleX = clientX - (left + width / 2);
                const middleY = clientY - (top + height / 2);
                setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
        };

        const reset = () => setPosition({ x: 0, y: 0 });
        const { x, y } = position;

        return (
                <motion.div
                        ref={ref}
                        onMouseMove={handleMouse}
                        onMouseLeave={reset}
                        animate={{ x, y }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
                        className={className}
                >
                        {children}
                </motion.div>
        );
}

export default function Hero() {
        return (
                <section
                        id="about"
                        className="relative pt-24 md:pt-36 pb-24 md:pb-32 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
                        aria-label="About Me"
                >
                        {/* Subtle static decorative rings — no spin */}
                        <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] md:w-[780px] md:h-[780px] rounded-full pointer-events-none select-none"
                                style={{
                                        border: "1px solid rgba(6, 182, 212, 0.07)",
                                        animation: "breathe 8s ease-in-out infinite",
                                }}
                        />
                        <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[520px] md:h-[520px] rounded-full pointer-events-none select-none"
                                style={{
                                        border: "1px dashed rgba(168, 85, 247, 0.1)",
                                        animation: "breathe 11s ease-in-out infinite 2s",
                                }}
                        />

                        {/* Status badge */}
                        <motion.div
                                initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#080810]/60 border border-[#06b6d4]/15 text-[#06b6d4] text-xs md:text-sm font-mono mb-6 md:mb-10 backdrop-blur-sm hover:border-[#06b6d4]/30 transition-colors duration-300"
                        >
                                <span className="relative flex h-1.5 w-1.5 pointer-events-none select-none">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-60 pointer-events-none select-none" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#06b6d4] pointer-events-none select-none" />
                                </span>
                                Available for AppSec Roles
                        </motion.div>

                        {/* Main heading */}
                        <motion.h1
                                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display font-extrabold tracking-tight mb-3 md:mb-5 relative z-10"
                                style={{
                                        fontSize: "clamp(2.6rem, 7vw + 1rem, 6.5rem)",
                                        lineHeight: 1.0,
                                        letterSpacing: "-0.03em",
                                }}
                        >
                                Securing the <br />
                                <span className="relative inline-block mt-2 md:mt-3">
                                        <span className="absolute -inset-4 bg-gradient-to-r from-[#a855f7]/15 via-[#06b6d4]/10 to-transparent blur-2xl rounded-full pointer-events-none" />
                                        <DigitalTitle />
                                </span>
                                <span
                                        className="block text-white font-semibold mt-1 md:mt-2"
                                        style={{
                                                fontSize: "clamp(1.6rem, 3.5vw + 0.5rem, 3.5rem)",
                                                letterSpacing: "-0.02em",
                                        }}
                                >
                                        Applications
                                </span>
                        </motion.h1>

                        {/* Sub-copy */}
                        <motion.p
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[#94a3b8] max-w-xl leading-relaxed mb-8 md:mb-12 mt-6 md:mt-8"
                                style={{ fontSize: "clamp(0.95rem, 1vw + 0.7rem, 1.125rem)" }}
                        >
                                I am{" "}
                                <strong className="text-white font-semibold">Muhammad Sayyid</strong> — a
                                Full-Stack Developer turned{" "}
                                <span className="text-[#06b6d4] font-medium glow-text">AppSec Engineer</span>,
                                leveraging hands-on development experience for deep{" "}
                                <span className="text-[#a855f7] font-medium">White-box Testing</span> and
                                secure code reviews.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto relative z-20"
                        >
                                <MagneticWrapper className="w-full sm:w-auto">
                                        <a
                                                href="/Muhammad_Sayyid_Resume.pdf?v=1"
                                                download="Muhammad_Sayyid_Resume.pdf"
                                                target="_blank"
                                                rel="me noopener noreferrer"
                                                aria-label="CV Downloader"
                                                className="group relative px-8 py-3.5 rounded-xl font-semibold overflow-hidden w-full sm:w-auto flex justify-center items-center gap-2 text-sm transition-all duration-300"
                                                style={{
                                                        background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                                                        color: "#fff",
                                                        boxShadow: "0 0 24px rgba(168,85,247,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                                                }}
                                                onMouseEnter={(e) => {
                                                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 36px rgba(6,182,212,0.4), 0 4px 20px rgba(0,0,0,0.5)";
                                                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(168,85,247,0.3), 0 4px 16px rgba(0,0,0,0.4)";
                                                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                                                }}
                                        >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
                                                <Download size={17} />
                                                Download CV
                                        </a>
                                </MagneticWrapper>

                                <MagneticWrapper className="w-full sm:w-auto">
                                        <a
                                                href="https://github.com/M07ammadSayed"
                                                target="_blank"
                                                rel="me noopener noreferrer"
                                                aria-label="GitHub Profile"
                                                className="px-8 py-3.5 bg-transparent text-[#94a3b8] hover:text-white rounded-xl font-medium border border-[#1e2a3a] hover:border-[#06b6d4]/40 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 text-sm w-full sm:w-auto hover:bg-[#06b6d4]/5"
                                        >
                                                <Github size={17} />
                                                View GitHub
                                        </a>
                                </MagneticWrapper>
                        </motion.div>
                </section>
        );
}
