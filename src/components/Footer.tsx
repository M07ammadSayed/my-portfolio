import { Github, Linkedin, Mail } from "lucide-react";
import SocialLink from "./SocialLink";

export default function Footer() {
	return (
		<footer
			id="contact"
			className="py-20 border-t border-slate-800/50 bg-[#020617] relative z-20"
		>
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
			<div className="max-w-4xl mx-auto text-center px-6">
				<h2 className="text-4xl font-bold text-slate-100 mb-6">
					Let’s Talk AppSec.
				</h2>
				<p className="text-slate-400 mb-12">
					Open to opportunities in{" "}
					<strong className="text-cyan-400">
						Application Security
					</strong>
					.
					<span className="block text-sm text-slate-600 mt-2">
						I find the vulnerabilities before attackers do.
					</span>
				</p>
				<div className="flex justify-center gap-6 mb-12">
					<SocialLink
						href="https://github.com/M07ammadSayed"
						icon={Github}
						label="Visit GitHub Profile"
						aria-label="GitHub Profile"
						large
					/>
					<SocialLink
						href="https://www.linkedin.com/in/muhammad-sayyid/"
						icon={Linkedin}
						label="Visit LinkedIn Profile"
						aria-label="LinkedIn Profile"
						large
					/>
					<SocialLink
						href="mailto:msayed.ms2005@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Muhammad,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss..."
						icon={Mail}
						label="Send Email"
						aria-label="Email"
						large
					/>
				</div>
				<div className="text-center font-mono">
					<p className="text-slate-500 text-xs mb-2">
						© {new Date().getFullYear()} Muhammad Sayyid. All Rights
						Reserved.
					</p>

					<p className="text-slate-400 text-sm">
						Engineered with{" "}
						<span className="text-cyan-400 font-semibold">
							Next.js
						</span>{" "}
						&{" "}
						<span className="text-cyan-400 font-semibold">
							Security
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
