"use client";
import TiltCard from "./TiltCard";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type ThemeColor = "cyan" | "purple" | "blue" | "violet" | "pink" | "emerald";

interface ProjectCardProps {
	icon: React.ElementType;
	color: ThemeColor;
	title: string;
	desc: string;
	link: string;
	tags: string[];
}

const colorMap: Record<ThemeColor, { text: string; bg: string; border: string; glow: string; hex: string }> = {
	cyan:    { text: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/20",    glow: "rgba(34,211,238,0.12)",    hex: "#22d3ee" },
	purple:  { text: "text-purple-400",  bg: "bg-purple-400/10",  border: "border-purple-400/20",  glow: "rgba(192,132,252,0.13)",  hex: "#c084fc" },
	blue:    { text: "text-indigo-400",  bg: "bg-indigo-400/10",  border: "border-indigo-400/20",  glow: "rgba(129,140,248,0.12)",  hex: "#818cf8" },
	violet:  { text: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/20",  glow: "rgba(167,139,250,0.13)",  hex: "#a78bfa" },
	pink:    { text: "text-pink-400",    bg: "bg-pink-400/10",    border: "border-pink-400/20",    glow: "rgba(244,114,182,0.12)",    hex: "#f472b6" },
	emerald: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", glow: "rgba(52,211,153,0.12)", hex: "#34d399" },
};

export default function ProjectCard({ icon: Icon, color, title, desc, link, tags }: ProjectCardProps) {
	const c = colorMap[color] ?? colorMap.violet;

	return (
		<TiltCard className="flex flex-col h-full group" glowColor={c.glow}>
			<div className="p-7 flex-1 flex flex-col h-full">

				{/* Header Row */}
				<div className="flex justify-between items-start mb-6">
					<div className={`p-3 rounded-xl ${c.bg} border ${c.border} transition-all duration-300 group-hover:scale-110`}>
						<Icon className={`w-5 h-5 ${c.text}`} aria-hidden="true" />
					</div>

					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className={`p-2 rounded-xl ${c.bg} border ${c.border} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110`}
						aria-label={`Visit ${title} on GitHub`}
					>
						<ArrowUpRight className={`w-4 h-4 ${c.text}`} />
					</a>
				</div>

				{/* Title */}
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-fit group/title mb-2"
				>
					<h3 className={`text-xl font-bold text-slate-100 transition-colors duration-200 group-hover/title:${c.text}`}>
						{title}
					</h3>
					<div
						className="h-[1px] w-0 group-hover/title:w-full transition-all duration-300 mt-0.5"
						style={{ background: c.hex }}
					/>
				</a>

				{/* Description */}
				<p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">{desc}</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-2 mt-auto">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2.5 py-1 text-xs rounded-lg font-mono transition-all duration-200"
							style={{
								background: `${c.hex}12`,
								border: `1px solid ${c.hex}25`,
								color: c.hex,
							}}
						>
							{tag}
						</span>
					))}
				</div>

				{/* Bottom CTA */}
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className={`mt-5 flex items-center gap-1.5 text-xs font-mono ${c.text} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}
				>
					<ExternalLink size={12} />
					View on GitHub
				</a>
			</div>
		</TiltCard>
	);
}
