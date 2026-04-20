"use client";
import Meteors from "./Meteors";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function VisualBackground() {
	const { scrollY } = useScroll();
	const [windowHeight, setWindowHeight] = useState(1000);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
		const handleResize = () => setWindowHeight(window.innerHeight);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Extreme Parallax Transformations
	const yDeep = useSpring(useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * 1.5]), { stiffness: 40, damping: 20 });
	const yMid = useSpring(useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * -0.8]), { stiffness: 50, damping: 20 });
	const yFront = useSpring(useTransform(scrollY, [0, windowHeight * 4], [0, windowHeight * -2.5]), { stiffness: 60, damping: 20 });
	
	const rotateSlow = useTransform(scrollY, [0, windowHeight * 4], [0, 180]);
	const rotateFast = useTransform(scrollY, [0, windowHeight * 4], [0, -360]);

	return (
		<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#02000a]">
			{/* Grid Pattern with slow parallax */}
			<motion.div style={{ y: yDeep }} className="absolute inset-[-100%] bg-grid-pattern opacity-30" />

			{/* Deep Background Layer (Moves DOWN as you scroll down for extreme depth) */}
			<motion.div style={{ y: yDeep, rotate: rotateSlow }} className="absolute top-[20%] left-[10%] w-[1200px] h-[1200px] rounded-full bg-indigo-900/10 blur-[180px] opacity-60" />
			<motion.div style={{ y: yDeep, rotate: rotateFast }} className="absolute top-[40%] right-[-20%] w-[1500px] h-[1500px] rounded-full bg-violet-900/5 blur-[200px] opacity-40" />

			{/* Midground Layer (Moves UP slowly) */}
			<motion.div style={{ y: yMid }} className="absolute top-0 right-[15%] w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-[140px] animate-aurora-2" />
			<motion.div style={{ y: yMid }} className="absolute top-[50%] left-[-10%] w-[900px] h-[900px] rounded-full bg-fuchsia-600/10 blur-[150px] animate-aurora" style={{ animationDelay: '-4s' }} />

			{/* Foreground Layer (Moves UP very fast) */}
			<motion.div style={{ y: yFront, rotate: rotateSlow }} className="absolute top-[80%] right-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px]" />
			<motion.div style={{ y: yFront, rotate: rotateFast }} className="absolute top-[120%] left-[40%] w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-[120px]" />

			{/* Abstract Massive Shapes */}
			<motion.div 
				style={{ y: yFront, x: yMid, rotate: rotateFast }}
				className="absolute top-[150%] left-[-20%] w-[800px] h-[200px] border border-fuchsia-500/10 rounded-full rotate-45 mix-blend-screen blur-[2px]"
			/>
			<motion.div 
				style={{ y: yDeep, x: yFront, rotate: rotateSlow }}
				className="absolute top-[50%] right-[-10%] w-[600px] h-[600px] border-[2px] border-dashed border-cyan-500/5 rounded-full mix-blend-screen"
			/>

			{/* Locked center core */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full bg-violet-900/15 blur-[250px]" />

			{/* Meteors mapped to screen */}
			<div className="absolute inset-0 z-10 opacity-70">
				<Meteors number={40} />
			</div>

			{/* Noise Texture Overlay */}
			<div className="absolute inset-0 z-20 bg-noise opacity-[0.25] brightness-150 contrast-200 mix-blend-overlay" />
		</div>
	);
}
