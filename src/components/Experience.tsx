"use client";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function Experience() {
	return (
		<section
			id="experience"
			className="py-28 md:py-40 px-6 max-w-4xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Briefcase}
				title="Professional Experience"
				desc="Consulting and applied security work."
			/>
			
			<motion.div
				initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
				whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				viewport={{ once: true, margin: "-10%" }}
				transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
				className="relative border border-white/[0.06] bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 md:p-10"
			>
				{/* Top gradient line */}
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06b6d4] via-[#ff6ec7] to-transparent rounded-t-2xl opacity-50" />
				
				<div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8">
					<div>
						<h3 className="text-xl md:text-2xl font-bold text-[#ffffff] tracking-tight mb-2">
							Independent AppSec Consultant
						</h3>
						<div className="inline-flex items-center px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] text-[13px] font-mono">
							&lt;0xMS /&gt; Freelance
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<h4 className="text-[#ffffff] font-semibold mb-2">Service Offerings:</h4>
						<p className="text-slate-400 text-[13px] md:text-sm leading-relaxed">
							Operate an independent Application Security consulting practice, offering API security assessments and secure code review services.
						</p>
					</div>
					<div>
						<h4 className="text-[#ffffff] font-semibold mb-2">Platform Presence:</h4>
						<p className="text-slate-400 text-[13px] md:text-sm leading-relaxed">
							Maintain a professional consulting presence on Upwork and Freelancer.com around AppSec service positioning, with defined service pricing for API security assessments and code reviews.
						</p>
					</div>
					<div>
						<h4 className="text-[#ffffff] font-semibold mb-2">Applied Security Work:</h4>
						<p className="text-slate-400 text-[13px] md:text-sm leading-relaxed">
							Apply hands-on offensive security skills through independent research, including full black-box penetration tests of live applications.
						</p>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
