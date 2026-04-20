"use client";
import { Github, Download } from "lucide-react";
import { motion } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";

export default function Hero() {
	return (
		<section
			id="about"
			className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
			aria-label="About Me"
		>
			{/* Rotating Rings */}
			<div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] border border-violet-500/8 rounded-full animate-spin-slow pointer-events-none select-none md:w-[900px] md:h-[900px]" />
			<div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-dashed border-indigo-400/10 rounded-full animate-spin-reverse-slower pointer-events-none select-none" />
			<div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] border border-violet-400/6 rounded-full animate-spin-slow pointer-events-none select-none" style={{ animationDuration: '15s' }} />

			{/* Center Core Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />

			{/* Status Badge */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-violet-950/60 border border-violet-500/20 text-violet-300 text-xs md:text-sm font-mono mb-6 md:mb-10 backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-violet-400/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-300"
			>
				<span className="relative flex h-2 w-2 pointer-events-none select-none">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
					<span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
				</span>
				Available for AppSec Roles
			</motion.div>

			{/* Main Heading */}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.1 }}
				className="text-4xl md:text-8xl font-bold tracking-tight mb-2 md:mb-4 relative z-10"
			>
				Securing the{" "}
				<br />
				<div className="relative inline-block mt-2">
					<span className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-indigo-500/20 to-cyan-500/15 opacity-60 blur-2xl rounded-full pointer-events-none" />
					<DigitalTitle />
				</div>
				<span className="block text-slate-500 text-3xl md:text-5xl font-medium mt-2 mb-2">
					Applications
				</span>
			</motion.h1>

			{/* Description */}
			<motion.p
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.25 }}
				className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8 md:mb-12 mt-4 md:mt-6"
			>
				I am{" "}
				<strong className="text-slate-100 font-semibold">Muhammad Sayyid</strong>{" "}
				— a Full-Stack Developer turned{" "}
				<span className="font-semibold glow-text" style={{ color: '#a78bfa' }}>
					AppSec Engineer
				</span>
				, leveraging hands-on development experience for deep{" "}
				<span className="text-indigo-400 font-semibold">
					White-box Testing
				</span>{" "}
				and secure code reviews.
			</motion.p>

			{/* CTA Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.45 }}
				className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto relative z-20"
			>
				{/* Primary CTA */}
				<a
					href="/Muhammad_Sayyid_Resume.pdf?v=1"
					download="Muhammad_Sayyid_Resume.pdf"
					target="_blank"
					rel="me noopener noreferrer"
					aria-label="CV Downloader"
					className="group relative px-8 py-4 rounded-xl font-bold overflow-hidden transition-all hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto flex justify-center items-center gap-2 text-white"
					style={{
						background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)',
						boxShadow: '0 0 25px rgba(124, 58, 237, 0.4), 0 4px 20px rgba(99, 102, 241, 0.3)',
					}}
				>
					{/* Shimmer */}
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
					{/* Hover Glow */}
					<span className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
					<Download size={18} className="relative z-10" />
					<span className="relative z-10">Download CV</span>
				</a>

				{/* Secondary CTA */}
				<a
					href="https://github.com/M07ammadSayed"
					target="_blank"
					rel="me noopener noreferrer"
					aria-label="GitHub Profile"
					className="group px-8 py-4 rounded-xl font-medium border transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 w-full sm:w-auto relative overflow-hidden"
					style={{
						background: 'rgba(13, 13, 26, 0.8)',
						borderColor: 'rgba(139, 92, 246, 0.25)',
						backdropFilter: 'blur(12px)',
					}}
					onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.5)')}
					onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)')}
				>
					<span className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
					<Github size={18} className="relative z-10 text-slate-400 group-hover:text-violet-300 transition-colors" />
					<span className="relative z-10 text-slate-300 group-hover:text-violet-200 transition-colors">View GitHub</span>
				</a>
			</motion.div>

			{/* Scroll Hint */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.8 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs font-mono"
			>
				<span>scroll</span>
				<motion.div
					animate={{ y: [0, 6, 0] }}
					transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
					className="w-[1px] h-8 bg-gradient-to-b from-violet-500/40 to-transparent"
				/>
			</motion.div>
		</section>
	);
}
