"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallBtn, setShowInstallBtn] = useState(false);

	useEffect(() => {
		const isApp = window.matchMedia("(display-mode: standalone)").matches;
		if (isApp) return;

		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setShowInstallBtn(true);
		};

		window.addEventListener(
			"beforeinstallprompt",
			handleBeforeInstallPrompt
		);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const handleInstallClick = async () => {
		console.log(
			"Install button clicked. deferredPrompt status:",
			!!deferredPrompt
		);

		if (!deferredPrompt) {
			console.error("No deferredPrompt available!");
			return;
		}

		try {
			await deferredPrompt.prompt();

			const { outcome } = await deferredPrompt.userChoice;
			console.log(`User decision: ${outcome}`);

			if (outcome === "accepted") {
				setDeferredPrompt(null);
				setShowInstallBtn(false);
			}
		} catch (error) {
			console.error("Error during installation:", error);
		}
	};

	return (
		<AnimatePresence>
			{showInstallBtn && (
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 50, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4"
				>
					<div className="bg-[#080810]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6 max-w-md w-full ring-1 ring-white/5">
						<div className="flex items-center gap-3">
							<div className="bg-[#06b6d4]/20 p-2 rounded-xl">
								📱
							</div>
							<div className="text-white">
								<p className="font-semibold text-sm">
									Install the app
								</p>
								<p className="text-slate-400 text-[11px] leading-tight">
									For a better and faster experience
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={handleInstallClick}
								className="bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
							>
								Install
							</button>
							<button
								onClick={() => setShowInstallBtn(false)}
								className="text-[#ffffff] hover:text-white p-2 transition-colors"
								aria-label="Close"
							>
								✕
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
