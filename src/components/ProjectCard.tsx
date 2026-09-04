"use client";
import TiltCard from "./TiltCard";
import { ExternalLink } from "lucide-react";

type ThemeColor = "cyan" | "purple" | "blue";

interface ProjectCardProps {
	icon: React.ElementType;
	color: ThemeColor;
	title: string;
	desc: string;
	bullets?: string[];
	link?: string;
	tags: string[];
	"aria-label"?: string;
}

const theme = {
	cyan: {
		text: "text-[#06b6d4]",
		bg: "bg-cyan-900/20",
		border: "border-cyan-800/40",
	},
	purple: {
		text: "text-[#ff6ec7]",
		bg: "bg-purple-900/20",
		border: "border-purple-800/40",
	},
	blue: {
		text: "text-[#a855f7]",
		bg: "bg-blue-900/20",
		border: "border-blue-800/40",
	},
};

export default function ProjectCard({
	icon: Icon,
	color,
	title,
	desc,
	bullets,
	link,
	tags,
}: ProjectCardProps) {
	const active = theme[color] || theme.cyan;
	const isLinkValid = link && link !== "#";

	const CardContent = (
		<div className="p-6 md:p-7 flex-1 flex flex-col h-full">
			<div className="flex justify-between items-start mb-5">
				<div
					className={`p-2.5 rounded-lg border ${active.bg} ${active.border} transition-colors duration-200`}
				>
					<Icon
						className={`w-5 h-5 ${active.text}`}
						aria-hidden="true"
					/>
				</div>
				{isLinkValid && (
					<span className="text-slate-600 group-hover:text-[#06b6d4] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 p-1">
						<ExternalLink size={14} />
					</span>
				)}
			</div>

			<h3 className="text-lg md:text-xl font-semibold text-[#ffffff] mb-3 group-hover:text-[#06b6d4] transition-colors duration-200 tracking-tight">
				{title}
			</h3>

			<p className="text-[13px] md:text-sm text-slate-400 mb-4 leading-relaxed">
				{desc}
			</p>

			{bullets && bullets.length > 0 && (
				<ul className="mb-6 flex-1 space-y-2">
					{bullets.map((bullet, idx) => (
						<li key={idx} className="flex items-start text-slate-300 text-[13px] md:text-sm leading-relaxed">
							<span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${active.bg} border ${active.border}`}></span>
							<span>{bullet}</span>
						</li>
					))}
				</ul>
			)}

			<div className="flex flex-wrap gap-1.5 mt-auto">
				{tags.map((tag) => (
					<span
						key={tag}
						className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] text-slate-500 text-[10px] rounded-md font-mono uppercase tracking-[0.08em]"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	);

	return (
		<TiltCard className="flex flex-col h-full group">
			{isLinkValid ? (
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex flex-col h-full"
					aria-label={`Visit ${title} on GitHub`}
				>
					{CardContent}
				</a>
			) : (
				<div className="flex-1 flex flex-col h-full">
					{CardContent}
				</div>
			)}
		</TiltCard>
	);
}
