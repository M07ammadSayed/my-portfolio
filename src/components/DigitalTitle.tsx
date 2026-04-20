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
		<div className="relative inline-block min-w-[140px] md:min-w-[280px] min-h-[1.2em] text-center md:text-left overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.span
					key={index}
					initial={
						isFirstRender
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: 10 }
					}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.3, ease: "linear" }}
					className="block bg-gradient-to-r from-cyan-400 via-blue-600 to-violet-600 bg-clip-text text-transparent font-extrabold pb-2 whitespace-nowrap will-change-transform"
				>
					{titles[index]}<span className="inline-block w-[0.4em] h-[0.9em] ml-1 bg-cyan-400 animate-pulse align-baseline"></span>
				</motion.span>
			</AnimatePresence>
		</div>
	);
}
