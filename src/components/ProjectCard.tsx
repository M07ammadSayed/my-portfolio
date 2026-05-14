"use client";
import TiltCard from "./TiltCard";
import { ExternalLink } from "lucide-react";

type ThemeColor = "cyan" | "purple" | "blue";

interface ProjectCardProps {
	icon: React.ElementType;
	color: ThemeColor;
	title: string;
	desc: string;
	link: string;
	tags: string[];
	"aria-label"?: string;
}

const theme = {
	cyan: {
		text: "text-[#06b6d4]",
		bg: "bg-cyan-900/20",
		border: "border-cyan-800/50",
	},
	purple: {
		text: "text-[#ff6ec7]",
		bg: "bg-purple-900/20",
		border: "border-purple-800/50",
	},
	blue: {
		text: "text-[#a855f7]",
		bg: "bg-blue-900/20",
		border: "border-blue-800/50",
	},
};

export default function ProjectCard({
	icon: Icon,
	color,
	title,
	desc,
	link,
	tags,
}: ProjectCardProps) {
	const active = theme[color] || theme.cyan;

	return (
		<TiltCard className="flex flex-col h-full group">
			<div className="p-6 md:p-8 flex-1 flex flex-col h-full">
				<div className="flex justify-between items-start mb-5">
					<div
						className={`p-3 rounded-lg border ${active.bg} ${active.border} transition-colors duration-200`}
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
						className="text-slate-500 hover:text-[#06b6d4] transition-all duration-200 hover:rotate-45 p-2 hover:bg-white/5 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
						aria-label={`Visit ${title} on GitHub`}
					>
						<ExternalLink size={18} />
					</a>
				</div>

				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-fit"
				>
					<h3 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-2 hover:text-[#06b6d4] transition-colors duration-200 tracking-tight">
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
							className="px-3 py-1.5 bg-[#080810]/80 border border-slate-700/50 text-slate-400 text-[11px] rounded-full font-mono uppercase tracking-[0.08em]"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</TiltCard>
	);
}
