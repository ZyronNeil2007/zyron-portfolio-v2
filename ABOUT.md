# About the Project

**Current Version:** v2.1.0

## Description
This is the personal portfolio of Zyron Neil Bautista — a Computer Science student and creative developer. This project serves as a showcase of my skills, projects, and professional background.

The portfolio is built with a focus on performance and visual aesthetics, utilizing pure HTML, CSS, and JavaScript. It features a custom "Liquid Glass" design system, scroll reveal animations, and interactive elements without relying on heavy frontend frameworks.

## Version Status
- **v2.1.0** (Current): This release brings major UI/UX Pro Max enhancements, complex GSAP animations, and critical accessibility updates.
- **v2.0.0**: Major 2.0 release of the portfolio.

## Changelog & Release Notes (v2.1.0)

### 🎉 New Features & Animations
- **GSAP & ScrollTrigger Integration:** Implemented complex, GPU-accelerated motion effects.
- **Magnetic Cursor:** High-end elastic hover interaction on primary CTA buttons using GSAP `quickTo`.
- **Multi-Layer Parallax:** Applied custom scroll-scrubbed parallax to hero ambient orbs and floating skill cards, adding significant visual depth.

### ♿ Accessibility & UX Enhancements
- **Skip-to-Main Link:** Added a top-level skip link allowing keyboard users to bypass navigation.
- **Full `prefers-reduced-motion` Compliance:** Complete respect for OS settings—disabling GSAP effects, CSS continuous animations, and typing cursor blinks for users who prefer reduced motion.
- **GPU Compositing:** Added `will-change: transform` hints on animated elements (orbs, buttons) to force compositor-thread rendering, avoiding layout repaints.
- **Font Loading:** Ensured `font-display: swap` is used to prevent Flash of Invisible Text (FOIT).

## Changelog & Release Notes (v2.0.0)

### 🎉 New Features
- **Liquid Glass 2.0:** High-fidelity Apple-inspired UI system with adaptive theme speculars.
- **AI Tagline Generator:** Integration with Gemini API to power dynamic taglines.
- **Matter.js Easter Egg:** Hidden anti-gravity physics simulation triggerable via the logo.
- **Interactive UI:** Dynamic 3D tilting on cards, scroll reveal animations, and a floating bottom navigation bar for mobile.

### 🛠️ Breaking Changes & Refactors
- **Architecture Refactor:** Successfully reverted experimental Vite/React migration back to pure, lightweight HTML/CSS/JS for better performance and simplicity.
- **GitHub Pages Configuration:** Removed complex `static.yml` and `CNAME` handling, supporting default `github.io` domain hosting natively.

### 🐛 Bug Fixes
- Fixed syntax error in `script.js` that caused scripts to break.
- Fixed visibility issues in the Fun Facts section.
- Fixed paragraph formatting errors in the portfolio section.
- Corrected live site URL and optimized image assets.
