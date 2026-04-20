"use client";
import { useState, useEffect } from "react";

export default function Meteors({ number = 20 }: { number?: number }) {
	const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

	useEffect(() => {
		const styles = [...new Array(number)].map(() => ({
			top: -5,
			left: Math.floor(
				Math.random() *
				(typeof window !== "undefined" ? window.innerWidth : 1000)
			),
			animationDelay: Math.random() * 8 + 0.2 + "s",
			animationDuration: Math.floor(Math.random() * 10 + 5) + "s",
		}));
		setMeteorStyles(styles);
	}, [number]);

	return (
		<>
			{meteorStyles.map((style, idx) => (
				<span
					key={"meteor" + idx}
					className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor-effect rounded-[9999px] bg-violet-400/60 shadow-[0_0_0_1px_rgba(167,139,250,0.08)]"
					style={style}
				>
					<div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-violet-400/60 to-transparent" />
				</span>
			))}
		</>
	);
}
