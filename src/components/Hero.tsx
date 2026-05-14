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
			className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
			aria-label="About Me"
		>
			<div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-[#06b6d4]/10 rounded-full animate-spin-slow pointer-events-none md:w-[800px] md:h-[800px] select-none"></div>
			<div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-dashed border-[#06b6d4]/20 rounded-full animate-spin-reverse-slower pointer-events-none select-none"></div>

			{/* Status badge */}
			<motion.div
				initial={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 0.9 }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
				transition={{ duration: 0.8, ease }}
				className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-[#06b6d4]/20 text-[#06b6d4] text-[11px] md:text-xs font-mono mb-12 md:mb-16 backdrop-blur-md hover:bg-white/[0.05] hover:border-[#06b6d4]/40 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.1)] uppercase tracking-[0.2em]"
			>
				<span className="relative flex h-2 w-2 pointer-events-none select-none">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75 pointer-events-none select-none"></span>
					<span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4] pointer-events-none select-none"></span>
				</span>
				Available for AppSec Roles
			</motion.div>

			{/* Main heading */}
			<motion.h1
				initial={{ opacity: 0, scale: 0.95, filter: "blur(15px)" }}
				animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
				transition={{ duration: 1, delay: 0.15, ease }}
				className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] font-extrabold tracking-[-0.04em] mb-4 md:mb-6 relative z-10 leading-[0.95]"
			>
				Securing the <br />
				<div className="relative inline-block mt-2">
					<span className="absolute -inset-4 bg-gradient-to-r from-[#ff6ec7] via-[#a855f7] to-[#06b6d4] opacity-20 blur-3xl rounded-full"></span>
					<DigitalTitle />
				</div>
				<span className="block text-slate-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-4 tracking-[-0.02em]">
					Applications
				</span>
			</motion.h1>

			{/* Description */}
			<motion.p
				initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 0.8, delay: 0.35, ease }}
				className="text-base md:text-lg lg:text-xl text-slate-400/90 max-w-xl leading-[1.8] mb-12 md:mb-16 mt-8 md:mt-10 font-medium"
			>
				I am{" "}
				<strong className="text-white font-bold">Muhammad Sayyid </strong>— a
				Full-Stack Developer turned
				<span className="text-[#06b6d4] font-bold glow-text">
					{" "}
					AppSec Engineer
				</span>
				, leveraging hands-on development experience for deep{" "}
				<span className="text-[#ff6ec7] font-bold">
					White-box Testing
				</span>{" "}
				and secure code reviews.
			</motion.p>

			{/* CTAs */}
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
						className="group relative px-8 py-4 bg-[#a855f7] text-slate-950 rounded-full font-bold text-sm md:text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] w-full sm:w-auto flex justify-center tracking-wide"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
						<span className="flex items-center gap-2.5">
							<Download size={18} strokeWidth={2.5} /> Download CV
						</span>
					</a>
				</MagneticWrapper>
				<MagneticWrapper className="w-full sm:w-auto">
					<a
						href="https://github.com/M07ammadSayed"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="GitHub Profile"
						className="px-8 py-4 bg-transparent text-slate-300 rounded-full font-bold text-sm md:text-base border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.03] transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 w-full sm:w-auto tracking-wide backdrop-blur-sm"
					>
						<Github size={18} strokeWidth={2.5} /> View GitHub
					</a>
				</MagneticWrapper>
			</motion.div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.8, duration: 1.2 }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
			>
				<motion.button
					onClick={() => {
						const el = document.getElementById("skills");
						if (el) el.scrollIntoView({ behavior: "smooth" });
					}}
					aria-label="Scroll to Skills section"
					className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors duration-500 group p-2"
				>
					<span className="text-[9px] uppercase tracking-[0.25em] font-mono">Scroll</span>
					<motion.div
						animate={{ y: [0, 5, 0] }}
						transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
					>
						<ChevronDown size={14} className="opacity-50 group-hover:opacity-80 transition-opacity" />
					</motion.div>
				</motion.button>
			</motion.div>
		</section>
	);
}
