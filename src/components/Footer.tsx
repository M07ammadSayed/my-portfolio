"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SocialLink from "./SocialLink";
import { useRef, useEffect, useState } from "react";

export default function Footer() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});

	const [windowHeight, setWindowHeight] = useState(1000);
	useEffect(() => {
		setWindowHeight(window.innerHeight);
	}, []);

	// Extreme Footer Parallax
	// Text flies up from the bottom, background scales wildly
	const rawYContent = useTransform(scrollYProgress, [0, 1], [windowHeight, 0]);
	const rawScaleContent = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
	
	const yContent = useSpring(rawYContent, { stiffness: 40, damping: 20 });
	const scaleContent = useSpring(rawScaleContent, { stiffness: 40, damping: 20 });
	
	// Background Glow Parallax pushes down massively while fading in
	const rawYGlow = useTransform(scrollYProgress, [0, 1], [-windowHeight * 1.5, 0]);
	const rawScaleGlow = useTransform(scrollYProgress, [0, 1], [0.1, 2]);
	const rawOpacityGlow = useTransform(scrollYProgress, [0, 1], [0, 1]);
	
	const yGlow = useSpring(rawYGlow, { stiffness: 30, damping: 25 });
	const scaleGlow = useSpring(rawScaleGlow, { stiffness: 30, damping: 25 });
	const opacityGlow = useSpring(rawOpacityGlow, { stiffness: 30, damping: 25 });

	return (
		<footer
			id="contact"
			ref={ref}
			className="relative py-32 md:py-64 overflow-hidden z-20 perspective-1000"
		>
			{/* Top gradient line */}
			<div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

			{/* Massive Background glow with Parallax */}
			<motion.div 
				style={{ y: yGlow, scale: scaleGlow, opacity: opacityGlow }} 
				className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-violet-600/15 blur-[200px] pointer-events-none mix-blend-screen" 
			/>
			<motion.div 
				style={{ y: yGlow, scale: scaleGlow, opacity: opacityGlow }} 
				className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-fuchsia-600/10 blur-[150px] pointer-events-none mix-blend-screen" 
				transition={{ delay: 0.1 }}
			/>

			<motion.div 
				style={{ y: yContent, scale: scaleContent }}
				className="max-w-4xl mx-auto text-center px-6 relative transform-style-3d"
			>
				{/* Label */}
				<motion.div
					initial={{ opacity: 0, scale: 0.5, y: 50 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
					className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-mono tracking-[0.3em] uppercase mb-10 shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md"
				>
					<span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
					SYSTEM_TERMINATION
				</motion.div>

				{/* Heading */}
				<motion.h2
					initial={{ opacity: 0, rotateX: -40, y: 50 }}
					whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.1 }}
					className="text-6xl md:text-[6rem] font-black mb-8 leading-[1.1] tracking-tighter"
				>
					<span
						style={{
							background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 30%, #8b5cf6 70%, #d946ef 100%)",
							backgroundSize: "200% auto",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
						className="animate-gradient drop-shadow-2xl"
					>
						Let&apos;s Talk AppSec.
					</span>
				</motion.h2>

				{/* Sub-text */}
				<motion.p
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-slate-400 text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-light"
				>
					Open to opportunities in{" "}
					<span className="text-cyan-400 font-bold glow-text tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Application Security</span>.
					<span className="block text-lg text-slate-500 mt-4 font-mono tracking-widest uppercase">
						I find the vulnerabilities before attackers do.
					</span>
				</motion.p>

				{/* Social Links */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8, y: 30 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, type: "spring", bounce: 0.6, delay: 0.3 }}
					className="flex justify-center gap-6 mb-20 relative"
				>
					<div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full" />
					<SocialLink href="https://github.com/M07ammadSayed" icon={Github} label="Visit GitHub Profile" large />
					<SocialLink href="https://www.linkedin.com/in/muhammad-sayyid/" icon={Linkedin} label="Visit LinkedIn Profile" large />
					<SocialLink
						href="mailto:msayed.ms2005@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Muhammad,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss..."
						icon={Mail}
						label="Send Email"
						large
					/>
				</motion.div>

				{/* Divider */}
				<div className="flex items-center gap-4 mb-12 opacity-80">
					<div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-cyan-500/50" />
					<div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-pulse" />
					<div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-fuchsia-500/50" />
				</div>

				{/* Copyright */}
				<div className="text-center font-mono space-y-3">
					<p className="text-slate-400 text-sm tracking-[0.2em]">
						© {new Date().getFullYear()} MUHAMMAD SAYYID. ALL RIGHTS RESERVED.
					</p>
					<p className="text-slate-500 text-xs tracking-widest">
						ENGINEERED WITH{" "}
						<span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">NEXT.JS</span>
						{" "}&{" "}
						<span className="text-fuchsia-400 font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">SECURITY</span>
					</p>
				</div>
			</motion.div>
		</footer>
	);
}
