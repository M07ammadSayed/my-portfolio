"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, ShieldCheck, Terminal } from "lucide-react";

const steps = [
	{ p: 30, s: "Initializing..." },
	{ p: 65, s: "Loading modules..." },
	{ p: 100, s: "Access Granted." },
];

export default function PremiumLoader({ onComplete }: { onComplete: () => void }) {
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState("Initializing System...");

	useEffect(() => {
		let currentStep = 0;
		const interval = setInterval(() => {
			if (currentStep >= steps.length) {
				clearInterval(interval);
				setTimeout(onComplete, 400);
				return;
			}
			const step = steps[currentStep];
			setProgress(step.p);
			setStatus(step.s);
			currentStep++;
		}, 220);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono overflow-hidden"
			style={{ background: "#06060f" }}
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.04, filter: "blur(16px)" }}
			transition={{ duration: 0.7, ease: "easeInOut" }}
		>
			{/* Background glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none" />
			<div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/8 blur-[100px] pointer-events-none" />

			{/* Spinning Rings */}
			<div className="relative w-36 h-36 mb-14">
				{/* Outer ring */}
				<motion.span
					className="absolute inset-0 rounded-full"
					style={{
						border: "1.5px solid transparent",
						borderTopColor: "rgba(167, 139, 250, 0.7)",
						borderRightColor: "rgba(167, 139, 250, 0.2)",
					}}
					animate={{ rotate: 360 }}
					transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
				/>
				{/* Mid ring */}
				<motion.span
					className="absolute inset-3 rounded-full"
					style={{
						border: "1.5px solid transparent",
						borderBottomColor: "rgba(99, 102, 241, 0.7)",
						borderLeftColor: "rgba(99, 102, 241, 0.2)",
					}}
					animate={{ rotate: -360 }}
					transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
				/>
				{/* Inner ring */}
				<motion.span
					className="absolute inset-[22px] rounded-full"
					style={{
						border: "1px solid transparent",
						borderTopColor: "rgba(34, 211, 238, 0.5)",
					}}
					animate={{ rotate: 360 }}
					transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
				/>
				{/* Core pulse */}
				<motion.div
					className="absolute inset-[36px] rounded-full"
					style={{ background: "rgba(139, 92, 246, 0.15)", filter: "blur(8px)" }}
					animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
					transition={{ duration: 1.8, repeat: Infinity }}
				/>
				{/* Center Icon */}
				<div className="absolute inset-0 flex items-center justify-center text-violet-300">
					<AnimatePresence mode="wait">
						{progress < 30 && (
							<motion.span key="cpu" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
								<Cpu size={22} className="animate-pulse" />
							</motion.span>
						)}
						{progress >= 30 && progress < 65 && (
							<motion.span key="terminal" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
								<Terminal size={22} className="animate-pulse" />
							</motion.span>
						)}
						{progress >= 65 && progress < 100 && (
							<motion.span key="shield" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
								<ShieldCheck size={22} className="animate-pulse" />
							</motion.span>
						)}
						{progress >= 100 && (
							<motion.span key="zap" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
								<Zap size={22} className="text-yellow-400 animate-pulse" />
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Progress Section */}
			<div className="w-72 space-y-4">
				{/* Label Row */}
				<div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-600">
					<span>System Integrity</span>
					<motion.span
						key={progress}
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-violet-400 font-bold"
					>
						{progress}%
					</motion.span>
				</div>

				{/* Bar */}
				<div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
					<motion.div
						className="h-full rounded-full"
						style={{ background: "linear-gradient(90deg, #7c3aed, #6366f1, #22d3ee)" }}
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ type: "spring", stiffness: 45, damping: 20 }}
					/>
				</div>
				{/* Glow bar */}
				<div className="h-[2px] w-full overflow-hidden -mt-4 opacity-40 blur-[2px]">
					<motion.div
						className="h-full rounded-full"
						style={{ background: "linear-gradient(90deg, #7c3aed, #6366f1, #22d3ee)" }}
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ type: "spring", stiffness: 45, damping: 20 }}
					/>
				</div>

				{/* Status */}
				<AnimatePresence mode="wait">
					<motion.p
						key={status}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						className="text-center text-[11px] text-violet-400/70 tracking-wider"
					>
						{status}
					</motion.p>
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
