# Muhammad Sayyid — Portfolio

A high-performance, cinematic portfolio for Muhammad Sayyid, Application Security Engineer & Full-Stack Developer.

**Live:** https://muhammad-sayyid.vercel.app

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 + inline CSS tokens
- **Animations:** Framer Motion
- **Fonts:** Syne (display/headings) + Inter (body) + JetBrains Mono (code)
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics + Speed Insights
- **PWA:** Service Worker + Web App Manifest

---

## Project Structure

```
src/
  app/
    globals.css        — Design tokens, fluid typography, scrollbar, animations
    layout.tsx         — Root layout, font loading (Syne + Inter + JetBrains Mono)
    page.tsx           — Page composition
  components/
    PageManager.tsx    — Loader gate, scroll restoration, dynamic imports
    PremiumLoader.tsx  — Entrance loader (spinner + progress bar)
    NavBar.tsx         — Floating pill nav with scroll-aware glass background
    Hero.tsx           — Hero section with magnetic CTAs, DigitalTitle
    DigitalTitle.tsx   — Animated rotating title text
    Skills.tsx         — 4-column skill cards
    Projects.tsx       — 3-column project cards
    ProjectCard.tsx    — Individual project card with TiltCard
    Footer.tsx         — Contact / social links section
    TiltCard.tsx       — Mouse-tracking 3D tilt card with spotlight
    SectionHeader.tsx  — Scramble-text section heading
    SocialLink.tsx     — Accessible social icon links
    CustomCursor.tsx   — Particle field + lerp-interpolated cursor (xl+ only)
    VisualBackground.tsx — Fixed ambient glows + grid + meteors
    Meteors.tsx        — Animated meteor shower
    ScrollProgress.tsx — Top scroll progress bar
    ScrollToTop.tsx    — Floating scroll-to-top button with SVG ring
```

---

## Design System

### Color Tokens (CSS custom properties)
| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `#080810` | Page background |
| `--color-surface` | `#0d0d1a` | Card surfaces |
| `--color-border` | `#1e2a3a` | Borders |
| `--color-text-primary` | `#ffffff` | Headings |
| `--color-text-secondary` | `#94a3b8` | Body text |
| `--color-accent` | `#06b6d4` | Primary accent (cyan) |
| `--color-accent-secondary` | `#a855f7` | Secondary accent (purple) |

### Typography
- **Display font:** Syne (800 weight for headings) — fluid clamp scale
- **Body font:** Inter — 1.75 line-height, 16px base
- **Mono font:** JetBrains Mono — labels, code, tags

### Animation Philosophy
- All scroll-triggered: `whileInView` with `once: true`, ease `[0.16, 1, 0.3, 1]`
- Duration range: 0.4s–0.7s
- No spin animations on decorative elements (only in loader, which is justified)
- Opacity-only ambient animations (`breathe` keyframe) — no layout-triggering props
- Hover: `translateY(-2px)`, box-shadow expansion — never width/height changes

---

## Running Locally

```bash
npm install
npm run dev    # → http://localhost:5000
```

## Build

```bash
npm run build --webpack
```

---

## Deployment

Deployed via Vercel. CSP headers configured in `next.config.mjs`.
Note: External analytics scripts (GA, Vercel) are blocked in dev by CSP — this is expected and pre-existing.
