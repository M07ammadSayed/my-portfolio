"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const { scrollYProgress } = useScroll();
	const pathLength = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
	});

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					aria-label="Scroll to top"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					initial={{ opacity: 0, scale: 0.5, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{
						opacity: 0,
						scale: 0.5,
						y: 20,
						transition: { duration: 0.2 },
					}}
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 z-[90] p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-500/50 transition-all group"
				>
					<svg
						className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
						viewBox="0 0 100 100"
					>
						<circle
							cx="50"
							cy="50"
							r="48"
							fill="none"
							stroke="#1e293b"
							strokeWidth="4"
						/>
						<motion.circle
							cx="50"
							cy="50"
							r="48"
							fill="none"
							stroke="#22d3ee"
							strokeWidth="4"
							strokeLinecap="round"
							pathLength={pathLength}
							className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
						/>
					</svg>

					<ArrowUp className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
