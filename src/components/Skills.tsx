"use client";
import { Terminal, Shield, Code, Lock } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const skills = [
	{
		icon: Shield,
		title: "AppSec & Tools",
		desc: "Burp Suite, OWASP ZAP, Postman, Secure Code Review",
		color: "#d946ef", // fuchsia
		glow: "rgba(217, 70, 239, 0.2)",
		tag: "Penetration Testing",
		badge: "Core",
	},
	{
		icon: Lock,
		title: "Web Security",
		desc: "OWASP Top 10, XSS/Injection Prevention, Auth Logic",
		color: "#06b6d4", // cyan
		glow: "rgba(6, 182, 212, 0.2)",
		tag: "Threat Modeling",
		badge: "Expert",
	},
	{
		icon: Code,
		title: "Secure Coding",
		desc: "Input Validation, Output Encoding, JWT Handling",
		color: "#8b5cf6", // violet
		glow: "rgba(139, 92, 246, 0.2)",
		tag: "SDL Practices",
		badge: "Advanced",
	},
	{
		icon: Terminal,
		title: "Full Stack Base",
		desc: "React.js, Node.js, Express, MongoDB, Linux",
		color: "#4338ca", // indigo
		glow: "rgba(67, 56, 202, 0.2)",
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

	const [windowHeight, setWindowHeight] = useState(1000);
	useEffect(() => {
		setWindowHeight(window.innerHeight);
	}, []);

	// Extreme Parallax for left and right columns
	// They come from extreme Y offsets and converge towards the center
	const rawYLeft = useTransform(scrollYProgress, [0, 0.5, 1], [windowHeight * 0.8, 0, -windowHeight * 0.8]);
	const rawYRight = useTransform(scrollYProgress, [0, 0.5, 1], [windowHeight * 1.2, 0, -windowHeight * 1.2]);
	const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
	const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
	
	const yLeft = useSpring(rawYLeft, { stiffness: 40, damping: 20 });
	const yRight = useSpring(rawYRight, { stiffness: 40, damping: 20 });
	const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
	const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });

	return (
		<section
			id="skills"
			ref={ref}
			className="py-32 md:py-48 px-6 max-w-7xl mx-auto relative z-10"
		>
			<motion.div style={{ opacity }}>
				<SectionHeader
					icon={Shield}
					title="Security & Tech Stack"
					desc="The toolkit I use to build secure software and identify vulnerabilities."
				/>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
				{skills.map((item, index) => {
					// Alternating dramatic parallax direction based on index
					const parallaxY = index % 2 === 0 ? yLeft : yRight;

					return (
						<motion.div
							key={index}
							style={{ y: parallaxY, opacity, scale }}
						>
							<TiltCard className="p-8 h-full min-h-[320px]" glowColor={item.glow}>
								{/* Icon + Badge */}
								<div className="flex items-start justify-between mb-8">
									<div
										className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
										style={{
											background: `${item.color}15`,
											border: `1px solid ${item.color}40`,
											boxShadow: `0 0 30px ${item.color}30 inset, 0 0 20px ${item.color}20`
										}}
									>
										<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
										<item.icon className="w-8 h-8 relative z-10" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color})` }} />
									</div>
									<span
										className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg tracking-widest uppercase"
										style={{
											color: item.color,
											background: `${item.color}15`,
											border: `1px solid ${item.color}30`,
											boxShadow: `0 0 15px ${item.color}20`
										}}
									>
										{item.badge}
									</span>
								</div>

								{/* Title */}
								<h3 className="font-bold text-2xl mb-4 text-white leading-snug drop-shadow-md">
									{item.title}
								</h3>

								{/* Description */}
								<p className="text-slate-400 leading-relaxed text-[16px] mb-10 font-light">
									{item.desc}
								</p>

								{/* Tag */}
								<div className="mt-auto">
									<span
										className="inline-flex items-center gap-2.5 text-sm font-mono px-4 py-2 rounded-xl"
										style={{
											color: item.color,
											background: `${item.color}10`,
											border: `1px solid ${item.color}25`,
										}}
									>
										<span
											className="w-2 h-2 rounded-full"
											style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
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
