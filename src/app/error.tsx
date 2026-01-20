"use client";

import { useEffect } from "react";
import { RefreshCcw, WifiOff } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

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

	const handleReboot = () => {
		if (!navigator.onLine) {
			window.location.href = "/offline";
		} else {
			reset();
		}
	};

	return (
		<>
			<CustomCursor />
			<div className="h-screen w-full flex flex-col items-center justify-center bg-[#020617] text-slate-200 font-mono text-center p-4">
				<div className="p-6 rounded-2xl border border-red-500/20 bg-red-900/10 backdrop-blur-md max-w-md w-full">
					<h2 className="text-3xl font-bold text-red-500 mb-2">
						System Malfunction
					</h2>
					<p className="text-slate-400 text-sm mb-6">
						{!navigator.onLine
							? "Connection lost during system synchronization. Please check your network."
							: "A critical runtime error has occurred. Security protocols have engaged to prevent data leak."}
					</p>
					<button
						onClick={handleReboot}
						className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 group"
					>
						{!navigator.onLine ? (
							<WifiOff size={20} />
						) : (
							<RefreshCcw
								className="group-hover:rotate-180 transition-transform duration-500"
								size={20}
							/>
						)}
						{!navigator.onLine
							? "View Offline Version"
							: "Reboot System"}
					</button>
				</div>
			</div>
		</>
	);
}
