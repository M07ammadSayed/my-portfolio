"use client";
import Meteors from "./Meteors";

export default function VisualBackground() {
	return (
		<div className="fixed inset-0 pointer-events-none z-0">
			<div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#06b6d4]/10 rounded-full blur-[120px] animate-pulse will-change-[opacity]" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#a855f7]/10 rounded-full blur-[120px] animate-pulse delay-1000 will-change-[opacity]" />
			<div className="absolute inset-0 bg-noise opacity-20 brightness-100 contrast-150"></div>
			<div className="absolute inset-0 bg-grid-pattern"></div>
			<Meteors number={25} />
		</div>
	);
}
