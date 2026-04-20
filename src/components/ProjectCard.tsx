"use client";
import TiltCard from "./TiltCard";
import { ExternalLink } from "lucide-react";

type ThemeColor = "cyan" | "purple" | "blue" | "emerald" | "amber";

interface ProjectCardProps {
	icon: React.ElementType;
	color: ThemeColor;
	title: string;
	desc: string;
	link: string;
	tags: string[];
	securityStatus?: string;
}

export default function ProjectCard({
	icon: Icon,
	color,
	title,
	desc,
	link,
	tags,
	securityStatus,
}: ProjectCardProps) {
	const theme = {
		cyan: {
			text: "text-cyan-400",
			bg: "bg-cyan-900/20",
			border: "border-cyan-800/50",
		},
		purple: {
			text: "text-purple-400",
			bg: "bg-purple-900/20",
			border: "border-purple-800/50",
		},
		blue: {
			text: "text-blue-400",
			bg: "bg-blue-900/20",
			border: "border-blue-800/50",
		},
		emerald: {
			text: "text-emerald-400",
			bg: "bg-emerald-900/20",
			border: "border-emerald-800/50",
		},
		amber: {
			text: "text-amber-400",
			bg: "bg-amber-900/20",
			border: "border-amber-800/50",
		},
	};

	const active = theme[color] || theme.cyan;

	return (
		<TiltCard className="flex flex-col h-full group border border-transparent hover:border-emerald-500/30 transition-all">
			<div className="p-8 flex-1 flex flex-col h-full relative overflow-hidden">
				{securityStatus && (
					<div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 border-b border-l border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
						[{securityStatus}]
					</div>
				)}
				<div className="flex justify-between items-start mb-6">
					<div
						className={`p-3 rounded-lg border ${active.bg} ${active.border}`}
					>
						<Icon
							className={`w-6 h-6 ${active.text}`}
							aria-hidden="true"
						/>
					</div>
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-slate-400 hover:text-white transition-transform hover:rotate-45 p-2 hover:bg-white/5 rounded-full"
						aria-label={`Visit ${title} on GitHub`}
					>
						<ExternalLink size={20} />
					</a>
				</div>

				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-fit group"
				>
					<h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:glitch-hover transition-colors">
						{title}
					</h3>
				</a>

				<p className="text-sm text-slate-400 mb-6 flex-1 leading-relaxed">
					{desc}
				</p>

				<div className="flex flex-wrap gap-2 mt-auto">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-3 py-1 bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs rounded-full font-mono"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</TiltCard>
	);
}
