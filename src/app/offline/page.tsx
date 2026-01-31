"use client";
export const dynamic = "force-static";
import React from "react";

export default function OfflinePage() {
	const [isChecking, setIsChecking] = React.useState(false);

	React.useEffect(() => {
		const handleOnline = () => (window.location.href = "/");
		window.addEventListener("online", handleOnline);
		return () => window.removeEventListener("online", handleOnline);
	}, []);

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
			if ("vibrate" in navigator) navigator.vibrate(100);
			console.log("Still offline...");
			setIsChecking(false);
		}
	};

	return (
		<div
			style={{
				backgroundColor: "#020617",
				color: "white",
				minHeight: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "1rem",
				textAlign: "center",
				boxSizing: "border-box",
				fontFamily: "system-ui, -apple-system, sans-serif",
				position: "relative",
			}}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
                html, body { margin: 0; padding: 0; cursor: auto !important; }
                .ping {
                    position: absolute; top: -4px; right: -4px;
                    height: 16px; width: 16px; background-color: #ef4444;
                    border-radius: 50%; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
                .spin {
                    animation: spin 1s linear infinite;
                    border: 2px solid white; border-top-color: transparent;
                    border-radius: 50%; width: 16px; height: 16px; display: inline-block;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `,
				}}
			/>

			<div
				style={{
					position: "relative",
					maxHeight: "max-content",
					margin: "auto 0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					style={{
						position: "relative",
						marginBottom: "2rem",
						height: "96px",
						width: "96px",
						backgroundColor: "#0f172a",
						borderRadius: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						boxShadow: "0 0 20px rgba(8, 145, 178, 0.4)",
					}}
				>
					<span style={{ fontSize: "3rem" }}>📡</span>
					<div className="ping"></div>
				</div>

				<h1
					style={{
						fontSize: "2rem",
						fontWeight: "bold",
						marginBottom: "0.5rem",
					}}
				>
					Oops! You're Offline
				</h1>

				<p
					style={{
						color: "#94a3b8",
						maxWidth: "400px",
						marginBottom: "2rem",
						lineHeight: "1.5",
					}}
				>
					It seems you've lost your connection. Don't worry, my
					portfolio is designed to work even when you're disconnected!
				</p>

				<button
					onClick={handleReconnect}
					disabled={isChecking}
					style={{
						backgroundColor: "#0891b2",
						color: "white",
						padding: "12px 32px",
						borderRadius: "12px",
						fontWeight: "600",
						border: "none",
						cursor: isChecking ? "not-allowed" : "pointer",
						opacity: isChecking ? 0.7 : 1,
						transition: "all 0.2s",
						display: "flex",
						alignItems: "center",
						gap: "8px",
					}}
				>
					{isChecking ? (
						<>
							<span className="spin"></span>
							Checking...
						</>
					) : (
						"Try To Reconnect"
					)}
				</button>
			</div>

			<footer
				style={{
					position: "relative",
					bottom: "1rem",
					fontSize: "0.875rem",
					color: "#475569",
				}}
			>
				&copy; {new Date().getFullYear()} Muhammad Sayyid • Developed
				with ❤️
			</footer>
		</div>
	);
}
