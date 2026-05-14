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
		window.addEventListener("scroll", toggleVisibility, { passive: true });
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
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.9 }}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{
						opacity: 0,
						scale: 0.5,
						transition: { duration: 0.2 },
					}}
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 z-[90] p-3 rounded-full bg-[#080810]/80 backdrop-blur-md border border-white/[0.08] shadow-2xl group hover:border-[#06b6d4]/30 transition-colors duration-300"
				>
					<svg
						className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
						viewBox="0 0 100 100"
					>
						<motion.circle
							cx="50"
							cy="50"
							r="48"
							fill="none"
							stroke="#22d3ee"
							strokeWidth="3"
							strokeDasharray="1 1"
							pathLength={pathLength}
							className="opacity-80 transition-opacity duration-300"
						/>
					</svg>

					<ArrowUp className="w-5 h-5 text-slate-400 group-hover:text-[#06b6d4] transition-colors duration-300" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
