"use client";
import { Github, Download } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DigitalTitle from "@/components/DigitalTitle";
import { useEffect, useState } from "react";

export default function Hero() {
	const { scrollY } = useScroll();
	const [windowHeight, setWindowHeight] = useState(1000);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
		const handleResize = () => setWindowHeight(window.innerHeight);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Extreme Hero Parallax (Explosion Effect on Scroll)
	const yText = useSpring(useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.8]), { stiffness: 40, damping: 20 });
	const opacityText = useSpring(useTransform(scrollY, [0, windowHeight * 0.6], [1, 0]), { stiffness: 50, damping: 20 });
	const scaleText = useSpring(useTransform(scrollY, [0, windowHeight], [1, 0.8]), { stiffness: 40, damping: 20 });

	// Rings shoot upward and expand massively
	const yRings = useSpring(useTransform(scrollY, [0, windowHeight], [0, -windowHeight * 1.2]), { stiffness: 30, damping: 25 });
	const scaleRings = useSpring(useTransform(scrollY, [0, windowHeight], [1, 3]), { stiffness: 30, damping: 25 });
	const rotateRings = useSpring(useTransform(scrollY, [0, windowHeight], [0, 180]), { stiffness: 30, damping: 25 });

	// Buttons scatter horizontally
	const xLeftBtn = useSpring(useTransform(scrollY, [0, windowHeight], [0, -300]), { stiffness: 50, damping: 20 });
	const xRightBtn = useSpring(useTransform(scrollY, [0, windowHeight], [0, 300]), { stiffness: 50, damping: 20 });
	const opacityBtns = useSpring(useTransform(scrollY, [0, windowHeight * 0.5], [1, 0]), { stiffness: 60, damping: 20 });

	return (
		<section
			id="about"
			className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-6 flex flex-col items-center justify-center min-h-[100dvh] text-center z-10 overflow-hidden perspective-1000"
			aria-label="About Me"
		>
			{/* Explosive Rotating Rings */}
			<motion.div 
				style={{ y: yRings, scale: scaleRings, rotate: rotateRings }} 
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 flex items-center justify-center transform-style-3d"
			>
				{/* Massive outer ring */}
				<div className="absolute w-[900px] h-[900px] border-[2px] border-violet-500/10 rounded-full animate-spin-slow md:w-[1200px] md:h-[1200px]" />
				<div className="absolute w-[600px] h-[600px] border-[1px] border-dashed border-fuchsia-400/20 rounded-full animate-spin-reverse-slower" />
				<div className="absolute w-[350px] h-[350px] border-[3px] border-cyan-400/15 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
				
				{/* Intense Core Glow */}
				<div className="absolute w-[300px] h-[300px] rounded-full bg-fuchsia-600/20 blur-[100px]" />
			</motion.div>

			<motion.div
				style={{ y: yText, opacity: opacityText, scale: scaleText }}
				className="relative z-10 flex flex-col items-center transform-style-3d"
			>
				{/* Status Badge */}
				<motion.div
					initial={{ opacity: 0, y: -40, scale: 0.8 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 1, type: "spring", bounce: 0.5 }}
					className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/40 border border-violet-500/40 text-violet-300 text-xs md:text-sm font-mono mb-8 md:mb-12 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:border-fuchsia-400/60 hover:shadow-[0_0_60px_rgba(217,70,239,0.5)] transition-all duration-500"
				>
					<span className="relative flex h-2.5 w-2.5 pointer-events-none select-none">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-100" />
						<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500 shadow-[0_0_10px_#d946ef]" />
					</span>
					AVAILABLE FOR APPSEC ROLES
				</motion.div>

				{/* Main Heading */}
				<motion.h1
					initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
					animate={{ opacity: 1, scale: 1, rotateX: 0 }}
					transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.1 }}
					className="text-5xl md:text-[7.5rem] font-black tracking-tighter leading-[1.1] mb-4 md:mb-8 relative"
				>
					Securing the{" "}
					<br />
					<div className="relative inline-block mt-2 md:mt-4">
						<span className="absolute -inset-10 bg-gradient-to-r from-violet-600/40 via-fuchsia-500/30 to-cyan-500/30 opacity-80 blur-3xl rounded-full pointer-events-none" />
						<DigitalTitle />
					</div>
					<span className="block text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-600 text-4xl md:text-6xl font-extrabold mt-4 mb-4 tracking-tight">
						Applications
					</span>
				</motion.h1>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.3 }}
					className="text-lg md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-10 md:mb-14 mt-4 md:mt-8 font-light"
				>
					I am{" "}
					<strong className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Muhammad Sayyid</strong>{" "}
					— a Full-Stack Developer turned{" "}
					<span className="font-bold glow-text tracking-wide" style={{ color: '#d946ef' }}>
						AppSec Engineer
					</span>
					, leveraging hands-on development experience for deep{" "}
					<span className="text-cyan-400 font-bold drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
						White-box Testing
					</span>{" "}
					and secure code reviews.
				</motion.p>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-5 md:gap-6 w-full sm:w-auto relative z-20 overflow-visible">
					{/* Primary CTA (Scatters Left) */}
					<motion.div style={{ x: xLeftBtn, opacity: opacityBtns }}>
						<a
							href="/Muhammad_Sayyid_Resume.pdf?v=1"
							download="Muhammad_Sayyid_Resume.pdf"
							target="_blank"
							rel="me noopener noreferrer"
							className="group relative px-10 py-5 rounded-2xl font-bold overflow-hidden transition-all hover:scale-[1.05] active:scale-[0.95] w-full sm:w-auto flex justify-center items-center gap-3 text-white shadow-[0_0_40px_rgba(217,70,239,0.5)] border border-fuchsia-400/50"
							style={{
								background: 'linear-gradient(135deg, rgba(217,70,239,0.8) 0%, rgba(139,92,246,0.8) 50%, rgba(6,182,212,0.8) 100%)',
								backgroundSize: '200% auto',
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
							<div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
							<Download size={24} className="relative z-10" />
							<span className="relative z-10 text-lg tracking-wider">DOWNLOAD CV</span>
						</a>
					</motion.div>

					{/* Secondary CTA (Scatters Right) */}
					<motion.div style={{ x: xRightBtn, opacity: opacityBtns }}>
						<a
							href="https://github.com/M07ammadSayed"
							target="_blank"
							rel="me noopener noreferrer"
							className="group px-10 py-5 rounded-2xl font-bold border transition-all hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center gap-3 w-full sm:w-auto relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.2)]"
							style={{
								background: 'rgba(11, 7, 38, 0.4)',
								borderColor: 'rgba(139, 92, 246, 0.5)',
								backdropFilter: 'blur(20px)',
							}}
							onMouseEnter={e => {
								e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.8)';
								e.currentTarget.style.boxShadow = '0 0 40px rgba(6, 182, 212, 0.4)';
								e.currentTarget.style.background = 'rgba(11, 7, 38, 0.8)';
							}}
							onMouseLeave={e => {
								e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
								e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.2)';
								e.currentTarget.style.background = 'rgba(11, 7, 38, 0.4)';
							}}
						>
							<span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
							<Github size={24} className="relative z-10 text-slate-300 group-hover:text-cyan-300 transition-colors" />
							<span className="relative z-10 text-slate-200 group-hover:text-white transition-colors text-lg tracking-wider">VIEW GITHUB</span>
						</a>
					</motion.div>
				</div>
			</motion.div>

			{/* Scroll Hint */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2, duration: 1 }}
				className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-cyan-400/80 text-[10px] font-mono tracking-[0.3em] uppercase"
			>
				<span>Initiate Sequence</span>
				<motion.div
					animate={{ y: [0, 15, 0], opacity: [0.2, 1, 0.2] }}
					transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
					className="w-[2px] h-16 rounded-full"
					style={{ background: 'linear-gradient(to bottom, rgba(6,182,212,1), transparent)' }}
				/>
			</motion.div>
		</section>
	);
}
