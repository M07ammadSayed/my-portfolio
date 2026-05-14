"use client";
import {
	motion,
	useTransform,
	useMotionTemplate,
	useMotionValue,
} from "framer-motion";

export default function TiltCard({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({
		currentTarget,
		clientX,
		clientY,
	}: React.MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	function handleMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}

	const rotationX = useTransform(mouseY, [0, 400], [3, -3]);
	const rotationY = useTransform(mouseX, [0, 400], [-3, 3]);

	return (
		<motion.div
			className={`relative border border-white/[0.06] bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden group perspective-1000 transition-[border-color] duration-500 hover:border-white/[0.12] ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX: rotationX,
				rotateY: rotationY,
				transformStyle: "preserve-3d",
			}}
			whileHover={{ scale: 1.015 }}
			transition={{ type: "spring", stiffness: 400, damping: 30 }}
		>
			{/* Subtle grid pattern */}
			<div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-40" />

			{/* Mouse-following radial glow */}
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
				style={{
					background: useMotionTemplate`
                        radial-gradient(
                          500px circle at ${mouseX}px ${mouseY}px,
                          rgba(6, 182, 212, 0.06),
                          transparent 80%
                        )
                      `,
				}}
			/>

			{/* Cyber Scanline Effect — more subtle */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
				<div className="w-full h-px bg-[#06b6d4]/30 shadow-[0_0_8px_2px_rgba(6,182,212,0.2)] absolute top-0 -translate-y-full group-hover:animate-scanline opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>

			<div className="relative z-20 h-full transform-style-3d">
				{children}
			</div>
		</motion.div>
	);
}
