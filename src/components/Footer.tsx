"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SocialLink from "./SocialLink";

export default function Footer() {
	return (
		<footer
			id="contact"
			className="relative py-24 overflow-hidden z-20"
		>
			{/* Top gradient line */}
			<div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

			{/* Background glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/8 blur-[120px] pointer-events-none" />

			<div className="max-w-4xl mx-auto text-center px-6 relative">
				{/* Label */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 text-violet-400 text-xs font-mono tracking-widest uppercase mb-6"
				>
					<span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
					Contact
				</motion.div>

				{/* Heading */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
				>
					<span
						style={{
							background: "linear-gradient(135deg, #f1f0ff 0%, #c4b5fd 50%, #818cf8 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
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
					className="text-slate-500 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed"
				>
					Open to opportunities in{" "}
					<span className="text-violet-400 font-semibold">Application Security</span>.
					<span className="block text-sm text-slate-600 mt-2">
						I find the vulnerabilities before attackers do.
					</span>
				</motion.p>

				{/* Social Links */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex justify-center gap-4 mb-14"
				>
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
				<div className="flex items-center gap-4 mb-8">
					<div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-violet-500/20" />
					<div className="w-1.5 h-1.5 rounded-full bg-violet-500/30" />
					<div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-violet-500/20" />
				</div>

				{/* Copyright */}
				<div className="text-center font-mono space-y-1.5">
					<p className="text-slate-600 text-xs">
						© {new Date().getFullYear()} Muhammad Sayyid. All Rights Reserved.
					</p>
					<p className="text-slate-600 text-xs">
						Engineered with{" "}
						<span className="text-violet-500 font-semibold">Next.js</span>
						{" "}&{" "}
						<span className="text-violet-500 font-semibold">Security</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
