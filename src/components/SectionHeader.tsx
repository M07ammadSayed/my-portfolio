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

		// Respect reduced motion
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReduced) {
			setDisplayText(text);
			return;
		}

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
			initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-5%" }}
			transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
			className="mb-14 md:mb-16"
		>
			{/* Overline label */}
			<div className="flex items-center gap-3 mb-4">
				<span className="relative">
					<Icon className="text-[#06b6d4] w-5 h-5 md:w-6 md:h-6 relative z-10" />
					<span className="absolute inset-0 bg-[#06b6d4]/10 blur-lg rounded-full" />
				</span>
				<span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#06b6d4]/70 font-mono">
					{desc}
				</span>
			</div>

			{/* Title */}
			<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffffff] tracking-[-0.02em] leading-[1.1]">
				<span className="font-mono">
					<ScrambleText text={title} />
				</span>
			</h2>
		</motion.div>
	);
}
