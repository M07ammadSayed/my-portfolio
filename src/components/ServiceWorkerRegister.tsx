"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/sw.js", { scope: "/" })
				.then((registration) =>
					console.log("SW Registered with scope:", registration.scope)
				)
				.catch((err) => console.log("SW Registration Failed:", err));
		}
	}, []);

	return null;
}
