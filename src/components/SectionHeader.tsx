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
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className="mb-16"
		>
			<h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
				<Icon className="text-cyan-400 w-10 h-10" />{" "}
				<span className="text-slate-100">{title}</span>
			</h2>
			<p className="text-slate-400 text-lg">{desc}</p>
		</motion.div>
	);
}
