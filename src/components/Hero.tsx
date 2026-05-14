"use client";
import { Github, Download, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";
import { useRef, useState } from "react";

const ease = [0.25, 0.1, 0, 1] as const;

function MagneticWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const { clientX, clientY } = e;
		const { height, width, left, top } = ref.current.getBoundingClientRect();
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
	};

	const reset = () => {
		setPosition({ x: 0, y: 0 });
	};

	const { x, y } = position;

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x, y }}
			transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
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
			className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
			aria-label="About Me"
		>
			<div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-[#06b6d4]/10 rounded-full animate-spin-slow pointer-events-none md:w-[800px] md:h-[800px] select-none"></div>
			<div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-dashed border-[#06b6d4]/20 rounded-full animate-spin-reverse-slower pointer-events-none select-none"></div>

			<motion.div
				initial={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 0.9 }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
				transition={{ duration: 0.8, ease }}
				className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#080810]/50 border border-[#06b6d4]/20 text-[#06b6d4] text-xs md:text-sm font-mono mb-6 md:mb-10 backdrop-blur-sm hover:bg-[#080810]/80 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] tracking-label"
			>
				<span className="relative flex h-2 w-2 pointer-events-none select-none">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75 pointer-events-none select-none"></span>
					<span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4] pointer-events-none select-none"></span>
				</span>
				Available for AppSec Roles
			</motion.div>
			<motion.h1
				initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
				animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
				transition={{ duration: 1, delay: 0.15, ease }}
				className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 md:mb-5 relative z-10 leading-[1.1]"
			>
				Securing the <br />
				<div className="relative inline-block mt-2">
					<span className="absolute -inset-2 bg-gradient-to-r from-[#ff6ec7] via-[#a855f7] to-[#06b6d4] opacity-20 blur-xl rounded-full"></span>
					<DigitalTitle />
				</div>
				<span className="block text-[#ffffff] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-2 mb-2 tracking-tight">
					Applications
				</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 0.8, delay: 0.35, ease }}
				className="text-base md:text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed mb-8 md:mb-12 mt-5 md:mt-8"
			>
				I am{" "}
				<strong className="text-[#ffffff] font-semibold">Muhammad Sayyid </strong>— a
				Full-Stack Developer turned
				<span className="text-[#06b6d4] font-semibold glow-text">
					{" "}
					AppSec Engineer
				</span>
				, leveraging hands-on development experience for deep{" "}
				<span className="text-[#ff6ec7] font-semibold">
					White-box Testing
				</span>{" "}
				and secure code reviews.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 0.8, delay: 0.55, ease }}
				className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20"
			>
				<MagneticWrapper className="w-full sm:w-auto">
					<a
						href="/Muhammad_Sayyid_Resume.pdf?v=1"
						download="Muhammad_Sayyid_Resume.pdf"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="CV Downloader"
						className="group relative px-8 py-4 bg-[#a855f7] text-slate-950 rounded-xl font-bold overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] w-full sm:w-auto flex justify-center"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
						<span className="flex items-center gap-2.5">
							<Download size={18} /> Download CV
						</span>
					</a>
				</MagneticWrapper>
				<MagneticWrapper className="w-full sm:w-auto">
					<a
						href="https://github.com/M07ammadSayed"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="GitHub Profile"
						className="px-8 py-4 bg-[#080810]/50 text-white rounded-xl font-medium border border-slate-700 hover:border-[#06b6d4]/50 hover:bg-[#080810] transition-all duration-200 flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] w-full sm:w-auto"
					>
						<Github size={18} /> View GitHub
					</a>
				</MagneticWrapper>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 1 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
			>
				<motion.button
					onClick={() => {
						const el = document.getElementById("skills");
						if (el) el.scrollIntoView({ behavior: "smooth" });
					}}
					aria-label="Scroll to Skills section"
					className="flex flex-col items-center gap-2 text-slate-500 hover:text-[#06b6d4] transition-colors duration-300 group p-2"
				>
					<span className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll</span>
					<motion.div
						animate={{ y: [0, 6, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					>
						<ChevronDown size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
					</motion.div>
				</motion.button>
			</motion.div>
		</section>
	);
}
