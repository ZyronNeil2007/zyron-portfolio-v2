# 🌟 Zyron Neil Bautista — Personal Portfolio

![Version](https://img.shields.io/badge/version-v2.1.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-success.svg)

> A personal portfolio website showcasing my projects, skills, and background as a CS student and creative developer — built with **pure HTML, CSS, and JavaScript**.

---

## 🔗 Live Site

**[zyronneil2007.github.io/zyron-portfolio-v2](https://zyronneil2007.github.io/zyron-portfolio-v2/)** — hosted on GitHub Pages

---

## ✨ Features

### Core
- **Hero Section** — Animated typewriter effect with a profile image and call-to-action buttons
- **About Section** — Bento-grid layout with an intro, skills, what I do, and fun facts
- **Journey Timeline** — Interactive vertical timeline from 2019 to Present
- **Skills Progress Bars** — Animated proficiency indicators across Programming, Web Dev, Tools & Design
- **Projects Section** — Filterable card-based showcase (Web Dev · Layout & UI · Logic · Research · Business · Presentation)
- **Visual Design Gallery** — CSS Masonry grid with an integrated lightbox viewer
- **Case Study Modals** — Clickable project cards that open frosted-glass detail modals
- **Contact Section** — Email CTA — *"Let's build something great."*

### Design System
- **Liquid Glass 2.0** — Apple-inspired glassmorphism with `backdrop-filter: blur()`, specular edge highlights, and 28px squircle geometry
- **Adaptive Theme Glass** — Specialized glass physics for Light Mode (carved/etched) and Dark Mode (glowing/frosted)
- **Theme Toggle** — Light/Dark mode with `localStorage` persistence
- **Ambient Background Glows** — Fixed, blurred radial shapes that shift with the active theme
- **3D Tilt Effect** — Mouse-tracking perspective transforms on bento boxes and project cards

### Interactions
- **GSAP Magnetic Cursor** — Elastic hover micro-interactions on CTA buttons
- **Multi-Layer Parallax** — Scroll-scrubbed parallax on hero ambient orbs and floating skill cards
- **Scroll Reveal Animations** — `IntersectionObserver`-based entrance effects
- **Matter.js Easter Egg** — Hidden anti-gravity physics simulation (click the logo 3× to trigger!)
- **Floating Tab Bar** — Apple News-style mobile bottom navigation
- **Lightbox Gallery** — Click-to-expand image viewer for visual design pieces
- **Fully Responsive** — Adapts to mobile, tablet, and desktop viewports

### Accessibility & Performance
- **Keyboard Navigation** — "Skip to main content" link for keyboard users
- **Reduced Motion Support** — Full CSS/JS compliance with OS-level `prefers-reduced-motion` settings
- **GPU Compositing** — `will-change: transform` hints and `font-display: swap` for optimal loading and smooth 60fps rendering

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, CSS Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Physics | [Matter.js](https://brm.io/matter-js/) (CDN) |
| Animation | [GSAP & ScrollTrigger](https://greensock.com/gsap/) (CDN) |
| Icons | [Phosphor Icons](https://phosphoricons.com/) |
| Fonts | SF Pro (local `@font-face`) |

> No frameworks. No build tools. Clean, lightweight vanilla web tech.

---

## 📁 Project Structure

```
my-portfolio/
├── index.html          # All sections and page structure
├── style.css           # Design tokens, liquid glass system, responsive layout
├── script.js           # Theme toggle, typewriter, scroll animations, tilt, Matter.js
├── image/              # Portfolio images, logo, screenshots
│   ├── logo.png
│   ├── neil_god.png
│   ├── minecraft_screenshot.jpg
│   ├── quiz.png
│   ├── NOT_FINAL.jpg
│   ├── get_ready.jpg
│   ├── me_booth.jpg
│   ├── Comscie_ID back.svg
│   └── Comscie_ID front.svg
├── components/         # Workspace config
└── README.md           # This file
```

---

## 🎨 Design Highlights

- **Liquid Glass 2.0** — High-fidelity backdrop blurs and layered inset box-shadows for realistic specular reflection
- **Squircle Geometry** — 28px border-radius across all containers for a smooth, premium Apple-like feel
- **Theme-Specific Speculars** — Light mode uses a "carved" dark highlight; dark mode uses a vibrant white light-catch
- **Universal Glass System** — Cohesive styling applied to bento boxes, buttons, pills, tags, and media elements
- **Ambient Background Glows** — Fixed, blurred radial shapes that shift based on the current theme
- **Dynamic 3D Tilting** — Interactive perspective transforms responding to mouse movement

---

## ⚡ Performance

- Scroll handler throttled via `requestAnimationFrame` (max 60fps)
- `passive: true` on scroll listeners for compositor-thread scrolling
- `transform: translateZ(0)` on fixed/glass elements for GPU compositing
- `IntersectionObserver` for scroll-reveal (zero scroll event cost)
- `will-change` hints on animated elements

---

## 🗂️ Sections

| Section | Description |
|---|---|
| **Home** | Hero with typewriter intro and profile image |
| **About** | Who I am, what I do, technical skills, and fun facts |
| **My Journey** | Vertical scrolling timeline of my tech & creative eras (2019 → Present) |
| **Projects** | Filterable portfolio with 6 categories |
| **Visual Design** | Masonry gallery of posters, pubmats, and layouts |
| **Contact** | Email CTA — *"Let's build something great."* |

---

## 🚀 Getting Started

No installation required. Just open `index.html` in any modern browser:

```bash
# Clone the repository
git clone https://github.com/ZyronNeil2007/zyron-portfolio-v2.git

# Open in browser
cd zyron-portfolio-v2
start index.html   # Windows
open index.html    # macOS
```

---

## 📬 Contact

| Platform | Link |
|---|---|
| ✉️ Email | [zyronneilbautista10@gmail.com](mailto:zyronneilbautista10@gmail.com) |
| 📘 Facebook | [facebook.com/share/18ZFsaeo4S](https://www.facebook.com/share/18ZFsaeo4S/) |
| 📸 Instagram | [@zyronnei10](https://www.instagram.com/zyronnei10/) |
| 🎵 TikTok | [@zyron_neil](https://www.tiktok.com/@zyron_neil) |
| 🐙 GitHub | [ZyronNeil2007](https://github.com/ZyronNeil2007) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Designed & Developed by <strong>Zyron Neil Bautista</strong> © 2026</p>
