"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress({ isLoaded }: { isLoaded: boolean }) {
	const { scrollYProgress } = useScroll();

	const gatedProgress = useTransform(scrollYProgress, (v) =>
		isLoaded ? v : 0
	);

	const scaleX = useSpring(gatedProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<>
			{/* Main bar */}
			<motion.div
				className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999]"
				style={{
					scaleX,
					background: "linear-gradient(90deg, #7c3aed, #6366f1, #818cf8, #22d3ee)",
				}}
			/>
			{/* Glow trail */}
			<motion.div
				className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998] blur-[3px] opacity-60"
				style={{
					scaleX,
					background: "linear-gradient(90deg, #7c3aed, #6366f1, #818cf8, #22d3ee)",
				}}
			/>
		</>
	);
}
