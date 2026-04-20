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
						title: "AppSec & Tools",
						desc: "Burp Suite, OWASP ZAP, Postman, Secure Code Review",
						color: "text-red-400",
					},
					{
						icon: Lock,
						title: "Web Security",
						desc: "OWASP Top 10, XSS/Injection Prevention, Auth Logic",
						color: "text-cyan-400",
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
						color: "text-purple-400",
					},
				].map((item, index) => (
					<TiltCard key={index} className="p-8 h-full">
						<item.icon className={`w-12 h-12 ${item.color} mb-6`} />
						<h3 className="font-bold text-2xl mb-3 text-slate-100">
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
