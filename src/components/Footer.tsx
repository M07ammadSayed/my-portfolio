"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SocialLink from "./SocialLink";

const ease = [0.25, 0.1, 0, 1] as const;

export default function Footer() {
	return (
		<footer
			id="contact"
			className="py-20 border-t border-slate-800/50 bg-[#080810] relative z-20"
		>
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
			<div className="max-w-4xl mx-auto text-center px-6">
				<motion.h2
					initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, ease }}
					className="text-4xl font-bold text-[#ffffff] mb-6"
				>
					Let’s Talk AppSec.
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1, ease }}
					className="text-slate-300 mb-12"
				>
					Open to opportunities in{" "}
					<strong className="text-[#06b6d4]">
						Application Security
					</strong>
					.
					<span className="block text-sm text-slate-600 mt-2">
						I find the vulnerabilities before attackers do.
					</span>
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2, ease }}
					className="flex justify-center gap-6 mb-12"
				>
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
						href="mailto:msayed.ms2005@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Muhammad,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss..."
						icon={Mail}
						label="Send Email"
						large
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4, ease }}
					className="text-center font-mono"
				>
					<p className="text-slate-500 text-xs mb-2">
						© {new Date().getFullYear()} Muhammad Sayyid. All Rights
						Reserved.
					</p>

					<p className="text-slate-400 text-sm">
						Engineered with{" "}
						<span className="text-[#06b6d4] font-semibold">
							Next.js
						</span>{" "}
						&{" "}
						<span className="text-[#06b6d4] font-semibold">
							Security
						</span>
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
