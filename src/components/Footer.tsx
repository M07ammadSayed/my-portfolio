"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SocialLink from "./SocialLink";
import { useRef } from "react";

export default function Footer() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});

	// Footer Parallax
	const rawYContent = useTransform(scrollYProgress, [0, 1], [150, 0]);
	const yContent = useSpring(rawYContent, { stiffness: 50, damping: 20 });
	
	// Background Glow Parallax
	const rawYGlow = useTransform(scrollYProgress, [0, 1], [-200, 0]);
	const yGlow = useSpring(rawYGlow, { stiffness: 40, damping: 25 });

	return (
		<footer
			id="contact"
			ref={ref}
			className="relative py-32 md:py-48 overflow-hidden z-20 bg-[#030014]/50 backdrop-blur-sm"
		>
			{/* Top gradient line */}
			<div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />

			{/* Background glow with Parallax */}
			<motion.div 
				style={{ y: yGlow }} 
				className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" 
			/>

			<motion.div 
				style={{ y: yContent }}
				className="max-w-4xl mx-auto text-center px-6 relative"
			>
				{/* Label */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(217,70,239,0.15)]"
				>
					<span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
					Contact Sequence
				</motion.div>

				{/* Heading */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-5xl md:text-7xl font-black mb-6 leading-tight"
				>
					<span
						style={{
							background: "linear-gradient(135deg, #ffffff 0%, #d946ef 40%, #8b5cf6 80%, #06b6d4 100%)",
							backgroundSize: "200% auto",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
						className="animate-gradient"
					>
						Let&apos;s Talk AppSec.
					</span>
				</motion.h2>

				{/* Sub-text */}
				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-slate-400 text-lg md:text-xl mb-14 max-w-lg mx-auto leading-relaxed font-light"
				>
					Open to opportunities in{" "}
					<span className="text-fuchsia-400 font-bold glow-text">Application Security</span>.
					<span className="block text-base text-slate-500 mt-3 font-mono">
						I find the vulnerabilities before attackers do.
					</span>
				</motion.p>

				{/* Social Links */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex justify-center gap-5 mb-16 relative"
				>
					{/* Glowing backplate for socials */}
					<div className="absolute inset-0 bg-violet-500/5 blur-2xl rounded-full" />
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
				<div className="flex items-center gap-4 mb-10 opacity-60">
					<div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-fuchsia-500/30" />
					<div className="w-2 h-2 rounded-full bg-fuchsia-400/50 shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
					<div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-violet-500/30" />
				</div>

				{/* Copyright */}
				<div className="text-center font-mono space-y-2">
					<p className="text-slate-500 text-xs tracking-wider">
						© {new Date().getFullYear()} MUHAMMAD SAYYID. ALL RIGHTS RESERVED.
					</p>
					<p className="text-slate-600 text-xs tracking-wide">
						ENGINEERED WITH{" "}
						<span className="text-fuchsia-500 font-bold">NEXT.JS</span>
						{" "}&{" "}
						<span className="text-violet-500 font-bold">SECURITY</span>
					</p>
				</div>
			</motion.div>
		</footer>
	);
}
