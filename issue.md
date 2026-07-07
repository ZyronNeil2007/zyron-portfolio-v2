# Issue Tracking & Templates

## Version References
Current Version: **v2.1.0**

---

## 📝 Bug Report Template
**Describe the bug:**
A clear and concise description of what the bug is.

**To Reproduce:**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior:**
A clear and concise description of what you expected to happen.

**Desktop (please complete the following information):**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]

---

## 🚀 Feature Request Template
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like:**
A clear and concise description of what you want to happen.

---

## ✅ Closed Issues (v2.1.0)

This version bump (v2.1.0) integrates comprehensive UI/UX audit enhancements, focusing on advanced GSAP animations and accessibility fixes.

### Resolved Items
- **Feature:** Added GSAP and ScrollTrigger for complex animations.
- **Feature:** Implemented magnetic cursor on primary CTA buttons.
- **Feature:** Added multi-layer parallax scrolling to hero ambient orbs and floating skill cards.
- **Fix (Accessibility):** Implemented a "Skip to main content" link for keyboard users.
- **Fix (Accessibility):** Ensured full `prefers-reduced-motion` compliance across all CSS and JS animations.
- **Optimization:** Added `will-change: transform` to heavily animated elements for GPU compositing.

---

## ✅ Closed Issues (v2.0.1)

This version bump formalizes the `v2.0.1` patch which includes UI/UX refinements for the hero section.

### Resolved Items
- **Fixed:** Removed the "Open to Opportunities" availability badge from the hero section.
- **Fixed:** Reordered the hero layout on mobile to display the profile image above the text.
- **Fixed:** Redesigned the profile image on mobile with a glowing accent ring and better scaling for small screens.

---

## ✅ Closed Issues (v2.0.0)

This version bump formalizes our second official semantic release (`v2.0.0`) encompassing all major updates and bug fixes tracked up to this point.

### Resolved Items
- **Fixed:** Syntax error in `script.js` preventing some UI interactions.
- **Fixed:** Visibility issues with "Fun Facts" section and scroll performance optimization.
- **Fixed:** GitHub Pages deployment issues (removed invalid CNAME).
- **Fixed:** Paragraph symbol errors and missing photos in portfolio section.
- **Closed:** Removed static.yml workflow that deployed raw source instead of built dist.
