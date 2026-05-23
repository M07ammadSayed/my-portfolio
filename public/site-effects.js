(() => {
	"use strict";

	const onReady = (callback) => {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", callback, { once: true });
			return;
		}

		callback();
	};

	const getVariable = (name) =>
		getComputedStyle(document.documentElement).getPropertyValue(name).trim();

	const parseColor = (value) => {
		const color = value.trim();
		const hex = color.startsWith("#") ? color.slice(1) : color;

		if (hex.length === 6) {
			return [
				Number.parseInt(hex.slice(0, 2), 16),
				Number.parseInt(hex.slice(2, 4), 16),
				Number.parseInt(hex.slice(4, 6), 16),
			];
		}

		const rgb = color.match(/\d+/g)?.map(Number);
		return rgb && rgb.length >= 3 ? [rgb[0], rgb[1], rgb[2]] : [255, 255, 255];
	};

	const randomBetween = (min, max) => min + Math.random() * (max - min);

	const scrollToSection = (id) => {
		const target = document.getElementById(id);
		if (target) target.scrollIntoView({ behavior: "smooth" });
	};

	function setupNavigation() {
		const nav = document.querySelector("[data-site-nav]");
		const menuButton = document.querySelector("[data-menu-button]");
		const mobileMenu = document.querySelector("[data-mobile-menu]");
		const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
		const scrollTop = document.querySelector("[data-scroll-top]");

		const setMenuOpen = (isOpen) => {
			if (!menuButton || !mobileMenu) return;

			menuButton.classList.toggle("is-open", isOpen);
			menuButton.setAttribute("aria-expanded", String(isOpen));
			menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
			mobileMenu.classList.toggle("is-open", isOpen);
			document.body.classList.toggle("menu-open", isOpen);
		};

		const setActive = (id) => {
			navLinks.forEach((link) => {
				const isActive = link.getAttribute("data-nav-link") === id;
				link.classList.toggle("is-active", isActive);
				if (isActive) link.setAttribute("aria-current", "page");
				else link.removeAttribute("aria-current");
			});
		};

		const updateScrollState = () => {
			if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
		};

		updateScrollState();
		window.addEventListener("scroll", updateScrollState, { passive: true });

		if (scrollTop) {
			scrollTop.addEventListener("click", () => {
				setMenuOpen(false);
				window.scrollTo({ top: 0, behavior: "smooth" });
			});
		}

		if (menuButton) {
			menuButton.addEventListener("click", () => {
				setMenuOpen(!menuButton.classList.contains("is-open"));
			});
		}

		navLinks.forEach((link) => {
			link.addEventListener("click", (event) => {
				const id = link.getAttribute("data-nav-link");
				if (!id) return;

				event.preventDefault();
				setMenuOpen(false);
				scrollToSection(id);
			});
		});

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (visible?.target?.id) setActive(visible.target.id);
			},
			{
				rootMargin: "-20% 0px -55% 0px",
				threshold: [0.15, 0.3, 0.6],
			},
		);

		["about", "skills", "projects", "contact"].forEach((id) => {
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		});
	}

	function setupHero() {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const word = document.querySelector("[data-rotating-word]");
		const scrollIndicator = document.querySelector("[data-scroll-target]");

		if (word && !reducedMotion) {
			const words = (word.getAttribute("data-words") || "")
				.split("|")
				.filter(Boolean);
			let index = 0;

			if (words.length > 1) {
				window.setInterval(() => {
					word.classList.add("is-exiting");
					window.setTimeout(() => {
						index = (index + 1) % words.length;
						word.textContent = words[index];
						word.classList.remove("is-exiting");
					}, 250);
				}, 3050);
			}
		}

		if (scrollIndicator) {
			scrollIndicator.addEventListener("click", () => {
				const id = scrollIndicator.getAttribute("data-scroll-target");
				if (id) scrollToSection(id);
			});

			const updateIndicator = () => {
				scrollIndicator.classList.toggle("is-hidden", window.scrollY > 100);
			};

			updateIndicator();
			window.addEventListener("scroll", updateIndicator, { passive: true });
		}
	}

	function setupReveal() {
		const items = Array.from(document.querySelectorAll(".reveal"));
		if (!items.length) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reducedMotion) {
			items.forEach((item) => item.classList.add("is-visible"));
			return;
		}

		items.forEach((item) => item.classList.add("will-reveal"));

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;

					const target = entry.target;
					target.classList.add("is-visible");
					target.addEventListener(
						"transitionend",
						() => target.classList.remove("will-reveal"),
						{ once: true },
					);
					observer.unobserve(target);
				});
			},
			{ threshold: 0.12 },
		);

		items.forEach((item) => observer.observe(item));
	}

	function setupParallax() {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reducedMotion) return;

		let ticking = false;

		const updateParallax = () => {
			const scrollY = window.scrollY;
			
			const particleCanvasA = document.querySelector('.canvas-a');
			const particleCanvasB = document.querySelector('.canvas-b');
			const grainLayer = document.querySelector('[data-grain-layer]');
			const contactSection = document.querySelector('[data-parallax="contact-section"]');
			const rightColumns = document.querySelectorAll('[data-parallax-offset="15"]');

			if (particleCanvasA) particleCanvasA.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
			if (particleCanvasB) particleCanvasB.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
			if (grainLayer) grainLayer.style.transform = `translate3d(0, ${scrollY * 0.6}px, 0)`;
			
			if (contactSection) {
				contactSection.style.transform = `translate3d(0, ${scrollY * -0.15}px, 0)`;
			}

			rightColumns.forEach(el => {
				const rect = el.getBoundingClientRect();
				if (rect.top < window.innerHeight && rect.bottom > 0) {
					const amount = (scrollY * 0.15); 
					el.style.transform = `translate3d(0, ${amount}px, 0)`;
				}
			});

			ticking = false;
		};

		window.addEventListener('scroll', () => {
			if (!ticking) {
				window.requestAnimationFrame(updateParallax);
				ticking = true;
			}
		}, { passive: true });
	}

	function setupParticles() {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reducedMotion) return;

		const shell = document.querySelector(".site-shell") || document.body;
		
		const canvasA = document.createElement("canvas");
		canvasA.className = "particle-canvas canvas-a";
		canvasA.style.zIndex = "0";
		canvasA.setAttribute("aria-hidden", "true");
		shell.prepend(canvasA);

		const canvasB = document.createElement("canvas");
		canvasB.className = "particle-canvas canvas-b";
		canvasB.style.zIndex = "1";
		canvasB.setAttribute("aria-hidden", "true");
		shell.prepend(canvasB);

		const contextA = canvasA.getContext("2d", { alpha: true });
		const contextB = canvasB.getContext("2d", { alpha: true });
		if (!contextA || !contextB) return;

		const primary = parseColor(getVariable("--accent-primary"));
		const white = parseColor(getVariable("--particle-white"));
		
		let particlesA = [];
		let particlesB = [];
		let width = 0;
		let height = 0;
		let animationFrame = 0;
		let resizeTimer = 0;
		let mouseX = -1000;
		let mouseY = -1000;
		let previousMouseX = mouseX;
		let previousMouseY = mouseY;
		let velocity = 0;

		const isMobile = () => window.innerWidth < 768;
		const getCountA = () => isMobile() ? 40 : 80;
		const getCountB = () => isMobile() ? 18 : 40;

		const resize = () => {
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			
			canvasA.width = Math.floor(width * ratio);
			canvasA.height = Math.floor(height * ratio);
			canvasA.style.width = `${width}px`;
			canvasA.style.height = `${height}px`;
			contextA.setTransform(ratio, 0, 0, ratio, 0, 0);

			canvasB.width = Math.floor(width * ratio);
			canvasB.height = Math.floor(height * ratio);
			canvasB.style.width = `${width}px`;
			canvasB.style.height = `${height}px`;
			contextB.setTransform(ratio, 0, 0, ratio, 0, 0);

			particlesA = Array.from({ length: getCountA() }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				size: randomBetween(1, 1.5),
				opacity: randomBetween(0.08, 0.20),
				color: white,
				vx: randomBetween(-0.05, 0.05),
				vy: randomBetween(-0.05, 0.05)
			}));

			particlesB = Array.from({ length: getCountB() }, () => {
				const angle = Math.random() * Math.PI * 2;
				const speed = randomBetween(0.15, 0.3);
				return {
					baseX: Math.random() * width,
					baseY: Math.random() * height,
					offsetX: 0,
					offsetY: 0,
					x: 0,
					y: 0,
					size: randomBetween(1.5, 2.5),
					baseOpacity: randomBetween(0.15, 0.35),
					activeOpacity: 0,
					color: primary,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed
				};
			});
			particlesB.forEach(p => { p.x = p.baseX; p.y = p.baseY; p.activeOpacity = p.baseOpacity; });
		};

		const scheduleResize = () => {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(resize, 150);
		};

		const handlePointerMove = (event) => {
			previousMouseX = mouseX;
			previousMouseY = mouseY;
			mouseX = event.clientX;
			mouseY = event.clientY;
			velocity = Math.hypot(mouseX - previousMouseX, mouseY - previousMouseY);
		};

		const handlePointerLeave = () => {
			mouseX = -1000;
			mouseY = -1000;
			velocity = 0;
		};

		const draw = () => {
			animationFrame = window.requestAnimationFrame(draw);
			if (document.hidden) return;

			contextA.clearRect(0, 0, width, height);
			contextB.clearRect(0, 0, width, height);

			for (const p of particlesA) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				if (p.y < 0) p.y = height;
				if (p.y > height) p.y = 0;

				contextA.beginPath();
				contextA.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				contextA.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.opacity})`;
				contextA.fill();
			}

			for (const p of particlesB) {
				p.baseX += p.vx;
				p.baseY += p.vy;
				if (p.baseX < 0) p.baseX = width;
				if (p.baseX > width) p.baseX = 0;
				if (p.baseY < 0) p.baseY = height;
				if (p.baseY > height) p.baseY = 0;

				const dx = p.baseX - mouseX;
				const dy = p.baseY - mouseY;
				const distance = Math.hypot(dx, dy);
				const inRadius = distance < 100;
				const force = inRadius ? 1 - distance / 100 : 0;
				const fastPointer = velocity > 8 && inRadius;
				
				const targetOffset = force * 30;
				const angle = Math.atan2(dy, dx);
				const targetX = Math.cos(angle) * targetOffset;
				const targetY = Math.sin(angle) * targetOffset;
				
				const spring = 0.05;
				p.offsetX += (targetX - p.offsetX) * spring;
				p.offsetY += (targetY - p.offsetY) * spring;
				p.x = p.baseX + p.offsetX;
				p.y = p.baseY + p.offsetY;

				let targetOpacity = p.baseOpacity;
				if (fastPointer) {
					targetOpacity = Math.min(1, p.baseOpacity * 2);
					p.activeOpacity = targetOpacity;
				} else {
					p.activeOpacity += (targetOpacity - p.activeOpacity) * 0.02;
				}

				contextB.beginPath();
				contextB.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				contextB.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.activeOpacity})`;
				contextB.fill();
			}

			for (let i = 0; i < particlesB.length; i += 1) {
				const a = particlesB[i];
				for (let j = i + 1; j < particlesB.length; j += 1) {
					const b = particlesB[j];
					const dist = Math.hypot(a.x - b.x, a.y - b.y);
					if (dist < 85) {
						contextB.beginPath();
						contextB.moveTo(a.x, a.y);
						contextB.lineTo(b.x, b.y);
						contextB.strokeStyle = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.08)`;
						contextB.lineWidth = 0.5;
						contextB.stroke();
					}
				}

				const cursorDist = Math.hypot(a.x - mouseX, a.y - mouseY);
				if (cursorDist < 65) {
					contextB.beginPath();
					contextB.moveTo(a.x, a.y);
					contextB.lineTo(mouseX, mouseY);
					contextB.strokeStyle = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.15)`;
					contextB.lineWidth = 0.5;
					contextB.stroke();
				}
			}
		};

		canvasA.style.opacity = 0;
		canvasA.style.transition = "opacity 400ms ease-in";
		canvasB.style.opacity = 0;
		canvasB.style.transition = "opacity 400ms ease-in 150ms";

		resize();
		draw();
		
		setTimeout(() => {
			canvasA.style.opacity = 1;
			canvasB.style.opacity = 1;
		}, 50);

		window.addEventListener("resize", scheduleResize, { passive: true });
		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
		window.addEventListener("pagehide", () => {
			window.clearTimeout(resizeTimer);
			window.cancelAnimationFrame(animationFrame);
		});
	}

	function setupCursor() {
		const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (coarsePointer || reducedMotion) return;

		const root = document.createElement("div");
		root.className = "cursor-root";
		root.setAttribute("aria-hidden", "true");
		root.innerHTML = '<div class="cursor-dot"></div><div class="cursor-inner"></div><div class="cursor-outer"></div>';
		document.body.append(root);

		let targetX = -100;
		let targetY = -100;
		let innerX = -100;
		let innerY = -100;
		let outerX = -100;
		let outerY = -100;

		window.addEventListener(
			"pointermove",
			(event) => {
				targetX = event.clientX;
				targetY = event.clientY;
				root.style.setProperty("--cursor-x", `${targetX}px`);
				root.style.setProperty("--cursor-y", `${targetY}px`);
			},
			{ passive: true },
		);

		const lerp = (start, end, factor) => start + (end - start) * factor;

		const render = () => {
			innerX = lerp(innerX, targetX, 0.15);
			innerY = lerp(innerY, targetY, 0.15);
			outerX = lerp(outerX, targetX, 0.07);
			outerY = lerp(outerY, targetY, 0.07);

			root.style.setProperty("--inner-x", `${innerX}px`);
			root.style.setProperty("--inner-y", `${innerY}px`);
			root.style.setProperty("--outer-x", `${outerX}px`);
			root.style.setProperty("--outer-y", `${outerY}px`);

			window.requestAnimationFrame(render);
		};
		window.requestAnimationFrame(render);

		window.addEventListener(
			"pointerover",
			(event) => {
				const targetElement = event.target;
				const interactive = targetElement.closest?.("a, button, [role='button']");
				const text = targetElement.closest?.("p, span, h1, h2, h3");
				root.classList.toggle("is-interactive", Boolean(interactive));
				root.classList.toggle("is-text", !interactive && Boolean(text));
			},
			{ passive: true },
		);

		window.addEventListener("pointerdown", () => root.classList.add("is-down"), {
			passive: true,
		});
		window.addEventListener("pointerup", () => root.classList.remove("is-down"), {
			passive: true,
		});
	}

	function registerServiceWorker() {
		if (!("serviceWorker" in navigator)) return;

		window.addEventListener(
			"load",
			() => {
				navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
			},
			{ once: true },
		);
	}

	onReady(() => {
		setupNavigation();
		setupHero();
		setupReveal();
		setupCursor();
		setupParallax();
		registerServiceWorker();

		let particlesStarted = false;
		const startParticles = () => {
			if (particlesStarted) return;

			particlesStarted = true;
			setupParticles();
		};

		window.addEventListener("pointermove", startParticles, {
			once: true,
			passive: true,
		});
		window.addEventListener("scroll", startParticles, {
			once: true,
			passive: true,
		});
		window.addEventListener("touchstart", startParticles, {
			once: true,
			passive: true,
		});
		window.setTimeout(startParticles, 12000);
	});
})();
