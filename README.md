# 🌟 Zyron Neil Bautista — Personal Portfolio

> A personal portfolio website showcasing my projects, skills, and background as a CS student and creative developer.

![Portfolio Preview](./Gemini_Generated_Image_fnpzccfnpzccfnpz_.png)

---

## 🔗 Live Site

**[zyron-portfolio-v2](https://zyronneil2007.github.io/zyron-portfolio-v2/)** — hosted on GitHub Pages 

---

## ✨ Features

- **Hero Section** — Animated typewriter effect with a profile image and call-to-action buttons
- **About Section** — Bento-grid layout with an intro, skills, what I do, and fun facts
- **Journey Timeline** — An interactive, scrolling timeline outlining my path from 2019 to Present
- **Skills Progress Bars** — Animated skill level indicators tracking technical proficiency
- **Projects Section** — Card-based project showcase with tech tags and a category **filtering system**
- **Visual Design Gallery** — A CSS Masonry grid for pubmats and layouts with an integrated **lightbox**
- **Case Study Modals** — Clickable project cards that open detailed, frosted-glass modals
- **Contact Section** — Simple, focused call-to-action with email link
- **Theme Toggle** — Light/Dark mode with preference persistence via `localStorage`
- **Liquid Glass 2.0 UI** — High-fidelity Apple-inspired glassmorphism with `backdrop-filter: blur(24px)`, specular edge highlights, and 28px squircle geometry.
- **Adaptive Theme Glass** — Specialized glass physics for Light Mode (carved/etched look) and Dark Mode (glowing/frosted look).
- **Scroll Reveal Animations** — Elements animate in using `IntersectionObserver`.
- **3D Tilt Effect** — Vanilla JS mouse-tracking perspective transforms on bento boxes and project cards.
- **Matter.js Easter Egg** — A hidden anti-gravity physics simulation (click the logo 3 times to trigger!).
- **Floating Tab Bar** — Mobile-friendly bottom navigation.
- **Fully Responsive** — Adapts to mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, CSS Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Physics | [Matter.js](https://brm.io/matter-js/) (CDN) |
| Icons | [Phosphor Icons](https://phosphoricons.com/) |
| Fonts | [Inter — Google Fonts](https://fonts.google.com/specimen/Inter) |

> No complex frameworks. No build tools. Built with clean, lightweight vanilla web tech.

---

## 📁 Project Structure

```
my-portfolio/
├── index.html          # Main HTML — all sections and structure
├── style.css           # All styles, design tokens, and responsive layout
├── script.js           # Theme toggle, typewriter, scroll animations, liquid glass
├── components/         # Additional component assets (if any)
└── README.md           # This file
```

---

## 🎨 Design Highlights

- **Liquid Glass 2.0** — Replaced legacy gradients with high-fidelity backdrop blurs and layered inset box-shadows for realistic specular reflection.
- **Squircle Geometry** — 28px border-radius applied across all containers for a smooth, premium Apple-like feel.
- **Theme-Specific Speculars** — Light mode features a "carved" dark specular highlight, while dark mode uses a vibrant white light-catch.
- **Universal Glass System** — Cohesive styling applied to bento boxes, buttons, pills, tags, and even media screenshots.
- **Ambient Background Glows** — Fixed, blurred radial shapes that shift based on the current theme.
- **Dynamic 3D Tilting** — Interactive perspective transforms that respond seamlessly to mouse movement.

---

## ⚡ Performance Optimizations

- Scroll handler throttled via `requestAnimationFrame` (max 60fps)
- `passive: true` on scroll listeners for compositor-thread scrolling
- Liquid Glass SVG filters cached in a `Map` — never regenerated for the same dimensions
- `transform: translateZ(0)` on fixed/glass elements to promote GPU compositor layers
- `IntersectionObserver` for scroll-reveal (zero scroll event cost)
- `will-change` hints on animated elements

---

## 🗂️ Sections

| Section | Description |
|---|---|
| **Home** | Hero with typewriter intro and profile image |
| **About** | Who I am, what I do, technical skills, and fun facts |
| **My Journey** | A vertical scrolling timeline of my tech & creative eras |
| **Projects** | Filterable portfolio of selected web systems |
| **Visual Design** | Masonry gallery of posters, pubmats, and layouts |
| **Contact** | Email CTA — *"Let's build something great."* |

---

## 🚀 Getting Started

No installation needed. Just open `index.html` in any modern browser:

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
