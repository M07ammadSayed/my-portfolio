"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
	motion,
	useSpring,
	useMotionValue,
	AnimatePresence,
} from "framer-motion";

/* ─── color palette ─── */
const CYAN = [6, 182, 212] as const;
const PURPLE = [168, 85, 247] as const;
const PINK = [255, 110, 199] as const;

const PALETTE = [CYAN, PURPLE, PINK] as const;

function lerpColor(
	a: readonly [number, number, number],
	b: readonly [number, number, number],
	t: number
): [number, number, number] {
	return [
		a[0] + (b[0] - a[0]) * t,
		a[1] + (b[1] - a[1]) * t,
		a[2] + (b[2] - a[2]) * t,
	];
}

/* ─── Particle system (canvas) ─── */
interface TrailPoint {
	x: number;
	y: number;
	alpha: number;
}

class Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	baseRadius: number;
	radius: number;
	color: readonly [number, number, number];
	phase: number;
	trail: TrailPoint[];
	pulseSpeed: number;
	glowIntensity: number;

	constructor(w: number, h: number) {
		this.x = Math.random() * w;
		this.y = Math.random() * h;
		this.vx = (Math.random() - 0.5) * 0.4;
		this.vy = (Math.random() - 0.5) * 0.4;
		this.baseRadius = 1.2 + Math.random() * 2;
		this.radius = this.baseRadius;
		this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		this.phase = Math.random() * Math.PI * 2;
		this.trail = [];
		this.pulseSpeed = 0.02 + Math.random() * 0.03;
		this.glowIntensity = 0.4 + Math.random() * 0.6;
	}

	update(mx: number, my: number, w: number, h: number, time: number) {
		/* breathing pulse */
		this.radius =
			this.baseRadius + Math.sin(time * this.pulseSpeed + this.phase) * 0.6;

		/* cursor attraction / repulsion */
		const dx = mx - this.x;
		const dy = my - this.y;
		const distSq = dx * dx + dy * dy;
		const attractRadius = 200;
		const repelRadius = 60;

		if (distSq < attractRadius * attractRadius && distSq > 0) {
			const dist = Math.sqrt(distSq);
			const force = (1 - dist / attractRadius) * 0.015;
			if (dist < repelRadius) {
				/* repel when very close */
				this.vx -= (dx / dist) * force * 3;
				this.vy -= (dy / dist) * force * 3;
			} else {
				/* gentle attract */
				this.vx += (dx / dist) * force;
				this.vy += (dy / dist) * force;
			}
		}

		/* damping */
		this.vx *= 0.995;
		this.vy *= 0.995;

		this.x += this.vx;
		this.y += this.vy;

		/* wrap edges */
		if (this.x < -10) this.x = w + 10;
		if (this.x > w + 10) this.x = -10;
		if (this.y < -10) this.y = h + 10;
		if (this.y > h + 10) this.y = -10;

		/* trail (short tail) */
		this.trail.unshift({ x: this.x, y: this.y, alpha: 1 });
		if (this.trail.length > 6) this.trail.pop();
		for (const tp of this.trail) tp.alpha *= 0.75;
	}
}

