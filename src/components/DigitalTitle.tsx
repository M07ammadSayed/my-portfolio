"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titles = ["Microservice-Based", "Cloud-Native", "API-Driven", "Mission-Critical"];

export default function DigitalTitle() {
	const [index, setIndex] = useState(0);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		setIsFirstRender(false);
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % titles.length);
		}, 3000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative inline-block min-w-[160px] md:min-w-[340px] min-h-[1.2em] text-center overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.span
					key={index}
					initial={isFirstRender ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 15, filter: "blur(8px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
					transition={{ duration: 0.45, ease: "easeInOut" }}
					className="block font-extrabold pb-2 whitespace-nowrap will-change-transform"
					style={{
						background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #22d3ee 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))',
					}}
				>
					{titles[index]}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}
