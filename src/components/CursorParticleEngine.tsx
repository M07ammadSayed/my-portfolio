"use client";

import React, { useEffect, useRef, useState } from "react";
import { createNoise2D } from "simplex-noise";

// --- Types & Constants ---
type CursorState = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	speed: number;
	isHoveringLink: boolean;
	isHoveringText: boolean;
	isHoveringImage: boolean;
	isDown: boolean;
	target: HTMLElement | null;
	lastMoveTime: number;
};

type Star = {
	x: number;
	y: number;
	size: number;
	baseOpacity: number;
	twinkleSpeed: number;
	twinklePhase: number;
	twinkleAmplitude: number;
	vx: number;
	vy: number;
};

type DataParticle = {
	x: number;
	y: number;
	baseX: number;
	baseY: number;
	vx: number;
	vy: number;
	size: number;
	currentSize: number;
	baseOpacity: number;
	currentOpacity: number;
	hueOffset: number;
	noiseOffsetX: number;
	noiseOffsetY: number;
};

export default function CursorParticleEngine() {
	const [isMobile, setIsMobile] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		setIsMobile(window.matchMedia("(pointer: coarse)").matches);
	}, []);

	const canvas1Ref = useRef<HTMLCanvasElement>(null);
	const canvas2Ref = useRef<HTMLCanvasElement>(null);
	const canvas3Ref = useRef<HTMLCanvasElement>(null);

	const dotRef = useRef<HTMLDivElement>(null);
	const ringBRef = useRef<HTMLDivElement>(null);
	const ringCRef = useRef<HTMLDivElement>(null);
	const ghostRedRef = useRef<HTMLDivElement>(null);
	const ghostGreenRef = useRef<HTMLDivElement>(null);
	const ghostBlueRef = useRef<HTMLDivElement>(null);
	const crosshairRef = useRef<HTMLDivElement>(null);
	const viewTextRef = useRef<HTMLDivElement>(null);

	const stateRef = useRef<CursorState>({
		x: -100,
		y: -100,
		vx: 0,
		vy: 0,
		speed: 0,
		isHoveringLink: false,
		isHoveringText: false,
		isHoveringImage: false,
		isDown: false,
		target: null,
		lastMoveTime: 0,
	});

	useEffect(() => {
		if (isMobile || !mounted) return;

		const noise2D = createNoise2D();

		// State and Canvas sizing
		const state = stateRef.current;
		let width = window.innerWidth;
		let height = window.innerHeight;

		const c1 = canvas1Ref.current!;
		const c2 = canvas2Ref.current!;
		const c3 = canvas3Ref.current!;

		const ctx1 = c1.getContext("2d")!;
		const ctx2 = c2.getContext("2d")!;
		const ctx3 = c3.getContext("2d")!;

		let stars: Star[] = [];
		let dataParticles: DataParticle[] = [];

		const initCanvases = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			c1.width = width;
			c1.height = height;
			c2.width = width;
			c2.height = height;
			c3.width = width;
			c3.height = height;

			const isTablet = width >= 768 && width < 1280;
			const isDesktop = width >= 1280;

			const starCount = isDesktop ? 110 : isTablet ? 70 : 40;
			const dataCount = isDesktop ? 55 : isTablet ? 32 : 0;

			stars = Array.from({ length: starCount }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				size: 0.6 + Math.random() * 1.2, // 0.6 to 1.8
				baseOpacity: 0.06 + Math.random() * 0.18, // 0.06 to 0.24
				twinkleSpeed: 0.003 + Math.random() * 0.006, // 0.003 to 0.009
				twinklePhase: Math.random() * Math.PI * 2,
				twinkleAmplitude: 0.02 + Math.random() * 0.04, // 0.02 to 0.06
				vx: (Math.random() - 0.5) * 0.12, // -0.06 to 0.06
				vy: (Math.random() - 0.5) * 0.08, // -0.04 to 0.04
			}));

			dataParticles = Array.from({ length: dataCount }, () => {
				const x = Math.random() * width;
				const y = Math.random() * height;
				const size = 1.4 + Math.random() * 1.2;
				const baseOpacity = 0.15 + Math.random() * 0.25;
				return {
					x,
					y,
					baseX: x,
					baseY: y,
					vx: (Math.random() - 0.5) * 0.3, // -0.15 to +0.15
					vy: (Math.random() - 0.5) * 0.3,
					size,
					currentSize: size,
					baseOpacity,
					currentOpacity: baseOpacity,
					hueOffset: (Math.random() - 0.5) * 16, // -8 to +8
					noiseOffsetX: Math.random() * 1000,
					noiseOffsetY: Math.random() * 1000,
				};
			});
		};

		initCanvases();
		let resizeTimeout: ReturnType<typeof setTimeout>;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(initCanvases, 200);
		};
		window.addEventListener("resize", handleResize);

		// Cursor Lerp Targets
		let ringBX = width / 2;
		let ringBY = height / 2;
		let ringCX = width / 2;
		let ringCY = height / 2;

		let prevMouseX = width / 2;
		let prevMouseY = height / 2;

		// Mouse events
		const handleMouseMove = (e: MouseEvent) => {
			state.vx = e.clientX - prevMouseX;
			state.vy = e.clientY - prevMouseY;
			state.speed = Math.sqrt(state.vx ** 2 + state.vy ** 2);

			state.x = e.clientX;
			state.y = e.clientY;
			state.lastMoveTime = Date.now();

			prevMouseX = state.x;
			prevMouseY = state.y;

			// Magnetic logic
			document.querySelectorAll('button, a[href="#contact"], .cta-primary, .cta-secondary').forEach((el) => {
				const rect = el.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				const dx = state.x - centerX;
				const dy = state.y - centerY;
				const distance = Math.sqrt(dx ** 2 + dy ** 2);

				const htmlEl = el as HTMLElement;
				if (distance < 60) {
					const strength = (60 - distance) / 60;
					const moveX = dx * strength * 0.35;
					const moveY = dy * strength * 0.35;
					htmlEl.style.transform = `translate(${moveX}px, ${moveY}px)`;
					htmlEl.style.transition = 'transform 0ms';
				} else {
					htmlEl.style.transform = 'translate(0px, 0px)';
					htmlEl.style.transition = 'transform 600ms cubic-bezier(0.16,1,0.30,1)';
				}
			});
		};

		const updateHoverStates = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			state.target = target;
			
			// Links / Buttons (expanding ring)
			const isLink = !!target.closest('a, button, [role="button"], .clickable, nav a');
			// Text
			const isText = !!target.closest('p, span, h1, h2, h3, h4, li, blockquote');
			// Image
			const isImage = !!target.closest('img, .card, .project-card');

			// Priority: Image > Link > Text
			if (isImage) {
				state.isHoveringImage = true;
				state.isHoveringLink = false;
				state.isHoveringText = false;
			} else if (isLink) {
				state.isHoveringImage = false;
				state.isHoveringLink = true;
				state.isHoveringText = false;
			} else if (isText) {
				state.isHoveringImage = false;
				state.isHoveringLink = false;
				state.isHoveringText = true;
			} else {
				state.isHoveringImage = false;
				state.isHoveringLink = false;
				state.isHoveringText = false;
			}
			
			applyCursorStates();
		};

		const applyCursorStates = () => {
			const rb = ringBRef.current;
			const rc = ringCRef.current;
			const ch = crosshairRef.current;
			const vt = viewTextRef.current;
			
			if (!rb || !rc) return;

			// Base transforms handled in RAF, here we update styles that transition
			if (state.isHoveringImage) {
				rb.style.width = '50px';
				rb.style.height = '50px';
				rb.style.border = '1px solid rgba(0, 212, 255, 0.35)';
				rb.style.background = 'transparent';
				rb.style.borderRadius = '50%';
				rb.style.transition = 'all 300ms cubic-bezier(0.16, 1, 0.30, 1)';
				if (vt) {
					vt.style.opacity = '1';
					vt.style.transitionDelay = '400ms';
				}
				if (ch) ch.style.opacity = '0';
				rc.style.opacity = '0.18'; // Normal C
			} else if (state.isHoveringLink) {
				rb.style.width = '32px';
				rb.style.height = '32px';
				rb.style.border = '1.5px solid rgba(0, 212, 255, 0.90)';
				rb.style.background = 'rgba(0, 212, 255, 0.06)';
				rb.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.15), inset 0 0 8px rgba(0, 212, 255, 0.05)';
				rb.style.borderRadius = '50%';
				rb.style.transition = 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)';
				if (ch) {
					ch.style.opacity = '0.30';
					ch.style.transitionDelay = '200ms';
				}
				if (vt) {
					vt.style.opacity = '0';
					vt.style.transitionDelay = '0ms';
				}
				
				rc.style.width = '60px';
				rc.style.height = '60px';
				rc.style.border = '1px solid rgba(0, 212, 255, 0.28)';
				rc.style.opacity = '0.28';
				rc.style.transition = 'all 300ms cubic-bezier(0.16, 1, 0.30, 1)';
			} else if (state.isHoveringText) {
				rb.style.width = '2px';
				rb.style.height = '26px';
				rb.style.border = 'none';
				rb.style.background = 'rgba(0, 212, 255, 0.75)';
				rb.style.boxShadow = 'none';
				rb.style.borderRadius = '2px';
				rb.style.transition = 'all 140ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
				if (ch) ch.style.opacity = '0';
				if (vt) vt.style.opacity = '0';
				
				rc.style.opacity = '0';
				rc.style.transition = 'opacity 120ms ease';
			} else {
				// Default
				rb.style.width = '22px';
				rb.style.height = '22px';
				rb.style.border = '1.5px solid rgba(0, 212, 255, 0.70)';
				rb.style.background = 'transparent';
				rb.style.boxShadow = 'none';
				rb.style.borderRadius = '50%';
				rb.style.transition = 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)';
				if (ch) {
					ch.style.opacity = '0';
					ch.style.transitionDelay = '0ms';
				}
				if (vt) {
					vt.style.opacity = '0';
					vt.style.transitionDelay = '0ms';
				}

				rc.style.width = '44px';
				rc.style.height = '44px';
				rc.style.border = '1px solid rgba(0, 212, 255, 0.18)';
				rc.style.opacity = '0.18';
				rc.style.transition = 'all 300ms cubic-bezier(0.16, 1, 0.30, 1)';
			}
		};

		const createRipple = (x: number, y: number) => {
			const ripple = document.createElement('div');
			ripple.className = 'cursor-ripple';
			ripple.style.left = `${x}px`;
			ripple.style.top = `${y}px`;
			document.body.appendChild(ripple);
			setTimeout(() => {
				ripple.remove();
			}, 600);
		};

		const handleMouseDown = () => {
			state.isDown = true;
			
			createRipple(state.x, state.y);
			if (state.isHoveringLink) {
				setTimeout(() => createRipple(state.x, state.y), 80);
			}
		};

		const handleMouseUp = () => {
			state.isDown = false;
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseover", updateHoverStates);
		window.addEventListener("mouseout", updateHoverStates);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		// Scroll logic for parallax
		let scrollY = window.scrollY;
		const handleScroll = () => {
			scrollY = window.scrollY;
			c1.style.transform = `translateY(${scrollY * -0.20}px)`;
			c2.style.transform = `translateY(${scrollY * -0.38}px)`;
			c3.style.transform = `translateY(${scrollY * -0.38}px)`;
		};
		window.addEventListener("scroll", handleScroll, { passive: true });

		let frameCount = 0;
		let rafId: number;

		const loop = () => {
			rafId = requestAnimationFrame(loop);
			if (document.hidden) return; // Halt computation when hidden
			
			frameCount++;

			// --- Cursor Physics ---
			ringBX += (state.x - ringBX) * 0.18;
			ringBY += (state.y - ringBY) * 0.18;
			ringCX += (state.x - ringCX) * 0.09;
			ringCY += (state.y - ringCY) * 0.09;

			// Handle breathing animation if stationary > 1500ms and not hovering text
			const timeSinceMove = Date.now() - state.lastMoveTime;
			let scaleC = 1.0;
			if (timeSinceMove > 1500 && !state.isHoveringText) {
				scaleC = 1.0 + Math.sin(frameCount * 0.035) * 0.12; // breathe
			}
			if (state.isDown) scaleC = 0.8;

			// Apply transforms
			const wB = state.isHoveringImage ? 50 : state.isHoveringLink ? 32 : state.isHoveringText ? 2 : 22;
			const hB = state.isHoveringImage ? 50 : state.isHoveringLink ? 32 : state.isHoveringText ? 26 : 22;
			const wC = state.isHoveringLink ? 60 : 44;
			const hC = state.isHoveringLink ? 60 : 44;

			if (ringBRef.current) {
				ringBRef.current.style.transform = `translate(${ringBX - wB/2}px, ${ringBY - hB/2}px) ${state.isDown ? 'scale(0.70)' : 'scale(1.0)'}`;
			}
			if (ringCRef.current && !state.isHoveringText) {
				ringCRef.current.style.transform = `translate(${ringCX - wC/2}px, ${ringCY - hC/2}px) scale(${scaleC})`;
			}
			if (dotRef.current) {
				dotRef.current.style.transform = `translate(${state.x - 2.5}px, ${state.y - 2.5}px) ${state.isDown ? 'scale(0.5)' : 'scale(1.0)'}`;
			}

			// Chromatic Aberration Ghost
			if (state.speed > 12) {
				const dirX = state.vx / state.speed;
				const dirY = state.vy / state.speed;
				const offset = Math.min((state.speed - 12) * 0.6, 8);
				const opacity = Math.min((state.speed - 12) * 0.05, 0.45);
				
				if (ghostRedRef.current && ghostGreenRef.current && ghostBlueRef.current && ringBRef.current) {
					ringBRef.current.style.opacity = '0';
					
					ghostRedRef.current.style.transform = `translate(${ringBX - wB/2 - dirX * offset}px, ${ringBY - hB/2 - dirY * offset}px)`;
					ghostRedRef.current.style.width = `${wB}px`;
					ghostRedRef.current.style.height = `${hB}px`;
					ghostRedRef.current.style.opacity = `${opacity}`;
					
					ghostGreenRef.current.style.transform = `translate(${ringBX - wB/2}px, ${ringBY - hB/2}px)`;
					ghostGreenRef.current.style.width = `${wB}px`;
					ghostGreenRef.current.style.height = `${hB}px`;
					ghostGreenRef.current.style.opacity = `${opacity}`;
					
					ghostBlueRef.current.style.transform = `translate(${ringBX - wB/2 + dirX * offset}px, ${ringBY - hB/2 + dirY * offset}px)`;
					ghostBlueRef.current.style.width = `${wB}px`;
					ghostBlueRef.current.style.height = `${hB}px`;
					ghostBlueRef.current.style.opacity = `${opacity}`;
				}
			} else {
				if (ringBRef.current) ringBRef.current.style.opacity = '1';
				if (ghostRedRef.current) ghostRedRef.current.style.opacity = '0';
				if (ghostGreenRef.current) ghostGreenRef.current.style.opacity = '0';
				if (ghostBlueRef.current) ghostBlueRef.current.style.opacity = '0';
			}

			// Decelerate cursor tracking velocity to allow chromatic aberration to decay
			state.vx *= 0.8;
			state.vy *= 0.8;
			state.speed = Math.sqrt(state.vx ** 2 + state.vy ** 2);

			// --- Particle Rendering ---
			ctx1.clearRect(0, 0, width, height);
			ctx2.clearRect(0, 0, width, height);
			ctx3.clearRect(0, 0, width, height);

			// Canvas 1: Stars
			for (const s of stars) {
				s.x += s.vx;
				s.y += s.vy;
				if (s.x < -2) s.x = width + 2;
				if (s.x > width + 2) s.x = -2;
				if (s.y < -2) s.y = height + 2;
				if (s.y > height + 2) s.y = -2;

				const op = s.baseOpacity + Math.sin(frameCount * s.twinkleSpeed + s.twinklePhase) * s.twinkleAmplitude;
				const clampedOp = Math.max(0.03, Math.min(0.30, op));

				ctx1.beginPath();
				ctx1.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
				ctx1.fillStyle = `rgba(255, 255, 255, ${clampedOp})`;
				ctx1.fill();
			}

			// Canvas 2 & 3: Data Particles & Connections
			for (let i = 0; i < dataParticles.length; i++) {
				const p = dataParticles[i];

				// Flow field
				const angle = noise2D(
					p.noiseOffsetX + frameCount * 0.003,
					p.noiseOffsetY + frameCount * 0.003
				) * Math.PI * 2;
				
				p.vx += Math.cos(angle) * 0.008;
				p.vy += Math.sin(angle) * 0.008;

				// Cursor repulsion
				const dx = p.x - state.x;
				const dy = p.y - state.y;
				const dist = Math.sqrt(dx ** 2 + dy ** 2);

				if (dist < 130 && dist > 0) {
					const force = Math.pow((130 - dist) / 130, 2);
					const normalX = dx / dist;
					const normalY = dy / dist;
					p.vx += normalX * force * 1.2;
					p.vy += normalY * force * 1.2;
				}

				// Velocity Bioluminescence
				const cSpeed = Math.sqrt((state.x - prevMouseX) ** 2 + (state.y - prevMouseY) ** 2);
				// Use state speed but without the decay we just applied, actually we need the true recent speed. 
				// The spec said "At high cursor velocity (> 12px)". Let's use the mouse event calculated speed.
				// Since we decayed it above, we use a tracked 'speed' variable or recalculate diff.
				// We'll use a local tracking or just use `state.speed` before decay if we move it.
				// For now, if cursor recently moved fast:
				
				if (dist < 180 && timeSinceMove < 100) {
					// Need the instantaneous speed, let's use a stored value if > 8
					// To avoid complexities, we use a simple distance to last known position.
				}
				// A simpler bioluminescence based on speed:
				const bioSpeed = Math.sqrt(state.vx ** 2 + state.vy ** 2) / 0.8; // reverse decay for a moment
				if (bioSpeed > 8 && dist < 180) {
					const vFactor = Math.min((bioSpeed - 8) / 20, 1.0);
					const dFactor = 1.0 - (dist / 180);
					const intensity = vFactor * dFactor;
					p.currentOpacity = Math.min(0.90, p.baseOpacity + intensity * 0.55);
					p.currentSize = p.size + intensity * 1.5;
				} else {
					p.currentOpacity += (p.baseOpacity - p.currentOpacity) * 0.04;
					p.currentSize += (p.size - p.currentSize) * 0.04;
				}

				// Home gravity & Damping
				p.vx += (p.baseX - p.x) * 0.004;
				p.vy += (p.baseY - p.y) * 0.004;
				p.vx *= 0.96;
				p.vy *= 0.96;

				p.x += p.vx;
				p.y += p.vy;

				// Draw Particle (Canvas 2)
				const hue = 193 + p.hueOffset; // #00D4FF is roughly 193 HSL
				ctx2.beginPath();
				ctx2.arc(p.x, p.y, p.currentSize / 2, 0, Math.PI * 2);
				ctx2.fillStyle = `hsla(${hue}, 100%, 60%, ${p.currentOpacity})`;
				ctx2.fill();

				if (p.currentOpacity > 0.25) {
					ctx2.beginPath();
					ctx2.arc(p.x, p.y, p.currentSize, 0, Math.PI * 2);
					ctx2.fillStyle = `hsla(${hue}, 100%, 70%, ${(p.currentOpacity - 0.25) * 0.15})`;
					ctx2.fill();
				}

				// Draw Connections (Canvas 3)
				for (let j = i + 1; j < dataParticles.length; j++) {
					const p2 = dataParticles[j];
					const ddx = p.x - p2.x;
					const ddy = p.y - p2.y;
					const pDist = Math.sqrt(ddx ** 2 + ddy ** 2);

					if (pDist < 95) {
						const opacity = (1 - pDist / 95) * 0.09;
						ctx3.beginPath();
						ctx3.moveTo(p.x, p.y);
						ctx3.lineTo(p2.x, p2.y);
						ctx3.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
						ctx3.lineWidth = 0.5;
						ctx3.stroke();
					}
				}

				// Cursor connection
				if (dist < 85) {
					const opacity = (1 - dist / 85) * 0.22;
					ctx3.beginPath();
					ctx3.moveTo(state.x, state.y);
					ctx3.lineTo(p.x, p.y);
					ctx3.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
					ctx3.lineWidth = 0.8;
					ctx3.stroke();
				}
			}

		};

		rafId = requestAnimationFrame(loop);

		// Entrance fade in sequences handled by CSS classes/styles applied on mount
		if (c1) {
			setTimeout(() => { c1.style.opacity = '1'; }, 400);
		}
		if (c2 && c3) {
			setTimeout(() => { c2.style.opacity = '1'; c3.style.opacity = '1'; }, 800);
		}
		if (dotRef.current && ringBRef.current && ringCRef.current) {
			setTimeout(() => {
				if(dotRef.current) { dotRef.current.style.opacity = '1'; dotRef.current.style.transform = 'scale(1.0)'; }
			}, 900);
			setTimeout(() => {
				if(ringBRef.current) { ringBRef.current.style.opacity = '1'; ringBRef.current.style.transform = 'scale(1.0)'; }
			}, 950);
			setTimeout(() => {
				if(ringCRef.current) { ringCRef.current.style.opacity = '0.18'; ringCRef.current.style.transform = 'scale(1.0)'; }
			}, 1050);
		}

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseover", updateHoverStates);
			window.removeEventListener("mouseout", updateHoverStates);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, [isMobile, mounted]);

	if (isMobile || !mounted) return null;

	return (
		<>
			<style dangerouslySetInnerHTML={{__html: `
				.cursor-ripple {
					position: fixed;
					width: 60px;
					height: 60px;
					border: 1px solid rgba(0, 212, 255, 0.60);
					border-radius: 50%;
					background: transparent;
					pointer-events: none;
					z-index: 9998;
					transform: translate(-30px, -30px);
					animation: ripple-expand 600ms cubic-bezier(0.16, 1, 0.30, 1) forwards;
				}
				@keyframes ripple-expand {
					0%   { width: 60px; height: 60px; opacity: 0.60; transform: translate(-30px, -30px) }
					100% { width: 120px; height: 120px; opacity: 0; transform: translate(-60px, -60px) }
				}
			`}} />

			{/* Canvas Layers */}
			<canvas
				ref={canvas1Ref}
				className="fixed inset-0 pointer-events-none z-0"
				style={{ opacity: 0, transition: 'opacity 1400ms ease-out' }}
			/>
			<canvas
				ref={canvas2Ref}
				className="fixed inset-0 pointer-events-none z-10"
				style={{ opacity: 0, transition: 'opacity 1000ms ease-out' }}
			/>
			<canvas
				ref={canvas3Ref}
				className="fixed inset-0 pointer-events-none z-20"
				style={{ opacity: 0, transition: 'opacity 1000ms ease-out' }}
			/>

			{/* Cursor DOM Elements */}
			<div className="fixed inset-0 pointer-events-none z-[99999] hidden xl:block">
				
				{/* Ghost Red */}
				<div 
					ref={ghostRedRef} 
					className="absolute border border-[rgba(255,60,60,0.35)] rounded-full will-change-transform"
					style={{ opacity: 0, transition: 'opacity 400ms ease' }}
				/>
				{/* Ghost Green */}
				<div 
					ref={ghostGreenRef} 
					className="absolute border border-[rgba(60,255,120,0.35)] rounded-full will-change-transform"
					style={{ opacity: 0, transition: 'opacity 400ms ease' }}
				/>
				{/* Ghost Blue */}
				<div 
					ref={ghostBlueRef} 
					className="absolute border border-[rgba(60,120,255,0.45)] rounded-full will-change-transform"
					style={{ opacity: 0, transition: 'opacity 400ms ease' }}
				/>

				{/* Outer Ring C */}
				<div
					ref={ringCRef}
					className="absolute rounded-full bg-transparent will-change-transform"
					style={{
						width: '44px',
						height: '44px',
						border: '1px solid rgba(0, 212, 255, 0.18)',
						opacity: 0,
					}}
				/>

				{/* Inner Ring B */}
				<div
					ref={ringBRef}
					className="absolute bg-transparent will-change-transform flex items-center justify-center overflow-hidden"
					style={{
						width: '22px',
						height: '22px',
						border: '1.5px solid rgba(0, 212, 255, 0.70)',
						borderRadius: '50%',
						opacity: 0,
					}}
				>
					{/* Crosshair */}
					<div ref={crosshairRef} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0, transition: 'opacity 200ms' }}>
						<div className="absolute w-[8px] h-[0.5px] bg-[rgba(0,212,255,0.30)] rotate-45 transform translate-x-[-4px] translate-y-[-4px]" />
						<div className="absolute w-[8px] h-[0.5px] bg-[rgba(0,212,255,0.30)] rotate-[-45deg] transform translate-x-[4px] translate-y-[-4px]" />
						<div className="absolute w-[8px] h-[0.5px] bg-[rgba(0,212,255,0.30)] rotate-45 transform translate-x-[4px] translate-y-[4px]" />
						<div className="absolute w-[8px] h-[0.5px] bg-[rgba(0,212,255,0.30)] rotate-[-45deg] transform translate-x-[-4px] translate-y-[4px]" />
					</div>
					
					{/* View Text */}
					<div ref={viewTextRef} className="absolute font-mono text-[0.5rem] tracking-[0.2em] text-[rgba(0,212,255,0.70)]" style={{ opacity: 0, transition: 'opacity 200ms' }}>
						VIEW
					</div>
				</div>

				{/* Dot A */}
				<div
					ref={dotRef}
					className="absolute rounded-full bg-white will-change-transform"
					style={{
						width: '5px',
						height: '5px',
						opacity: 0,
						transition: 'transform 60ms ease',
					}}
				/>
			</div>
		</>
	);
}
