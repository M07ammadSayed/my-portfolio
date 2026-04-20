"use client";
import Meteors from "./Meteors";

export default function VisualBackground() {
	return (
		<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
			{/* Aurora Orbs */}
			<div className="absolute top-[-15%] left-[5%] w-[700px] h-[700px] rounded-full bg-violet-600/8 blur-[140px] animate-aurora" />
			<div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] animate-aurora-2" />
			<div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[130px] animate-aurora" style={{ animationDelay: '-5s' }} />
			<div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/6 blur-[100px] animate-aurora-2" style={{ animationDelay: '-3s' }} />

			{/* Subtle center glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-900/15 blur-[180px]" />

			{/* Noise Texture */}
			<div className="absolute inset-0 bg-noise opacity-[0.12] brightness-100 contrast-150" />

			{/* Grid Pattern */}
			<div className="absolute inset-0 bg-grid-pattern" />

			{/* Meteors */}
			<Meteors number={20} />
		</div>
	);
}
