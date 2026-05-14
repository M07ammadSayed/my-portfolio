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
			initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.95 }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
			viewport={{ once: true, margin: "-5%" }}
			transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
			className="mb-16 md:mb-20"
		>
			<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center gap-4">
				<span className="relative">
					<Icon className="text-[#06b6d4] w-8 h-8 md:w-10 md:h-10 relative z-10" />
					<span className="absolute inset-0 bg-[#06b6d4]/20 blur-xl rounded-full animate-pulse" />
				</span>
				<span className="text-[#ffffff] font-mono tracking-tight">
					<ScrambleText text={title} />
				</span>
			</h2>
			<p className="text-slate-400 text-base md:text-lg flex items-center gap-2 ml-0 md:ml-14">
				<span className="text-[#06b6d4]/50 font-mono">{">"}</span> {desc}
			</p>
		</motion.div>
	);
}
