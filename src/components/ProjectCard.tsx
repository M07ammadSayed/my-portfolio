"use client";
import TiltCard from "./TiltCard";
import { ExternalLink, ArrowUpRight } from "lucide-react";

type ThemeColor = "cyan" | "purple" | "blue" | "violet" | "fuchsia" | "indigo";

interface ProjectCardProps {
	icon: React.ElementType;
	color: ThemeColor;
	title: string;
	desc: string;
	link: string;
	tags: string[];
}

const colorMap: Record<ThemeColor, { text: string; bg: string; border: string; glow: string; hex: string }> = {
	cyan:    { text: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/20",    glow: "rgba(34,211,238,0.15)",    hex: "#06b6d4" },
	purple:  { text: "text-purple-400",  bg: "bg-purple-400/10",  border: "border-purple-400/20",  glow: "rgba(192,132,252,0.15)",  hex: "#c084fc" },
	blue:    { text: "text-blue-400",  bg: "bg-blue-400/10",  border: "border-blue-400/20",  glow: "rgba(96,165,250,0.15)",  hex: "#60a5fa" },
	violet:  { text: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/20",  glow: "rgba(139,92,246,0.15)",  hex: "#8b5cf6" },
	fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-400/10", border: "border-fuchsia-400/20", glow: "rgba(217,70,239,0.15)", hex: "#d946ef" },
	indigo:  { text: "text-indigo-400",  bg: "bg-indigo-400/10",  border: "border-indigo-400/20",  glow: "rgba(67,56,202,0.15)",  hex: "#4338ca" },
};

export default function ProjectCard({ icon: Icon, color, title, desc, link, tags }: ProjectCardProps) {
	const c = colorMap[color] ?? colorMap.violet;

	return (
		<TiltCard className="flex flex-col h-full group" glowColor={c.glow}>
			<div className="p-8 flex-1 flex flex-col h-full">

				{/* Header Row */}
				<div className="flex justify-between items-start mb-8">
					<div className={`p-3.5 rounded-2xl ${c.bg} border ${c.border} transition-all duration-500 group-hover:scale-110 relative overflow-hidden`}>
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
						<Icon className={`w-6 h-6 ${c.text} relative z-10`} aria-hidden="true" />
					</div>

					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className={`p-2.5 rounded-xl ${c.bg} border ${c.border} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 backdrop-blur-md`}
						aria-label={`Visit ${title} on GitHub`}
					>
						<ArrowUpRight className={`w-5 h-5 ${c.text}`} />
					</a>
				</div>

				{/* Title */}
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="block w-fit group/title mb-3"
				>
					<h3 className={`text-2xl font-bold text-white transition-colors duration-300 group-hover/title:${c.text}`}>
						{title}
					</h3>
					<div
						className="h-[2px] w-0 group-hover/title:w-full transition-all duration-500 mt-1 rounded-full"
						style={{ background: c.hex, boxShadow: `0 0 10px ${c.hex}` }}
					/>
				</a>

				{/* Description */}
				<p className="text-[15px] text-slate-400/90 mb-8 flex-1 leading-relaxed font-light">{desc}</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-2.5 mt-auto">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-3 py-1.5 text-[11px] rounded-lg font-mono transition-all duration-300 tracking-wider uppercase"
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
					className={`mt-6 flex items-center gap-2 text-xs font-mono font-bold ${c.text} opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0`}
				>
					<ExternalLink size={14} />
					VIEW SECURE REPO
				</a>
			</div>
		</TiltCard>
	);
}
