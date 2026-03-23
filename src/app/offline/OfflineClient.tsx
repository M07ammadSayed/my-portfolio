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
            if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]);
            console.log("Still offline...");
            setIsChecking(false);
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#020617",
                color: "white",
                height: "100dvh",
                minHeight: "-webkit-fill-available",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                textAlign: "center",
                boxSizing: "border-box",
                fontFamily: "system-ui, -apple-system, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                html, body { margin: 0; padding: 0; cursor: auto !important; height: 100%; overflow: hidden; width: 100%;}
                button { cursor: pointer !important; }
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
                .heart-pulse {
                animation: heartBeat 1.5s ease-in-out infinite;
                }

                @keyframes heartBeat {
                    0% { transform: scale(1); }
                    15% { transform: scale(1.2); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.15); }
                    60% { transform: scale(1); }
                }
                @media (max-width: 768px) {
                    .footer-container {
                        position: fixed !important;
                        bottom: 0 !important;
                        padding-bottom: max(env(safe-area-inset-bottom, 0px), 1.5rem) !important;
                        height: auto;
                        font-size: 0.75rem !important;
                        gap: 8px !important;
                        background-color: #020617;
                    }
                }
            `,
                }}
            />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
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
                className="footer-container"
                style={{
                    position: "absolute",
                    left: "0",
                    right: "0",
                    width: "100%",
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    fontSize: "0.875rem",
                    color: "#475569",
                    textAlign: "center",
                    userSelect: "none",
                    padding: "0 10px",
                    bottom: "1.5rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <span>&copy; {new Date().getFullYear()}</span>
                    <span style={{ color: "#94a3b8", fontWeight: "500" }}>
                        Muhammad Sayyid
                    </span>
                </div>

                <span
                    className="footer-dot"
                    style={{
                        opacity: 0.6,
                        display: "inline-flex",
                        alignItems: "center",
                        lineHeight: "0",
                        fontSize: "1.5rem",
                    }}
                >
                    •
                </span>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <span>Developed with</span>
                    <span className="heart-pulse" style={{ color: "#ef4444" }}>
                        ❤️
                    </span>
                </div>
            </footer>
        </div>
    );
}