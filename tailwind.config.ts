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
				sans: ["var(--font-sans)"],
				mono: ["var(--font-mono)"],
			},
			colors: {
				brand: {
					cyan: "#06b6d4",
					blue: "#a855f7",
					violet: "#ff6ec7",
				},
				background: {
					darker: "#080810",
					card: "#080810",
				},
			},
			backgroundImage: {
				"premium-gradient":
					"linear-gradient(to right, #ff6ec7, #a855f7, #06b6d4)",
			},
			boxShadow: {
				"glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
				"glow-blue": "0 0 20px rgba(168, 85, 247, 0.3)",
				"glow-violet": "0 0 20px rgba(255, 110, 199, 0.3)",
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
		},
	},
	plugins: [],
};

export default config;
