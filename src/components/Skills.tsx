"use client";
import { Terminal, Shield, Code, Lock } from "lucide-react";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";

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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{[
					{
						icon: Shield,
						title: "Offensive Security",
						desc: "Vulnerability Research, Pentesting, OWASP Top 10, Network Scanning",
						color: "text-red-500",
					},
					{
						icon: Lock,
						title: "Defensive & AppSec",
						desc: "WAF, Secure Code Review, Identity Management (IAM), JWT Security",
						color: "text-emerald-500",
					},
					{
						icon: Code,
						title: "Secure Engineering",
						desc: "Input Validation, CSRF/XSS Mitigation, Hardened APIs, Cryptography",
						color: "text-cyan-500",
					},
					{
						icon: Terminal,
						title: "Dev & Ops Foundation",
						desc: "MERN Stack (6+ yrs), Docker Security, CI/CD, Linux Systems",
						color: "text-purple-500",
					},
				].map((item, index) => (
					<TiltCard key={index} className="p-8 h-full group">
						<item.icon
							className={`w-12 h-12 ${item.color} mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}
						/>
						<h3 className="font-bold text-2xl mb-3 text-slate-100 group-hover:glitch-hover cursor-default">
							{item.title}
						</h3>
						<p className="text-slate-400 leading-relaxed text-sm">
							{item.desc}
						</p>
					</TiltCard>
				))}
			</div>
		</section>
	);
}
