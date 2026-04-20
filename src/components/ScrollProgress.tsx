"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// ضفنا الـ prop هنا عشان يستلم الحالة من الـ PageManager
export default function ScrollProgress({ isLoaded }: { isLoaded: boolean }) {
	const { scrollYProgress } = useScroll();

	// بنخلي الـ progress يحسب بناءً على الـ prop اللي جاي من بره
	const gatedProgress = useTransform(scrollYProgress, (v) =>
		isLoaded ? v : 0
	);

	const scaleX = useSpring(gatedProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<motion.div
			className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-600 to-violet-600 origin-left z-[9999]"
			style={{ scaleX }}
		/>
	);
}
