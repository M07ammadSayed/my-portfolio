"use client";
import { motion } from "framer-motion";

export default function SectionHeader({
	icon: Icon,
	title,
	desc,
}: {
	icon: React.ElementType;
	title: string;
	desc: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.65, ease: "easeOut" }}
			className="mb-16"
		>
			{/* Label pill */}
			<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 text-violet-400 text-xs font-mono tracking-widest uppercase mb-5">
				<Icon className="w-3.5 h-3.5" />
				<span>{title}</span>
			</div>

			{/* Title */}
			<h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
				<span
					style={{
						background: "linear-gradient(135deg, #f1f0ff 0%, #c4b5fd 50%, #818cf8 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}
				>
					{title}
				</span>
			</h2>

			{/* Description */}
			<p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">{desc}</p>

			{/* Divider */}
			<div className="mt-6 flex items-center gap-3">
				<div className="h-[1px] w-12 bg-gradient-to-r from-violet-500/60 to-transparent" />
				<div className="h-[3px] w-[3px] rounded-full bg-violet-500/40" />
			</div>
		</motion.div>
	);
}
