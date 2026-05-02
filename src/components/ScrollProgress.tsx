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
			className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6ec7] via-[#a855f7] to-[#06b6d4] origin-left z-[9999]"
			style={{ scaleX }}
		/>
	);
}
