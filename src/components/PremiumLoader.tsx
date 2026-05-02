"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PremiumLoader({ onComplete }: { onComplete: () => void }) {
        const [progress, setProgress] = useState(0);
        const [status, setStatus] = useState("Initializing...");

        useEffect(() => {
                const steps = [
                        { p: 40, s: "Loading assets..." },
                        { p: 75, s: "Preparing environment..." },
                        { p: 100, s: "Access granted." },
                ];

                let currentStep = 0;

                const interval = setInterval(() => {
                        if (currentStep >= steps.length) {
                                clearInterval(interval);
                                setTimeout(onComplete, 280);
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
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono"
                        style={{ background: "#080810" }}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(16px)" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                        {/* Logo mark */}
                        <div className="relative w-20 h-20 mb-10">
                                {/* Outer spinner ring — justified for loader context */}
                                <motion.span
                                        className="absolute inset-0 rounded-full"
                                        style={{ border: "1px solid rgba(168,85,247,0.15)", borderTopColor: "#a855f7" }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Inner spinner ring */}
                                <motion.span
                                        className="absolute inset-2.5 rounded-full"
                                        style={{ border: "1px solid rgba(6,182,212,0.12)", borderBottomColor: "#06b6d4" }}
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                                />
                                {/* Center icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                                <motion.div
                                                        key={progress > 60 ? "shield" : "dot"}
                                                        initial={{ opacity: 0, scale: 0.7 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.7 }}
                                                        transition={{ duration: 0.3 }}
                                                >
                                                        {progress > 60 ? (
                                                                <ShieldCheck className="w-5 h-5 text-[#06b6d4]" />
                                                        ) : (
                                                                <div
                                                                        className="w-2 h-2 rounded-full"
                                                                        style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)" }}
                                                                />
                                                        )}
                                                </motion.div>
                                        </AnimatePresence>
                                </div>
                        </div>

                        {/* Progress info */}
                        <div className="w-52 space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                        <span className="text-[#334155] tracking-widest uppercase">System</span>
                                        <span className="text-[#06b6d4]">{progress}%</span>
                                </div>

                                {/* Track */}
                                <div
                                        className="h-px w-full rounded-full overflow-hidden"
                                        style={{ background: "rgba(30,42,58,0.8)" }}
                                >
                                        <motion.div
                                                className="h-full rounded-full"
                                                style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4)" }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                                        />
                                </div>

                                <motion.p
                                        key={status}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center text-[10px] text-[#334155] tracking-wider uppercase"
                                >
                                        {status}
                                </motion.p>
                        </div>
                </motion.div>
        );
}
