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
			setIsVisible(window.scrollY > 300);
		};
		window.addEventListener("scroll", toggleVisibility, { passive: true });
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					aria-label="Scroll to top"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.88 }}
					initial={{ opacity: 0, scale: 0.5, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.5, y: 10 }}
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full backdrop-blur-xl group transition-all duration-300"
					style={{
						background: "rgba(13, 13, 26, 0.85)",
						border: "1px solid rgba(139, 92, 246, 0.25)",
						boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)",
					}}
					onMouseEnter={e => {
						(e.currentTarget as HTMLElement).style.borderColor = "rgba(167, 139, 250, 0.5)";
						(e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.35)";
					}}
					onMouseLeave={e => {
						(e.currentTarget as HTMLElement).style.borderColor = "rgba(139, 92, 246, 0.25)";
						(e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(139, 92, 246, 0.15)";
					}}
				>
					{/* SVG Progress Ring */}
					<svg
						className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
						viewBox="0 0 100 100"
					>
						<circle
							cx="50"
							cy="50"
							r="46"
							fill="none"
							stroke="rgba(139,92,246,0.1)"
							strokeWidth="3"
						/>
						<motion.circle
							cx="50"
							cy="50"
							r="46"
							fill="none"
							stroke="url(#scrollGrad)"
							strokeWidth="3"
							strokeLinecap="round"
							strokeDasharray="1 1"
							pathLength={pathLength}
						/>
						<defs>
							<linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="#7c3aed" />
								<stop offset="50%" stopColor="#6366f1" />
								<stop offset="100%" stopColor="#22d3ee" />
							</linearGradient>
						</defs>
					</svg>

					<ArrowUp
						className="w-5 h-5 relative z-10 transition-colors duration-300 text-slate-400 group-hover:text-violet-300"
						style={{ margin: "auto" }}
					/>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
