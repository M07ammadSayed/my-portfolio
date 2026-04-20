"use client";
import { Terminal, Shield, Code, Lock } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const skills = [
	{
		icon: Shield,
		title: "AppSec & Tools",
		desc: "Burp Suite, OWASP ZAP, Postman, Secure Code Review",
		color: "#d946ef", // fuchsia
		glow: "rgba(217, 70, 239, 0.15)",
		tag: "Penetration Testing",
		badge: "Core",
	},
	{
		icon: Lock,
		title: "Web Security",
		desc: "OWASP Top 10, XSS/Injection Prevention, Auth Logic",
		color: "#06b6d4", // cyan
		glow: "rgba(6, 182, 212, 0.15)",
		tag: "Threat Modeling",
		badge: "Expert",
	},
	{
		icon: Code,
		title: "Secure Coding",
		desc: "Input Validation, Output Encoding, JWT Handling",
		color: "#8b5cf6", // violet
		glow: "rgba(139, 92, 246, 0.15)",
		tag: "SDL Practices",
		badge: "Advanced",
	},
	{
		icon: Terminal,
		title: "Full Stack Base",
		desc: "React.js, Node.js, Express, MongoDB, Linux",
		color: "#4338ca", // indigo
		glow: "rgba(67, 56, 202, 0.15)",
		tag: "DevSecOps",
		badge: "Proficient",
	},
];

export default function Skills() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// Parallax for left and right columns
	const rawYLeft = useTransform(scrollYProgress, [0, 1], [150, -150]);
	const rawYRight = useTransform(scrollYProgress, [0, 1], [250, -250]);
	
	const yLeft = useSpring(rawYLeft, { stiffness: 60, damping: 20 });
	const yRight = useSpring(rawYRight, { stiffness: 60, damping: 20 });

	return (
		<section
			id="skills"
			ref={ref}
			className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Shield}
				title="Security & Tech Stack"
				desc="The toolkit I use to build secure software and identify vulnerabilities."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
				{skills.map((item, index) => {
					// Alternating parallax direction based on index
					const parallaxY = index % 2 === 0 ? yLeft : yRight;

					return (
						<motion.div
							key={index}
							style={{ y: parallaxY }}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
						>
							<TiltCard className="p-8 h-full" glowColor={item.glow}>
								{/* Icon + Badge */}
								<div className="flex items-start justify-between mb-8">
									<div
										className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
										style={{
											background: `${item.color}15`,
											border: `1px solid ${item.color}30`,
											boxShadow: `0 0 20px ${item.color}20 inset`
										}}
									>
										<div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
										<item.icon className="w-7 h-7 relative z-10" style={{ color: item.color }} />
									</div>
									<span
										className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md tracking-widest uppercase"
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
								<h3 className="font-bold text-xl mb-3 text-white leading-snug">
									{item.title}
								</h3>

								{/* Description */}
								<p className="text-slate-400/90 leading-relaxed text-[15px] mb-8 font-light">
									{item.desc}
								</p>

								{/* Tag */}
								<div className="mt-auto">
									<span
										className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg"
										style={{
											color: item.color,
											background: `${item.color}10`,
											border: `1px solid ${item.color}20`,
										}}
									>
										<span
											className="w-1.5 h-1.5 rounded-full"
											style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
										/>
										{item.tag}
									</span>
								</div>
							</TiltCard>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
