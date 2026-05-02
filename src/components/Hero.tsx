"use client";
import { Github, Download } from "lucide-react";
import { motion } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";
import { useRef, useState } from "react";

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
			className="relative pt-20 md:pt-32 pb-16 md:pb-20 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
			aria-label="About Me"
		>
			<div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-[#06b6d4]/10 rounded-full animate-spin-slow pointer-events-none md:w-[800px] md:h-[800px] select-none"></div>
			<div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-dashed border-[#06b6d4]/20 rounded-full animate-spin-reverse-slower pointer-events-none select-none"></div>

			<motion.div
				initial={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 0.9 }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
				transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
				className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#080810]/50 border border-[#06b6d4]/20 text-[#06b6d4] text-xs md:text-sm font-mono mb-4 md:mb-8 backdrop-blur-sm hover:bg-[#080810]/80 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
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
				transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
				className="text-4xl md:text-8xl font-bold tracking-tight mb-2 md:mb-4 relative z-10"
			>
				Securing the <br />
				<div className="relative inline-block mt-2">
					<span className="absolute -inset-2 bg-gradient-to-r from-[#ff6ec7] via-[#a855f7] to-[#06b6d4] opacity-20 blur-xl rounded-full"></span>
					<DigitalTitle />
				</div>
				<span className="block text-[#ffffff] text-3xl md:text-5xl font-medium mt-1 mb-2">
					Applications
				</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0, 1] }}
				className="text-base md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-6 md:mb-10 mt-4 md:mt-8"
			>
				I am{" "}
				<strong className="text-[#ffffff]">Muhammad Sayyid </strong>— a
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
				transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0, 1] }}
				className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto relative z-20"
			>
				<MagneticWrapper className="w-full sm:w-auto">
					<a
						href="/Muhammad_Sayyid_Resume.pdf?v=1"
						download="Muhammad_Sayyid_Resume.pdf"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="CV Downloader"
						className="group relative px-8 py-4 bg-[#a855f7] text-white rounded-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] w-full sm:w-auto flex justify-center text-slate-950"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
						<span className="flex items-center gap-2">
							<Download size={20} /> Download CV
						</span>
					</a>
				</MagneticWrapper>
				<MagneticWrapper className="w-full sm:w-auto">
					<a
						href="https://github.com/M07ammadSayed"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="GitHub Profile"
						className="px-8 py-4 bg-[#080810]/50 text-white rounded-xl font-medium border border-slate-700 hover:border-[#06b6d4]/50 hover:bg-[#080810] transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] w-full sm:w-auto"
					>
						<Github size={20} /> View GitHub
					</a>
				</MagneticWrapper>
			</motion.div>
		</section>
	);
}
