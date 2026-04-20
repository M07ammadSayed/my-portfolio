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
					color="emerald"
					title="Secure Supply Chain"
					desc="Implementing Least Privilege, Alpine hardening, and automated Trivy scanning for production containers."
					link="https://github.com/M07ammadSayed/secure-software-supply-chain"
					tags={["AppSec", "Docker", "Trivy"]}
					securityStatus="Audited"
					aria-label="View Secure Software Supply Chain project on GitHub"
				/>
				<ProjectCard
					icon={Terminal}
					color="amber"
					title="Network Scanner"
					desc="Multi-threaded socket-based scanner for identifying open ports and service banners."
					link="https://github.com/M07ammadSayed/python-port-scanner"
					tags={["Python", "Networking"]}
					securityStatus="Offensive"
					aria-label="View Python Port Scanner project on GitHub"
				/>
				<ProjectCard
					icon={Database}
					color="cyan"
					title="Secure MERN Core"
					desc="A reference architecture for MERN apps focused on Auth logic, Input Sanitization, and XSS prevention."
					link="https://github.com/M07ammadSayed/use-popcorn"
					tags={["React.js", "Secure Coding"]}
					securityStatus="Hardened"
					aria-label="View usePopcorn project on GitHub"
				/>
			</div>
		</section>
	);
}
