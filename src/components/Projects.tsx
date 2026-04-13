"use client";
import { Terminal, Shield, Code, Database } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";

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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<ProjectCard
					icon={Shield}
					color="cyan"
					title="Hardened Runtime"
					desc="Securing supply chain with Least Privilege, Alpine, and Trivy."
					link="https://github.com/M07ammadSayed/secure-software-supply-chain"
					tags={["AppSec", "Docker", "Trivy"]}
					aria-label="View Secure Software Supply Chain project on GitHub"
				/>
				<ProjectCard
					icon={Terminal}
					color="purple"
					title="Python Port Scanner"
					desc="Custom network tool built with raw Sockets & Multi-threading."
					link="https://github.com/M07ammadSayed/python-port-scanner"
					tags={["Python", "Networking"]}
					aria-label="View Python Port Scanner project on GitHub"
				/>
				<ProjectCard
					icon={Database}
					color="blue"
					title="Secure State Mgmt"
					desc="React app focused on Input Handling and logic integrity."
					link="https://github.com/M07ammadSayed/use-popcorn"
					tags={["React.js", "Secure Coding"]}
					aria-label="View usePopcorn project on GitHub"
				/>
			</div>
		</section>
	);
}
