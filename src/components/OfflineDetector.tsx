'use client';

import { useEffect } from "react";

export default function OfflineManager() {
    useEffect(() => {
        const handleOffline = () => {
            window.location.href = "/offline";
        };

        window.addEventListener("offline", handleOffline);

        if (!navigator.onLine) {
            handleOffline();
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.update();
            });
        }

        return () => window.removeEventListener("offline", handleOffline);
    }, []);

    return null; 
}