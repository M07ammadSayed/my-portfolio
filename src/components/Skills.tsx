"use client";
import { Terminal, Shield, Code, Lock } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

const skills = [
	{
		icon: Shield,
		title: "AppSec & Tools",
		desc: "Burp Suite, OWASP ZAP, Postman, Secure Code Review",
		color: "#f472b6",
		glow: "rgba(244, 114, 182, 0.12)",
		tag: "Penetration Testing",
		badge: "Core",
	},
	{
		icon: Lock,
		title: "Web Security",
		desc: "OWASP Top 10, XSS/Injection Prevention, Auth Logic",
		color: "#a78bfa",
		glow: "rgba(167, 139, 250, 0.14)",
		tag: "Threat Modeling",
		badge: "Expert",
	},
	{
		icon: Code,
		title: "Secure Coding",
		desc: "Input Validation, Output Encoding, JWT Handling",
		color: "#34d399",
		glow: "rgba(52, 211, 153, 0.12)",
		tag: "SDL Practices",
		badge: "Advanced",
	},
	{
		icon: Terminal,
		title: "Full Stack Base",
		desc: "React.js, Node.js, Express, MongoDB, Linux",
		color: "#818cf8",
		glow: "rgba(129, 140, 248, 0.12)",
		tag: "DevSecOps",
		badge: "Proficient",
	},
];

export default function Skills() {
	return (
		<section
			id="skills"
			className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Shield}
				title="Security & Tech Stack"
				desc="The toolkit I use to build secure software and identify vulnerabilities."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
				{skills.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
					>
						<TiltCard className="p-7 h-full" glowColor={item.glow}>
							{/* Icon + Badge */}
							<div className="flex items-start justify-between mb-6">
								<div
									className="w-12 h-12 rounded-xl flex items-center justify-center"
									style={{
										background: `${item.color}15`,
										border: `1px solid ${item.color}30`,
									}}
								>
									<item.icon className="w-6 h-6" style={{ color: item.color }} />
								</div>
								<span
									className="text-[10px] font-mono font-bold px-2 py-1 rounded-md tracking-wider uppercase"
									style={{
										color: item.color,
										background: `${item.color}12`,
										border: `1px solid ${item.color}25`,
									}}
								>
									{item.badge}
								</span>
							</div>

							{/* Title */}
							<h3 className="font-bold text-lg mb-2 text-slate-100 leading-snug">
								{item.title}
							</h3>

							{/* Description */}
							<p className="text-slate-500 leading-relaxed text-sm mb-5">
								{item.desc}
							</p>

							{/* Tag */}
							<div className="mt-auto">
								<span
									className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg"
									style={{
										color: item.color,
										background: `${item.color}10`,
										border: `1px solid ${item.color}20`,
									}}
								>
									<span
										className="w-1.5 h-1.5 rounded-full"
										style={{ background: item.color }}
									/>
									{item.tag}
								</span>
							</div>
						</TiltCard>
					</motion.div>
				))}
			</div>
		</section>
	);
}
