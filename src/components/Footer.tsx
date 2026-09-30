"use client";
import { Github, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import SocialLink from "./SocialLink";

const ease = [0.25, 0.1, 0, 1] as const;

export default function Footer() {
	const phoneNumber = "+201068461815";
	const whatsappUrl = "https://wa.me/201068461815";

	return (
		<footer id="contact" className="py-28 md:py-36 relative z-20">
			{/* Top divider */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-lg h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

			<div className="max-w-2xl mx-auto text-center px-6">
				{/* Overline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease }}
					className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#06b6d4]/60 font-mono mb-6"
				>
					Get in touch
				</motion.p>

				<motion.h2
					initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.05, ease }}
					className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffffff] mb-4 tracking-[-0.02em] leading-[1.1]"
				>
					Let&apos;s Talk AppSec.
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1, ease }}
					className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed"
				>
					Open to opportunities in{" "}
					<strong className="text-[#06b6d4] font-semibold">
						Application Security
					</strong>
					.
					<span className="block text-slate-600 text-xs mt-2 font-mono">
						I find the vulnerabilities before attackers do.
					</span>
				</motion.p>

				{/* Phone Number Banner */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.12, ease }}
					className="flex justify-center mb-10"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-300 font-mono text-sm shadow-sm">
						<Phone className="w-4 h-4 text-[#06b6d4]" />
						<span>{phoneNumber}</span>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.15, ease }}
					className="flex justify-center gap-4 flex-wrap mb-20 md:mb-24"
				>
					<SocialLink
						href={`tel:${phoneNumber}`}
						icon={Phone}
						label="Call Direct"
						large
					/>
					<SocialLink
						href={whatsappUrl}
						icon={MessageCircle}
						label="Chat on WhatsApp"
						large
					/>
					<SocialLink
						href="https://github.com/M07ammadSayed"
						icon={Github}
						label="Visit GitHub Profile"
						large
					/>
					<SocialLink
						href="https://www.linkedin.com/in/muhammad-sayyid/"
						icon={Linkedin}
						label="Visit LinkedIn Profile"
						large
					/>
					<SocialLink
						href="mailto:msayed.ms2005@gmail.com?subject=Contact%20from%20Portfolio"
						icon={Mail}
						label="Send Email"
						large
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3, ease }}
					className="text-center font-mono space-y-2"
				>
					<p className="text-slate-700 text-[10px] tracking-widest uppercase">
						© {new Date().getFullYear()} Muhammad Sayyid
					</p>

					<p className="text-slate-600 text-xs">
						Engineered with{" "}
						<span className="text-slate-500">Next.js</span> &{" "}
						<span className="text-slate-500">Security</span>
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
