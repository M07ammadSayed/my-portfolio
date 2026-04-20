"use client";
import { motion, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

export default function TiltCard({
	children,
	className = "",
	glowColor = "rgba(139, 92, 246, 0.12)",
}: {
	children: React.ReactNode;
	className?: string;
	glowColor?: string;
}) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	function handleMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}

	const rotationX = useTransform(mouseY, [0, 400], [4, -4]);
	const rotationY = useTransform(mouseX, [0, 400], [-4, 4]);

	return (
		<motion.div
			className={`relative overflow-hidden group perspective-1000 ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX: rotationX,
				rotateY: rotationY,
				transformStyle: "preserve-3d",
				background: "rgba(13, 13, 26, 0.75)",
				backdropFilter: "blur(20px)",
				WebkitBackdropFilter: "blur(20px)",
				border: "1px solid rgba(139, 92, 246, 0.1)",
				borderRadius: "1.25rem",
			}}
			whileHover={{
				scale: 1.02,
				borderColor: "rgba(167, 139, 250, 0.22)",
				boxShadow: "0 20px 60px rgba(139, 92, 246, 0.15), 0 4px 20px rgba(99, 102, 241, 0.1)",
			}}
			transition={{ type: "spring", stiffness: 280, damping: 28 }}
		>
			{/* Grid Pattern */}
			<div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-70" />

			{/* Mouse Spotlight */}
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
				style={{
					background: useMotionTemplate`
						radial-gradient(
							550px circle at ${mouseX}px ${mouseY}px,
							${glowColor},
							transparent 75%
						)
					`,
				}}
			/>

			{/* Top edge shine */}
			<div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-violet-400/20 to-transparent pointer-events-none z-10" />

			{/* Content */}
			<div className="relative z-20 h-full transform-style-3d">
				{children}
			</div>
		</motion.div>
	);
}
