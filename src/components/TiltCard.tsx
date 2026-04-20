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

	const rotationX = useTransform(mouseY, [0, 400], [5, -5]);
	const rotationY = useTransform(mouseX, [0, 400], [-5, 5]);

	return (
		<motion.div
			className={`relative border border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden group perspective-1000 ${className}`}
			onMouseMove={handleMouseMove}
			style={{
				rotateX: rotationX,
				rotateY: rotationY,
				transformStyle: "preserve-3d",
			}}
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />

			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
				style={{
					background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(34, 211, 238, 0.1),
                          transparent 80%
                        )
                      `,
				}}
			/>

			{/* Cyber Scanline Effect */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
				<div className="w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_3px_rgba(34,211,238,0.4)] absolute top-0 -translate-y-full group-hover:animate-scanline opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			<div className="relative z-20 h-full transform-style-3d">
				{children}
			</div>
		</motion.div>
	);
}
