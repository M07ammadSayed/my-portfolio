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
			{ p: 20, s: "Initializing Secure Tunnel..." },
			{ p: 45, s: "Bypassing WAF & Filters..." },
			{ p: 65, s: "Intercepting Handshaking..." },
			{ p: 85, s: "Decrypting Environment..." },
			{ p: 100, s: "Access Granted. Welcome." },
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
		}, 300);

		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-emerald-500 font-mono"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
			transition={{ duration: 0.8, ease: "easeInOut" }}
		>
			{/* --- Quantum Core Animation --- */}
			<div className="relative w-32 h-32 mb-12">
				{/* Outer Ring 1 */}
				<motion.span
					className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500"
					animate={{ rotate: 360 }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				{/* Outer Ring 2 (Reverse) */}
				<motion.span
					className="absolute inset-2 rounded-full border-2 border-cyan-500/20 border-b-cyan-500"
					animate={{ rotate: -360 }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				{/* Inner Core Pulse */}
				<motion.div
					className="absolute inset-8 rounded-full bg-emerald-500/10 blur-xl"
					animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				/>
				{/* Icons Swap */}
				<div className="absolute inset-0 flex items-center justify-center text-white">
					<AnimatePresence mode="wait">
						{progress < 25 && (
							<Cpu key="cpu" className="animate-pulse text-emerald-500" />
						)}
						{progress >= 25 && progress < 50 && (
							<Terminal key="term" className="animate-pulse text-emerald-500" />
						)}
						{progress >= 50 && progress < 75 && (
							<ShieldCheck
								key="shield"
								className="animate-pulse text-emerald-500"
							/>
						)}
						{progress >= 75 && (
							<Zap
								key="zap"
								className="text-amber-400 animate-pulse"
							/>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* --- Typography & Stats --- */}
			<div className="w-64 space-y-4">
				<div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
					<span>Kernel_Status</span>
					<span className="text-emerald-400">{progress}%</span>
				</div>

				{/* Progress Bar */}
				<div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
					<motion.div
						className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-600"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ type: "spring", stiffness: 50 }}
					/>
				</div>

				<motion.p
					key={status}
					initial={{ opacity: 0, x: -5 }}
					animate={{ opacity: 1, x: 0 }}
					className="text-center text-[10px] text-emerald-500/80 h-4 uppercase tracking-wider"
				>
					{status}
				</motion.p>
			</div>
		</motion.div>
	);
}
