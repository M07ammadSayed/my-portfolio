"use client";
import { Github, Download } from "lucide-react";
import { motion } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";

export default function Hero() {
	return (
		<section
			id="about"
			className="relative pt-20 md:pt-32 pb-16 md:pb-20 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
			aria-label="About Me"
		>
			<div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-spin-slow pointer-events-none md:w-[800px] md:h-[800px] select-none"></div>
			<div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-dashed border-cyan-500/20 rounded-full animate-spin-reverse-slower pointer-events-none select-none"></div>

			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-mono mb-4 md:mb-8 backdrop-blur-sm hover:bg-slate-900/80 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
			>
				<span className="relative flex h-2 w-2 pointer-events-none select-none">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pointer-events-none select-none"></span>
					<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 pointer-events-none select-none"></span>
				</span>
				Status: [Authorized] & Ready for AppSec Roles
			</motion.div>
			<motion.h1
				initial={{ opacity: 1, scale: 1 }}
				animate={{ opacity: 1, scale: 1 }}
				className="text-4xl md:text-8xl font-bold tracking-tight mb-2 md:mb-4 relative z-10"
			>
				Defending the <br />
				<div className="relative inline-block mt-2">
					<span className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-cyan-600 opacity-20 blur-xl rounded-full"></span>
					<DigitalTitle />
				</div>
				<span className="block text-slate-400 text-3xl md:text-5xl font-medium mt-1 mb-2">
					Ecosystem
				</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-6 md:mb-10 mt-4 md:mt-8 terminal-cursor"
			>
				I am{" "}
				<strong className="text-slate-100">Muhammad Sayyid </strong>— a
				<span className="text-emerald-400 font-semibold">
					{" "}
					MERN Stack Expert
				</span>{" "}
				evolved into an
				<span className="text-cyan-400 font-semibold glow-text-cyan glitch-hover cursor-default">
					{" "}
					AppSec Engineer
				</span>
				. I bridge the gap between building and breaking, using 6 years
				of dev experience for high-impact{" "}
				<span className="text-purple-400 font-semibold">
					White-box Audits
				</span>{" "}
				and secure architecture.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}
				className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto relative z-20"
			>
				<a
					href="/Muhammad_Sayyid_Resume.pdf?v=1"
					download="Muhammad_Sayyid_Resume.pdf"
					target="_blank"
					rel="me noopener noreferrer"
					aria-label="CV Downloader"
					className="group relative px-8 py-4 bg-cyan-600 text-white rounded-xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(8,145,178,0.4)] w-full sm:w-auto flex justify-center text-slate-950"
				>
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
					<span className="flex items-center gap-2">
						<Download size={20} /> Download CV
					</span>
				</a>
				<a
					href="https://github.com/M07ammadSayed"
					target="_blank"
					rel="me noopener noreferrer"
					aria-label="GitHub Profile"
					className="px-8 py-4 bg-slate-900/50 text-white rounded-xl font-medium border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 w-full sm:w-auto"
				>
					<Github size={20} /> View GitHub
				</a>
			</motion.div>
		</section>
	);
}