export default function CustomCursor() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isHovering, setIsHovering] = useState(false);
	const [isClicking, setIsClicking] = useState(false);
	const [isLargeScreen, setIsLargeScreen] = useState(false);

	const mX = useMotionValue(-100);
	const mY = useMotionValue(-100);
	const smoothX = useSpring(mX, { damping: 40, stiffness: 500 });
	const smoothY = useSpring(mY, { damping: 40, stiffness: 500 });

	/* ── Event listeners ── */
	useEffect(() => {
		const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1280);
		checkScreen();
		window.addEventListener("resize", checkScreen);

		const onMove = (e: MouseEvent) => {
			mX.set(e.clientX);
			mY.set(e.clientY);
		};
		const onOver = (e: MouseEvent) => {
			const t = e.target as HTMLElement;
			setIsHovering(!!t.closest("a, button, input, textarea, select, [role='button'], [data-cursor-hover]"));
		};
		const onDown = () => setIsClicking(true);
		const onUp = () => setIsClicking(false);

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseover", onOver);
		window.addEventListener("mousedown", onDown);
		window.addEventListener("mouseup", onUp);

		return () => {
			window.removeEventListener("resize", checkScreen);
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseover", onOver);
			window.removeEventListener("mousedown", onDown);
			window.removeEventListener("mouseup", onUp);
		};
	}, []);

	/* ── Canvas particle field ── */
	useEffect(() => {
		if (!isLargeScreen || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		let particles: Particle[] = [];
		const PARTICLE_COUNT = 60;
		const CONNECTION_DIST = 140;
		const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
		let raf: number;
		let time = 0;

		const init = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			particles = Array.from(
				{ length: PARTICLE_COUNT },
				() => new Particle(canvas.width, canvas.height)
			);
		};

		const draw = () => {
			raf = requestAnimationFrame(draw);
			time++;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const mx = mX.get();
			const my = mY.get();

			/* update particles */
			for (const p of particles) {
				p.update(mx, my, canvas.width, canvas.height, time);
			}

			/* draw trails */
			for (const p of particles) {
				const [r, g, b] = p.color;
				for (let t = 1; t < p.trail.length; t++) {
					const tp = p.trail[t];
					const prev = p.trail[t - 1];
					const alpha = tp.alpha * 0.25 * p.glowIntensity;
					if (alpha < 0.01) continue;
					ctx.beginPath();
					ctx.moveTo(prev.x, prev.y);
					ctx.lineTo(tp.x, tp.y);
					ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
					ctx.lineWidth = p.radius * 0.6;
					ctx.stroke();
				}
			}

			/* draw connections */
			for (let i = 0; i < particles.length; i++) {
				const p1 = particles[i];
				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const distSq = dx * dx + dy * dy;
					if (distSq >= CONNECTION_DIST_SQ) continue;

					const dist = Math.sqrt(distSq);
					const midX = (p1.x + p2.x) / 2;
					const midY = (p1.y + p2.y) / 2;
					const dToMouse =
						Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
					const isNear = dToMouse < 150;

					/* lerp connection color between two particles */
					const blendedColor = lerpColor(p1.color, p2.color, 0.5);
					const [cr, cg, cb] = blendedColor;

					const baseAlpha = 1 - dist / CONNECTION_DIST;
					const alpha = isNear
						? baseAlpha * 0.45
						: baseAlpha * 0.12;

					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
					ctx.lineWidth = isNear ? 0.8 : 0.35;
					ctx.stroke();
				}
			}

			/* draw particles (glowing orbs) */
			for (const p of particles) {
				const [r, g, b] = p.color;

				/* outer glow */
				const grad = ctx.createRadialGradient(
					p.x, p.y, 0,
					p.x, p.y, p.radius * 4
				);
				grad.addColorStop(0, `rgba(${r},${g},${b},${0.3 * p.glowIntensity})`);
				grad.addColorStop(0.4, `rgba(${r},${g},${b},${0.08 * p.glowIntensity})`);
				grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
				ctx.fillStyle = grad;
				ctx.fill();

				/* core */
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${r},${g},${b},${0.8 * p.glowIntensity})`;
				ctx.fill();

				/* bright center dot */
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${0.6 * p.glowIntensity})`;
				ctx.fill();
			}
		};

		init();
		raf = requestAnimationFrame(draw);
		window.addEventListener("resize", init);

		return () => {
			window.removeEventListener("resize", init);
			cancelAnimationFrame(raf);
		};
	}, [isLargeScreen]);

	if (!isLargeScreen) return null;

	/* ── Cursor sizes ── */
	const ringSize = isClicking ? 14 : isHovering ? 56 : 22;
	const borderW = isClicking ? 2.5 : isHovering ? 1.5 : 1.5;

	return (
		<div className="fixed inset-0 pointer-events-none z-[9999999] hidden 2xl:block">
			<canvas ref={canvasRef} className="absolute inset-0" />

			{/* ── Main cursor element ── */}
			<motion.div
				className="absolute"
				style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
			>
				{/* Outer glow halo */}
				<motion.div
					className="absolute rounded-full"
					animate={{
						width: ringSize + 20,
						height: ringSize + 20,
						opacity: isHovering ? 0.35 : 0.15,
					}}
					transition={{ type: "spring", stiffness: 350, damping: 25 }}
					style={{
						left: "50%",
						top: "50%",
						x: "-50%",
						y: "-50%",
						background:
							"radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
						filter: "blur(8px)",
					}}
				/>

				{/* Main ring */}
				<motion.div
					animate={{
						width: ringSize,
						height: ringSize,
						borderWidth: borderW,
						rotate: isHovering ? 90 : 0,
					}}
					transition={{ type: "spring", stiffness: 400, damping: 28 }}
					className="relative flex items-center justify-center"
					style={{
						borderStyle: "solid",
						borderColor: "transparent",
						borderRadius: isHovering ? "12px" : "50%",
						backgroundClip: "padding-box",
						backgroundImage: isHovering
							? "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(6,182,212,0.08))"
							: "none",
					}}
				>
					{/* Gradient border trick via pseudo-like wrapper */}
					<div
						className="absolute inset-0 rounded-full"
						style={{
							borderRadius: isHovering ? "12px" : "50%",
							padding: `${borderW}px`,
							background:
								"linear-gradient(135deg, #06b6d4, #a855f7, #ff6ec7, #06b6d4)",
							WebkitMask:
								"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
							WebkitMaskComposite: "xor",
							maskComposite: "exclude",
							transition: "border-radius 0.3s ease",
						}}
					/>

					{/* Core dot / crosshair */}
					<AnimatePresence mode="wait">
						{isHovering ? (
							<motion.div
								key="crosshair"
								initial={{ opacity: 0, scale: 0, rotate: -45 }}
								animate={{ opacity: 1, scale: 1, rotate: 0 }}
								exit={{ opacity: 0, scale: 0, rotate: 45 }}
								transition={{ duration: 0.2 }}
								className="relative"
								style={{ width: 20, height: 20 }}
							>
								{/* crosshair lines */}
								<span
									className="absolute bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
									style={{
										width: "100%",
										height: 1.5,
										top: "50%",
										left: 0,
										transform: "translateY(-50%)",
									}}
								/>
								<span
									className="absolute bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"
									style={{
										width: 1.5,
										height: "100%",
										left: "50%",
										top: 0,
										transform: "translateX(-50%)",
									}}
								/>
								{/* center diamond */}
								<span
									className="absolute"
									style={{
										width: 4,
										height: 4,
										top: "50%",
										left: "50%",
										transform: "translate(-50%,-50%) rotate(45deg)",
										backgroundColor: "#06b6d4",
										boxShadow: "0 0 8px #06b6d4, 0 0 16px rgba(6,182,212,0.5)",
									}}
								/>
							</motion.div>
						) : (
							<motion.div
								key="dot"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ duration: 0.15 }}
								className="rounded-full"
								style={{
									width: 3,
									height: 3,
									background:
										"linear-gradient(135deg, #06b6d4, #a855f7)",
									boxShadow:
										"0 0 6px #06b6d4, 0 0 12px rgba(6,182,212,0.4), 0 0 20px rgba(168,85,247,0.2)",
								}}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</div>
	);
}
