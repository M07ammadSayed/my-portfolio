"use client";
import { Terminal, Shield, Database, Code } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

	const [windowHeight, setWindowHeight] = useState(1000);
	useEffect(() => {
		setWindowHeight(window.innerHeight);
	}, []);

	// Extreme staggered parallax for project cards
	const rawY0 = useTransform(scrollYProgress, [0, 0.5, 1], [windowHeight * 1.5, 0, -windowHeight * 1.5]);
	const rawY1 = useTransform(scrollYProgress, [0, 0.5, 1], [windowHeight * 0.5, 0, -windowHeight * 0.5]);
	const rawY2 = useTransform(scrollYProgress, [0, 0.5, 1], [windowHeight * 2.0, 0, -windowHeight * 2.0]);
	
	const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
	const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

	const y0 = useSpring(rawY0, { stiffness: 40, damping: 20 });
	const y1 = useSpring(rawY1, { stiffness: 35, damping: 25 });
	const y2 = useSpring(rawY2, { stiffness: 45, damping: 15 });
	
	const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
	const scale = useSpring(rawScale, { stiffness: 60, damping: 20 });

	const yArray = [y0, y1, y2];

	return (
		<section
			id="projects"
			ref={ref}
			className="py-32 md:py-48 px-6 max-w-7xl mx-auto relative z-10"
		>
			<motion.div style={{ opacity }}>
				<SectionHeader
					icon={Code}
					title="AppSec Labs"
					desc="Hands-on security research and tooling."
				/>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-16">
				{projects.map((project, i) => {
					return (
						<motion.div
							key={project.title}
							style={{ y: yArray[i], opacity, scale }}
						>
							<ProjectCard {...project} />
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
