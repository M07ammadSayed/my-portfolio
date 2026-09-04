"use client";
import { Terminal, Shield, Code, Server, Award, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import SectionHeader from "./SectionHeader";

const cardVariants = {
	hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.5,
			delay: i * 0.05,
			ease: [0.25, 0.1, 0.25, 1.0] as any,
		},
	}),
};

const SKILL_CATEGORIES = [
	{
		title: "AppSec & Security",
		icon: Shield,
		color: "text-[#06b6d4]",
		borderColor: "border-[#06b6d4]/30",
		bgColor: "bg-[#06b6d4]/5",
		skills: [
			"Secure Code Review", "OWASP Top 10", "White-box Testing", "Vulnerability Management (Trivy)",
			"Burp Suite", "OWASP ZAP", "RBAC", "OWASP API Security Top 10", "JWT Security",
			"API Security Testing", "Broken Object Level Authorization (BOLA)", "SAST", "DAST",
			"Penetration Testing", "DevSecOps", "XSS", "SQLi", "CSRF", "IDOR", "SSRF",
			"Secure SDLC", "OAuth2", "Nmap"
		]
	},
	{
		title: "Tools & Infrastructure",
		icon: Wrench,
		color: "text-[#a855f7]",
		borderColor: "border-[#a855f7]/30",
		bgColor: "bg-[#a855f7]/5",
		skills: [
			"Docker (Security)", "Linux (Bash)", "Git/GitHub", "Postman", "CI/CD Security",
			"AWS (IAM, S3, Lambda Security)"
		]
	},
	{
		title: "Backend Development",
		icon: Server,
		color: "text-[#ff6ec7]",
		borderColor: "border-[#ff6ec7]/30",
		bgColor: "bg-[#ff6ec7]/5",
		skills: [
			"Node.js", "NestJS", "Express.js", "Supabase", "MongoDB", "PostgreSQL", "Python (Basics)"
		]
	},
	{
		title: "Frontend Development",
		icon: Terminal,
		color: "text-[#06b6d4]",
		borderColor: "border-[#06b6d4]/30",
		bgColor: "bg-[#06b6d4]/5",
		skills: [
			"React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "React Query", "Context API"
		]
	}
];

const CERTIFICATIONS = [
	{ name: "ISC2 Certified in Cybersecurity (CC)", status: "Active" },
	{ name: "Burp Suite Certified Practitioner (BSCP)", status: "In Progress" },
	{ name: "eJPT – Junior Penetration Tester (INE)", status: "Planned" }
];

export default function Skills() {
	return (
		<section
			id="skills"
			className="py-28 md:py-40 px-6 max-w-6xl mx-auto relative z-10"
		>
			<SectionHeader
				icon={Code}
				title="Skills & Technologies"
				desc="Tools and technologies I work with to build and secure applications."
			/>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
				{SKILL_CATEGORIES.map((category, index) => (
					<motion.div
						key={index}
						custom={index}
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10%" }}
					>
						<TiltCard className="p-6 md:p-8 h-full flex flex-col">
							<div className="flex items-center gap-3 mb-6">
								<category.icon className={`w-6 h-6 ${category.color}`} />
								<h3 className="font-semibold text-lg md:text-xl text-[#ffffff] tracking-tight">
									{category.title}
								</h3>
							</div>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill, i) => (
									<span
										key={i}
										className={`px-3 py-1 text-[13px] md:text-sm font-medium rounded-lg border ${category.borderColor} ${category.bgColor} text-slate-300`}
									>
										{skill}
									</span>
								))}
							</div>
						</TiltCard>
					</motion.div>
				))}
			</div>

			<SectionHeader
				icon={Award}
				title="Certifications"
				desc="Professional certifications and ongoing training."
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{CERTIFICATIONS.map((cert, index) => (
					<motion.div
						key={index}
						custom={index + 4}
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10%" }}
					>
						<TiltCard className="p-5 md:p-6 h-full flex flex-col items-center text-center justify-center">
							<Award className={`w-8 h-8 mb-4 ${cert.status === 'Active' ? 'text-green-400' : cert.status === 'In Progress' ? 'text-yellow-400' : 'text-slate-500'}`} />
							<h3 className="font-medium text-sm md:text-base text-[#ffffff] mb-3">
								{cert.name}
							</h3>
							<span className={`px-3 py-1 text-xs font-mono rounded-full border ${
								cert.status === 'Active' 
									? 'bg-green-500/10 border-green-500/20 text-green-400' 
									: cert.status === 'In Progress'
									? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
									: 'bg-slate-500/10 border-slate-500/20 text-slate-400'
							}`}>
								{cert.status}
							</span>
						</TiltCard>
					</motion.div>
				))}
			</div>
		</section>
	);
}
