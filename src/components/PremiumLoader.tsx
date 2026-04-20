"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, ShieldCheck, Terminal } from "lucide-react";

export default function PremiumLoader({
	onComplete,
}: {
	onComplete: () => void;
}) {
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState("Initializing System...");

	useEffect(() => {
		const steps = [
			{ p: 35, s: "Loading..." },
			{ p: 70, s: "Almost there..." },
			{ p: 100, s: "Access Granted." },
		];

		let currentStep = 0;

		const interval = setInterval(() => {
			if (currentStep >= steps.length) {
				clearInterval(interval);
				setTimeout(onComplete, 300);
				return;
			}

			const step = steps[currentStep];
			setProgress(step.p);
			setStatus(step.s);
			currentStep++;
		}, 200);

		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-cyan-500 font-mono"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
			transition={{ duration: 0.8, ease: "easeInOut" }}
		>
			{/* --- Quantum Core Animation --- */}
			<div className="relative w-32 h-32 mb-12">
				{/* Outer Ring 1 */}
				<motion.span
					className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-500"
					animate={{ rotate: 360 }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				{/* Outer Ring 2 (Reverse) */}
				<motion.span
					className="absolute inset-2 rounded-full border-2 border-purple-500/20 border-b-purple-500"
					animate={{ rotate: -360 }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				{/* Inner Core Pulse */}
				<motion.div
					className="absolute inset-8 rounded-full bg-cyan-500/10 blur-xl"
					animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				/>
				{/* Icons Swap */}
				<div className="absolute inset-0 flex items-center justify-center text-white">
					<AnimatePresence mode="wait">
						{progress < 30 && (
							<Cpu key="cpu" className="animate-pulse" />
						)}
						{progress >= 30 && progress < 60 && (
							<Terminal key="term" className="animate-pulse" />
						)}
						{progress >= 60 && progress < 90 && (
							<ShieldCheck
								key="shield"
								className="animate-pulse"
							/>
						)}
						{progress >= 90 && (
							<Zap
								key="zap"
								className="text-yellow-400 animate-pulse"
							/>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* --- Typography & Stats --- */}
			<div className="w-64 space-y-4">
				<div className="flex justify-between text-xs uppercase tracking-widest text-slate-500 font-sans text-base leading-relaxed">
					<span>System Integrity</span>
					<span className="text-cyan-400">{progress}%</span>
				</div>

				{/* Progress Bar */}
				<div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
					<motion.div
						className="h-full bg-gradient-to-r from-cyan-400 via-blue-600 to-violet-600"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ type: "spring", stiffness: 50 }}
					/>
				</div>

				<motion.p
					key={status}
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center text-xs text-cyan-500/80 h-4"
				>
					{status}
				</motion.p>
			</div>
		</motion.div>
	);
}
