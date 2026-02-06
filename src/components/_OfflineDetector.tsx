"use client";

import { useEffect } from "react";

export default function OfflineDetector() {
	useEffect(() => {
		const handleOffline = () => {
			window.location.href = "/offline";
		};

		window.addEventListener("offline", handleOffline);

		if (!navigator.onLine) {
			handleOffline();
		}

		return () => window.removeEventListener("offline", handleOffline);
	}, []);

	return null;
}
