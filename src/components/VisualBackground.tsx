"use client";
import Meteors from "./Meteors";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function VisualBackground() {
	const { scrollY } = useScroll();

	// Smooth Parallax Transformations
	const rawY1 = useTransform(scrollY, [0, 3000], [0, -600]);
	const rawY2 = useTransform(scrollY, [0, 3000], [0, -300]);
	const rawY3 = useTransform(scrollY, [0, 3000], [0, -900]);
	const rawYGrid = useTransform(scrollY, [0, 3000], [0, -150]);

	// Applying spring for fluid inertia
	const y1 = useSpring(rawY1, { stiffness: 50, damping: 20 });
	const y2 = useSpring(rawY2, { stiffness: 40, damping: 25 });
	const y3 = useSpring(rawY3, { stiffness: 60, damping: 15 });
	const yGrid = useSpring(rawYGrid, { stiffness: 80, damping: 30 });

	return (
		<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030014]">
			{/* Grid Pattern with slow parallax */}
			<motion.div style={{ y: yGrid }} className="absolute inset-[-50%] bg-grid-pattern opacity-40" />

			{/* Aurora Orbs with varying parallax speeds */}
			<motion.div
				style={{ y: y1 }}
				className="absolute top-[-15%] left-[5%] w-[800px] h-[800px] rounded-full bg-violet-600/10 blur-[150px] animate-aurora"
			/>
			<motion.div
				style={{ y: y2 }}
				className="absolute top-[15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[130px] animate-aurora-2"
			/>
			<motion.div
				style={{ y: y3 }}
				className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/10 blur-[140px] animate-aurora"
				style={{ animationDelay: '-5s' }}
			/>
			<motion.div
				style={{ y: y1 }}
				className="absolute top-[60%] right-[15%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] animate-aurora-2"
				style={{ animationDelay: '-3s' }}
			/>

			{/* Subtle center glow - locked to center */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-fuchsia-900/10 blur-[200px]" />

			{/* Meteors */}
			<div className="absolute inset-0 z-10">
				<Meteors number={30} />
			</div>

			{/* Noise Texture Overlay */}
			<div className="absolute inset-0 z-20 bg-noise opacity-[0.15] brightness-110 contrast-150 mix-blend-overlay" />
		</div>
	);
}
