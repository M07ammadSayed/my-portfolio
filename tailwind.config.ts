import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-mono)"],
			},
			colors: {
				brand: {
					cyan: "#22d3ee", // cyan-400
					blue: "#2563eb", // blue-600
					violet: "#7c3aed", // violet-600
				},
				background: {
					darker: "#020617", // slate-950
					card: "#0f172a", // slate-900
				},
			},
			backgroundImage: {
				"premium-gradient":
					"linear-gradient(to right, #22d3ee, #2563eb, #7c3aed)",
			},
			boxShadow: {
				"glow-cyan": "0 0 20px rgba(34, 211, 238, 0.3)",
				"glow-blue": "0 0 20px rgba(37, 99, 235, 0.3)",
				"glow-violet": "0 0 20px rgba(124, 58, 237, 0.3)",
			},
			animation: {
				"gradient-x": "gradient-x 15s ease infinite",
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
			},
		},
	},
	plugins: [],
};

export default config;
