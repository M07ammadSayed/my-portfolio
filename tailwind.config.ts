import type { Config } from "tailwindcss";

const config: Config = {
        content: [
                "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
                "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
                "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
        theme: {
                extend: {
                        fontFamily: {
                                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
                                mono: ["var(--font-mono)", "monospace"],
                                display: ["var(--font-display)", "system-ui", "sans-serif"],
                        },
                        colors: {
                                brand: {
                                        cyan: "#06b6d4",
                                        purple: "#a855f7",
                                },
                                background: {
                                        DEFAULT: "#080810",
                                        surface: "#0d0d1a",
                                },
                        },
                        backgroundImage: {
                                "accent-gradient":
                                        "linear-gradient(135deg, #a855f7, #06b6d4)",
                                "accent-gradient-subtle":
                                        "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.15))",
                        },
                        boxShadow: {
                                "glow-cyan": "0 0 24px rgba(6, 182, 212, 0.25)",
                                "glow-purple": "0 0 24px rgba(168, 85, 247, 0.25)",
                                "glow-cyan-lg": "0 0 40px rgba(6, 182, 212, 0.2)",
                        },
                        animation: {
                                "gradient-x": "gradient-x 15s ease infinite",
                                "scanline": "scanline 2s linear infinite",
                        },
                        keyframes: {
                                "gradient-x": {
                                        "0%, 100%": {
                                                "background-size": "200% 200%",
                                                "background-position": "left center",
                                        },
                                        "50%": {
                                                "background-size": "200% 200%",
                                                "background-position": "right center",
                                        },
                                },
                                "scanline": {
                                        "0%": { transform: "translateY(-100%)" },
                                        "100%": { transform: "translateY(1000%)" },
                                },
                        },
                        transitionTimingFunction: {
                                "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
                                "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
                        },
                },
        },
        plugins: [],
};

export default config;
