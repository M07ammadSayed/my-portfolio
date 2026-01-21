"use client";
import React from "react";

export default function OfflinePage() {
	const [isChecking, setIsChecking] = React.useState(false);

	const handleReconnect = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (isChecking) return;

		setIsChecking(true);
		try {
			await fetch(`/?t=${Date.now()}`, {
				cache: "no-store",
				mode: "no-cors",
			});
			window.location.href = "/";
		} catch (error) {
			console.log("Still offline...");
			setIsChecking(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] p-4 text-center cursor-none">
			<style jsx global>{`
				html,
				body,
				* {
					cursor: auto !important;
				}
			`}</style>

			<div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 shadow-[0_0_20px_rgba(8,145,178,0.4)]">
				<span className="text-5xl">📡</span>
				<div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-red-500"></div>
			</div>

			<h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
				Oops! You're Offline
			</h1>

			<p className="mb-8 max-w-md text-slate-400">
				It seems you've lost your connection. Don't worry, my portfolio
				is designed to work even when you're disconnected!
			</p>

			<button
				onClick={handleReconnect}
				disabled={isChecking}
				className={`group relative flex items-center justify-center overflow-hidden rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white transition-all 
                ${
					isChecking
						? "opacity-70 cursor-not-allowed"
						: "hover:bg-cyan-500 hover:ring-2 hover:ring-cyan-400 hover:ring-offset-2 hover:ring-offset-[#020617] active:scale-95"
				}`}
			>
				{isChecking ? (
					<span className="flex items-center gap-2">
						<span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
						Checking...
					</span>
				) : (
					"Try To Reconnect"
				)}
			</button>

			<footer className="absolute bottom-8 text-sm text-slate-600">
				&copy; {new Date().getFullYear()} Muhammad Sayyid • Developed
				with ❤️
			</footer>
		</div>
	);
}
