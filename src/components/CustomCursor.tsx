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

	const mX = useMotionValue(-100);
	const mY = useMotionValue(-100);
	const smoothX = useSpring(mX, { damping: 50, stiffness: 600 });
	const smoothY = useSpring(mY, { damping: 50, stiffness: 600 });

	useEffect(() => {
		const checkScreen = () => {
			const isLarge = window.innerWidth >= 1280;
			setIsLargeScreen(isLarge);
		};

		checkScreen();
		window.addEventListener("resize", checkScreen);

		const handleMouseMove = (e: MouseEvent) => {
			mX.set(e.clientX);
			mY.set(e.clientY);
		};

		const handleInteraction = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			setIsHovering(
				!!target.closest("a, button, input, [role='button']")
			);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseover", handleInteraction);

		return () => {
			window.removeEventListener("resize", checkScreen);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseover", handleInteraction);
		};
	}, []);

	useEffect(() => {
		if (!isLargeScreen || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let particles: any[] = [];
		const particleCount = 70;
		const connectionDist = 130;
		let animationFrameId: number;

		class Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			constructor() {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
				this.vx = (Math.random() - 0.5) * 0.5;
				this.vy = (Math.random() - 0.5) * 0.5;
			}
			update(mx: number, my: number) {
				const dx = mx - this.x;
				const dy = my - this.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 150) {
					this.x -= dx * 0.02;
					this.y -= dy * 0.02;
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
			particles = Array.from(
				{ length: particleCount },
				() => new Particle()
			);
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const mx = mX.get();
			const my = mY.get();
			particles.forEach((p1, i) => {
				p1.update(mx, my);
				ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
				ctx.beginPath();
				ctx.arc(p1.x, p1.y, 1, 0, Math.PI * 2);
				ctx.fill();
				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < connectionDist) {
						const dToMouse = Math.sqrt(
							(mx - (p1.x + p2.x) / 2) ** 2 +
								(my - (p1.y + p2.y) / 2) ** 2
						);
						const isNearMouse = dToMouse < 150;
						ctx.strokeStyle = isNearMouse
							? "rgba(34, 211, 238, 0.4)"
							: "rgba(255, 255, 255, 0.15)";
						ctx.lineWidth = isNearMouse ? 0.8 : 0.4;
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
			<motion.div
				className="absolute flex items-center justify-center mix-blend-difference"
				style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
			>
				<motion.div
					animate={{
						width: isHovering ? 60 : 18,
						height: isHovering ? 60 : 18,
						rotate: isHovering ? 90 : 0,
					}}
					transition={{ type: "spring", stiffness: 400, damping: 30 }}
					className="relative flex items-center justify-center"
				>
					<div className="absolute inset-0 border border-white/60 rounded-full" />
					<AnimatePresence>
						{!isHovering && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
							/>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</div>
	);
}
