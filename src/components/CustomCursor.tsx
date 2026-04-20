"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	motion,
	useSpring,
	useMotionValue,
	AnimatePresence,
} from "framer-motion";

export default function CustomCursor() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isHovering, setIsHovering] = useState(false);
	const [isLargeScreen, setIsLargeScreen] = useState(false);
	const [isClicking, setIsClicking] = useState(false);

	const mX = useMotionValue(-100);
	const mY = useMotionValue(-100);
	const smoothX = useSpring(mX, { damping: 40, stiffness: 500 });
	const smoothY = useSpring(mY, { damping: 40, stiffness: 500 });

	useEffect(() => {
		const checkScreen = () => {
			setIsLargeScreen(window.innerWidth >= 1280);
		};
		checkScreen();
		window.addEventListener("resize", checkScreen);

		const handleMouseMove = (e: MouseEvent) => {
			mX.set(e.clientX);
			mY.set(e.clientY);
		};
		const handleInteraction = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			setIsHovering(!!target.closest("a, button, input, [role='button']"));
		};
		const handleMouseDown = () => setIsClicking(true);
		const handleMouseUp = () => setIsClicking(false);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseover", handleInteraction);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("resize", checkScreen);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseover", handleInteraction);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	useEffect(() => {
		if (!isLargeScreen || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let particles: any[] = [];
		const particleCount = 60;
		const connectionDist = 120;
		let animationFrameId: number;

		class Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			opacity: number;
			constructor() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.vx = (Math.random() - 0.5) * 0.4;
				this.vy = (Math.random() - 0.5) * 0.4;
				this.opacity = Math.random() * 0.4 + 0.1;
			}
			update(mx: number, my: number) {
				const dx = mx - this.x;
				const dy = my - this.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 160) {
					this.x -= dx * 0.018;
					this.y -= dy * 0.018;
				}
				this.x += this.vx;
				this.y += this.vy;
				if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
				if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
			}
		}

		const initCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			particles = Array.from({ length: particleCount }, () => new Particle());
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const mx = mX.get();
			const my = mY.get();

			particles.forEach((p1, i) => {
				p1.update(mx, my);

				// Draw particle
				ctx.beginPath();
				ctx.arc(p1.x, p1.y, 1.2, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(167, 139, 250, ${p1.opacity})`;
				ctx.fill();

				// Draw connections
				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < connectionDist) {
						const midX = (p1.x + p2.x) / 2;
						const midY = (p1.y + p2.y) / 2;
						const dToMouse = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
						const isNear = dToMouse < 140;
						const alpha = (1 - dist / connectionDist) * (isNear ? 0.35 : 0.08);
						ctx.strokeStyle = isNear
							? `rgba(139, 92, 246, ${alpha})`
							: `rgba(167, 139, 250, ${alpha})`;
						ctx.lineWidth = isNear ? 0.7 : 0.3;
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.stroke();
					}
				}
			});

			animationFrameId = requestAnimationFrame(draw);
		};

		initCanvas();
		draw();
		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
			cancelAnimationFrame(animationFrameId);
		};
	}, [isLargeScreen]);

	if (!isLargeScreen) return null;

	return (
		<div className="fixed inset-0 pointer-events-none z-[9999999] hidden xl:block">
			<canvas ref={canvasRef} className="absolute inset-0" />

			{/* Cursor dot */}
			<motion.div
				className="absolute"
				style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
			>
				<motion.div
					animate={{
						width: isClicking ? 10 : isHovering ? 48 : 16,
						height: isClicking ? 10 : isHovering ? 48 : 16,
					}}
					transition={{ type: "spring", stiffness: 450, damping: 28 }}
					className="relative flex items-center justify-center"
				>
					{/* Outer ring */}
					<motion.div
						className="absolute inset-0 rounded-full"
						animate={{
							borderColor: isHovering
								? "rgba(167, 139, 250, 0.6)"
								: "rgba(255, 255, 255, 0.4)",
							boxShadow: isHovering
								? "0 0 12px rgba(139, 92, 246, 0.4)"
								: "none",
						}}
						style={{ border: "1px solid" }}
						transition={{ duration: 0.2 }}
					/>

					{/* Inner dot */}
					<AnimatePresence>
						{!isHovering && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ type: "spring", stiffness: 500, damping: 30 }}
								className="w-1.5 h-1.5 rounded-full"
								style={{ background: "rgba(167, 139, 250, 0.9)", boxShadow: "0 0 6px rgba(139, 92, 246, 0.6)" }}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</div>
	);
}
