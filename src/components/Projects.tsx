"use client";
import { Terminal, Shield, Database } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

export default function Projects() {
	return (
		<section
			id="projects"
			className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Code}
				title="AppSec Labs"
				desc="Hands-on security research and tooling."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[
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
						color: "pink" as const,
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
				].map((project, i) => (
					<motion.div
						key={project.title}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
					>
						<ProjectCard {...project} />
					</motion.div>
				))}
			</div>
		</section>
	);
}
