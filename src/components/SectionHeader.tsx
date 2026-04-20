"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleText({ text }: { text: string }) {
	const [displayText, setDisplayText] = useState(text.replace(/./g, " "));
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-10%" });

	useEffect(() => {
		if (!isInView) return;
		let iteration = 0;
		let interval: NodeJS.Timeout;

		interval = setInterval(() => {
			setDisplayText((prev) =>
				text
					.split("")
					.map((letter, index) => {
						if (index < iteration) {
							return text[index];
						}
						return letter === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
					})
					.join("")
			);

			if (iteration >= text.length) {
				clearInterval(interval);
			}

			iteration += 1 / 2;
		}, 30);

		return () => clearInterval(interval);
	}, [text, isInView]);

	return <span ref={ref}>{displayText}</span>;
}

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
				<div className="relative">
					<Icon className="text-cyan-400 w-10 h-10 relative z-10" />
					<div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse" />
				</div>
				<span className="text-slate-100 font-mono tracking-tight">
					<ScrambleText text={title} />
				</span>
			</h2>
			<div className="text-slate-400 text-lg flex items-center gap-2">
				<span className="text-cyan-500/50">{">"}</span> {desc}
			</div>
		</motion.div>
	);
}
