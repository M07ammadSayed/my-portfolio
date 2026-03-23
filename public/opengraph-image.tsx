import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Muhammad Sayyid | AppSec Engineer";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: "#020617",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					fontFamily: "monospace",
					position: "relative",
				}}
			>
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
						zIndex: 1,
					}}
				/>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "20px",
						zIndex: 10,
					}}
				>
					<div
						style={{
							fontSize: 80,
							background:
								"linear-gradient(to right, #22d3ee, #3b82f6و #9810fa)",
							backgroundClip: "text",
							color: "transparent",
							fontWeight: 900,
							letterSpacing: "-0.05em",
						}}
					>
						&lt;MS /&gt;
					</div>
				</div>

				<div
					style={{
						fontSize: 50,
						color: "#e2e8f0",
						marginTop: 30,
						fontWeight: 700,
						zIndex: 10,
					}}
				>
					Muhammad Sayyid
				</div>

				<div
					style={{
						fontSize: 30,
						color: "#94a3b8",
						marginTop: 10,
						zIndex: 10,
						letterSpacing: "0.2em",
						textTransform: "uppercase",
					}}
				>
					Application Security Engineer
				</div>
			</div>
		),
		{
			...size,
		}
	);
}
