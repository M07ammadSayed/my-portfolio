"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { RefreshCcw, WifiOff } from "lucide-react";

const CursorParticleEngine = dynamic(() => import("@/components/CursorParticleEngine"), {
	ssr: false,
});

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Runtime Error:", error);
		if (!navigator.onLine) {
			window.location.href = "/offline";
		}
	}, [error]);

	const isOffline = !navigator.onLine;

	return (
		<>
			<CursorParticleEngine />
			<div className="h-screen w-full flex flex-col items-center justify-center bg-[#06060f] text-[#ffffff] font-mono text-center p-4">
				<div className="p-6 rounded-2xl border border-red-500/20 bg-red-900/10 backdrop-blur-md max-w-md w-full">
					<h2 className="text-3xl font-bold text-red-500 mb-2">
						{isOffline ? "System Offline" : "System Failure"}
					</h2>
					<p className="text-[#94a3b8] mb-6">
						{isOffline
							? "Connection to mainframe lost. Attempting to restore secure link."
							: "A critical exception occurred in the application layer. Error logged for review."}
					</p>

					<div className="flex gap-4 justify-center">
						<button
							onClick={() => (isOffline ? window.location.reload() : reset())}
							className="group relative px-6 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2 overflow-hidden"
						>
							<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
							{isOffline ? (
								<WifiOff className="w-4 h-4" />
							) : (
								<RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
							)}
							{isOffline ? "Retry Link" : "Reboot System"}
						</button>
					</div>
				</div>
				<p className="mt-8 text-xs text-[#94a3b8]/50 tracking-widest uppercase">
					Error Code: {error.digest || "ERR_UNKNOWN_EXCEPTION"}
				</p>
			</div>
		</>
	);
}
