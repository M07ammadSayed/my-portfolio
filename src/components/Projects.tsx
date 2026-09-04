"use client";
import { Terminal, Shield, Code, Database, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";

const cardVariants = {
	hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.6,
			delay: i * 0.15,
			ease: [0.25, 0.1, 0.25, 1.0] as any,
		},
	}),
};

const projects = [
	{
		icon: Globe,
		color: "cyan" as const,
		title: "Black-Box Penetration Test — extenra.com",
		desc: "Independent black-box penetration test against a live WordPress-based website.",
		bullets: [
			"Identified and confirmed two high-severity CORS misconfigurations on Contact Form 7 endpoints",
			"Developed working PoC exploits demonstrating real-world exploitability",
			"Documented findings in a structured security assessment report"
		],
		link: "#",
		tags: ["Burp Suite Professional", "Manual Testing"],
	},
	{
		icon: Shield,
		color: "purple" as const,
		title: "Hardened Node.js Runtime",
		desc: "Secure containerization workflow for a Node.js application, focusing on attack surface reduction.",
		bullets: [
			"Migrated to Alpine Linux, reducing image size by 60% and minimizing CVEs",
			"Prevented privilege escalation by running containers as non-root",
			"Integrated Trivy for automated vulnerability detection",
			"Configured Express.js security middleware (helmet, rate limiting, sanitization)"
		],
		link: "#",
		tags: ["Docker", "Trivy", "Linux", "Node.js"],
	},
	{
		icon: Layers,
		color: "blue" as const,
		title: "The Wild Oasis (Hotel System)",
		desc: "Based on Jonas Schmedtmann's course project; extended with a security-focused layer.",
		bullets: [
			"Implemented RBAC via Supabase and applied strict input validation",
			"Developed a secure React SPA with efficient state management"
		],
		link: "#",
		tags: ["React.js", "Supabase", "React Query"],
	},
	{
		icon: Database,
		color: "cyan" as const,
		title: "WorldWise (Travel App)",
		desc: "Based on Jonas Schmedtmann's course project; extended with API and data-exposure security hardening.",
		bullets: [
			"Secured user routes and sanitized third-party API inputs to prevent vulnerabilities",
			"Managed global state securely via Context API to avoid data exposure"
		],
		link: "#",
		tags: ["React.js", "Context API", "CSS Modules"],
	}
];

export default function Projects() {
	return (
		<section
			id="projects"
			className="py-28 md:py-40 px-6 max-w-6xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Code}
				title="Featured Projects"
				desc="Security assessments and applications I've built and secured."
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
				{projects.map((project, index) => (
					<motion.div
						key={index}
						custom={index}
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10%" }}
					>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</div>
		</section>
	);
}
