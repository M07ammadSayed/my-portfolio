"use client";
import { Terminal, Shield, Code, Lock } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";

const cardVariants = {
	hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.5,
			delay: i * 0.08,
			ease: [0.25, 0.1, 0, 1],
		},
	}),
};

const skills = [
	{
		icon: Shield,
		title: "AppSec & Tools",
		desc: "Burp Suite, OWASP ZAP, Postman, Secure Code Review",
		color: "text-red-400",
	},
	{
		icon: Lock,
		title: "Web Security",
		desc: "OWASP Top 10, XSS/Injection Prevention, Auth Logic",
		color: "text-[#06b6d4]",
	},
	{
		icon: Code,
		title: "Secure Coding",
		desc: "Input Validation, Output Encoding, JWT Handling",
		color: "text-green-400",
	},
	{
		icon: Terminal,
		title: "Full Stack Base",
		desc: "React.js, Node.js, Express, MongoDB, Linux",
		color: "text-[#ff6ec7]",
	},
];

export default function Skills() {
	return (
		<section
			id="skills"
			className="py-28 md:py-40 px-6 max-w-6xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Shield}
				title="Security & Tech Stack"
				desc="The toolkit I use to build secure software"
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
				{skills.map((item, index) => (
					<motion.div
						key={index}
						custom={index}
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10%" }}
					>
						<TiltCard className="p-8 h-full">
							<item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.color} mb-6`} />
							<h3 className="font-bold text-lg md:text-xl mb-3 text-[#ffffff] tracking-tight">
								{item.title}
							</h3>
							<p className="text-slate-400/90 leading-relaxed text-sm md:text-base font-medium">
								{item.desc}
							</p>
						</TiltCard>
					</motion.div>
				))}
			</div>
		</section>
	);
}
