"use client";
import { Github, Download } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";

export default function Hero() {
	const { scrollY } = useScroll();

	// Smooth Parallax Transformations
	const rawYText = useTransform(scrollY, [0, 1000], [0, 250]);
	const rawOpacity = useTransform(scrollY, [0, 500], [1, 0]);
	const rawYRings = useTransform(scrollY, [0, 1000], [0, 450]);

	const yText = useSpring(rawYText, { stiffness: 60, damping: 20 });
	const opacityText = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
	const yRings = useSpring(rawYRings, { stiffness: 40, damping: 25 });

	return (
		<section
			id="about"
			className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden"
			aria-label="About Me"
		>
			{/* Rotating Rings with Parallax */}
			<motion.div style={{ y: yRings }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 flex items-center justify-center">
				<div className="absolute w-[700px] h-[700px] border border-violet-500/10 rounded-full animate-spin-slow md:w-[900px] md:h-[900px]" />
				<div className="absolute w-[500px] h-[500px] border border-dashed border-fuchsia-400/15 rounded-full animate-spin-reverse-slower" />
				<div className="absolute w-[320px] h-[320px] border border-cyan-400/10 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }} />
				
				{/* Center Core Glow */}
				<div className="absolute w-[280px] h-[280px] rounded-full bg-fuchsia-600/15 blur-[90px]" />
			</motion.div>

			<motion.div
				style={{ y: yText, opacity: opacityText }}
				className="relative z-10 flex flex-col items-center"
			>
				{/* Status Badge */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs md:text-sm font-mono mb-6 md:mb-10 backdrop-blur-md shadow-[0_0_25px_rgba(139,92,246,0.2)] hover:border-fuchsia-400/50 hover:shadow-[0_0_35px_rgba(217,70,239,0.3)] transition-all duration-300"
				>
					<span className="relative flex h-2 w-2 pointer-events-none select-none">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-80" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500" />
					</span>
					Available for AppSec Roles
				</motion.div>

				{/* Main Heading */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1 }}
					className="text-4xl md:text-8xl font-black tracking-tight mb-2 md:mb-4 relative"
				>
					Securing the{" "}
					<br />
					<div className="relative inline-block mt-2">
						<span className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/20 to-cyan-500/20 opacity-70 blur-2xl rounded-full pointer-events-none" />
						<DigitalTitle />
					</div>
					<span className="block text-slate-400 text-3xl md:text-5xl font-semibold mt-3 mb-2">
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
					<strong className="text-white font-bold">Muhammad Sayyid</strong>{" "}
					— a Full-Stack Developer turned{" "}
					<span className="font-bold glow-text" style={{ color: '#d946ef' }}>
						AppSec Engineer
					</span>
					, leveraging hands-on development experience for deep{" "}
					<span className="text-cyan-400 font-bold">
						White-box Testing
					</span>{" "}
					and secure code reviews.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.45 }}
					className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto relative z-20"
				>
					{/* Primary CTA */}
					<a
						href="/Muhammad_Sayyid_Resume.pdf?v=1"
						download="Muhammad_Sayyid_Resume.pdf"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="CV Downloader"
						className="group relative px-8 py-4 rounded-xl font-bold overflow-hidden transition-all hover:scale-[1.04] active:scale-[0.96] w-full sm:w-auto flex justify-center items-center gap-2 text-white"
						style={{
							background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 50%, #06b6d4 100%)',
							backgroundSize: '200% auto',
							boxShadow: '0 0 30px rgba(217, 70, 239, 0.4), 0 4px 20px rgba(139, 92, 246, 0.3)',
						}}
					>
						{/* Shimmer */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
						{/* Hover Glow */}
						<span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
						<Download size={20} className="relative z-10" />
						<span className="relative z-10 text-[15px] tracking-wide">Download CV</span>
					</a>

					{/* Secondary CTA */}
					<a
						href="https://github.com/M07ammadSayed"
						target="_blank"
						rel="me noopener noreferrer"
						aria-label="GitHub Profile"
						className="group px-8 py-4 rounded-xl font-semibold border transition-all hover:scale-[1.04] active:scale-[0.96] flex items-center justify-center gap-2 w-full sm:w-auto relative overflow-hidden"
						style={{
							background: 'rgba(11, 7, 38, 0.7)',
							borderColor: 'rgba(139, 92, 246, 0.3)',
							backdropFilter: 'blur(16px)',
						}}
						onMouseEnter={e => {
							e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.6)';
							e.currentTarget.style.boxShadow = '0 0 25px rgba(217, 70, 239, 0.2)';
						}}
						onMouseLeave={e => {
							e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
							e.currentTarget.style.boxShadow = 'none';
						}}
					>
						<span className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
						<Github size={20} className="relative z-10 text-slate-400 group-hover:text-white transition-colors" />
						<span className="relative z-10 text-slate-300 group-hover:text-white transition-colors tracking-wide">View GitHub</span>
					</a>
				</motion.div>
			</motion.div>

			{/* Scroll Hint */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.8 }}
				className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fuchsia-400/60 text-xs font-mono"
			>
				<span className="tracking-[0.2em] uppercase text-[10px]">Scroll</span>
				<motion.div
					animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
					transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
					className="w-[2px] h-10 rounded-full"
					style={{ background: 'linear-gradient(to bottom, rgba(217,70,239,0.8), transparent)' }}
				/>
			</motion.div>
		</section>
	);
}
