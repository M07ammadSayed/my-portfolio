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
					cyan: "#00E5FF", // Brighter, cleaner cyan
					blue: "#8B5CF6", // Nicer violet-blue
					violet: "#EC4899", // Pinkish-violet
				},
				background: {
					darker: "#05050A",
					card: "#0A0A10",
				},
			},
			backgroundImage: {
				"premium-gradient":
					"linear-gradient(to right, #EC4899, #8B5CF6, #00E5FF)",
			},
			boxShadow: {
				"glow-cyan": "0 0 24px rgba(0, 229, 255, 0.2)",
				"glow-blue": "0 0 24px rgba(139, 92, 246, 0.2)",
				"glow-violet": "0 0 24px rgba(236, 72, 153, 0.2)",
				"card-hover": "0 8px 32px rgba(0, 0, 0, 0.4)",
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
