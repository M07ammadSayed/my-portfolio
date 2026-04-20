"use client";
import { Terminal, Shield, Database, Code } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const projects = [
	{
		icon: Shield,
		color: "violet" as const,
		title: "Hardened Runtime",
		desc: "Securing supply chain with Least Privilege, Alpine, and Trivy.",
		link: "https://github.com/M07ammadSayed/secure-software-supply-chain",
		tags: ["AppSec", "Docker", "Trivy"],
	},
	{
		icon: Terminal,
		color: "fuchsia" as const,
		title: "Python Port Scanner",
		desc: "Custom network tool built with raw Sockets & Multi-threading.",
		link: "https://github.com/M07ammadSayed/python-port-scanner",
		tags: ["Python", "Networking"],
	},
	{
		icon: Database,
		color: "cyan" as const,
		title: "Secure State Mgmt",
		desc: "React app focused on Input Handling and logic integrity.",
		link: "https://github.com/M07ammadSayed/use-popcorn",
		tags: ["React.js", "Secure Coding"],
	},
];

export default function Projects() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// Parallax speeds for different columns
	const rawYCenter = useTransform(scrollYProgress, [0, 1], [150, -150]);
	const rawYEdge = useTransform(scrollYProgress, [0, 1], [250, -250]);
	
	const yCenter = useSpring(rawYCenter, { stiffness: 50, damping: 20 });
	const yEdge = useSpring(rawYEdge, { stiffness: 50, damping: 20 });

	return (
		<section
			id="projects"
			ref={ref}
			className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Code}
				title="AppSec Labs"
				desc="Hands-on security research and tooling."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
				{projects.map((project, i) => {
					// Apply different parallax to center card for a staggered float effect
					const isCenter = i % 3 === 1;
					const parallaxY = isCenter ? yCenter : yEdge;

					return (
						<motion.div
							key={project.title}
							style={{ y: parallaxY }}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
						>
							<ProjectCard {...project} />
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
