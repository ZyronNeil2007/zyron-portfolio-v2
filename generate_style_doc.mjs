import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  ShadingType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
} from "docx";
import { writeFileSync } from "fs";

// ─── Colour palette ───────────────────────────────────────────────────────────
const ACCENT   = "D97706";   // amber
const DARK     = "0F172A";   // slate-900
const MID      = "475569";   // slate-600
const LIGHT    = "F8FAFC";   // slate-50
const CODE_BG  = "1E293B";   // slate-800
const CODE_FG  = "E2E8F0";   // slate-200
const DIVIDER  = "E2E8F0";

// ─── Helper: mono code run ────────────────────────────────────────────────────
const codeRun = (text) =>
  new TextRun({ text, font: "Courier New", size: 18, color: CODE_FG });

// ─── Helper: code block paragraph ─────────────────────────────────────────────
const codeParagraph = (text) =>
  new Paragraph({
    children: [codeRun(text)],
    shading:  { type: ShadingType.SOLID, color: CODE_BG, fill: CODE_BG },
    spacing:  { before: 0, after: 0 },
    indent:   { left: 360 },
  });

// Build an array of codeParagraph lines from a multiline string
const codeBlock = (raw) =>
  raw.split("\n").map((line) => codeParagraph(line));

// ─── Helper: section heading ──────────────────────────────────────────────────
const h1 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 120 },
    run: { color: DARK, bold: true },
  });

const h2 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 100 },
    run: { color: ACCENT, bold: true },
  });

const h3 = (text) =>
  new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 80 },
    run: { color: MID },
  });

// ─── Helper: body paragraph ───────────────────────────────────────────────────
const body = (text) =>
  new Paragraph({
    children: [new TextRun({ text, size: 22, color: DARK })],
    spacing: { before: 80, after: 120 },
  });

// ─── Helper: accent bullet ────────────────────────────────────────────────────
const bullet = (label, desc) =>
  new Paragraph({
    children: [
      new TextRun({ text: `• ${label}: `, bold: true, size: 22, color: ACCENT }),
      new TextRun({ text: desc, size: 22, color: DARK }),
    ],
    spacing: { before: 60, after: 80 },
    indent:  { left: 360 },
  });

// ─── Helper: thin divider ────────────────────────────────────────────────────
const divider = () =>
  new Paragraph({
    border: { bottom: { color: DIVIDER, style: BorderStyle.SINGLE, size: 4 } },
    spacing: { before: 200, after: 200 },
  });

// ─── CSS snippets ─────────────────────────────────────────────────────────────

const cssLiquidGlass = `/* Apple-inspired Liquid Glass Class */
.liquid-glass {
    /* LIGHT MODE — Dark Specular Highlights */
    background: rgba(255, 255, 255, 0.5) !important;
    backdrop-filter: blur(20px) saturate(160%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
    border-radius: 28px !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow:
        inset 0 1.5px 2px rgba(0, 0, 0, 0.1),    /* top specular (dark) */
        inset 0 -1px 2px rgba(255, 255, 255, 0.3), /* bottom rim light    */
        0 10px 30px rgba(0, 0, 0, 0.06) !important; /* drop shadow         */
    color: var(--text-primary);
}

/* DARK MODE override */
body.dark .liquid-glass {
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    box-shadow:
        inset 0 1.5px 2px rgba(255, 255, 255, 0.3),  /* top specular (white) */
        inset 0 -1px 2px rgba(255, 255, 255, 0.02),   /* bottom rim           */
        0 12px 40px rgba(0, 0, 0, 0.3) !important;    /* deep drop shadow     */
}`;

const cssFakeGlass = `/* ── Fake Glass Variables (no backdrop-filter cost) ── */
:root {
    --fake-glass-bg:        rgba(255, 255, 255, 0.62);
    --fake-glass-border:    rgba(15, 23, 42, 0.10);
    --fake-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.80);
    --fake-glass-shadow:
        0 8px 32px rgba(15, 23, 42, 0.08),
        0 1px 0 rgba(255, 255, 255, 0.6) inset;
}

body.dark {
    --fake-glass-bg:        rgba(30, 30, 30, 0.65);
    --fake-glass-border:    rgba(255, 255, 255, 0.10);
    --fake-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    --fake-glass-shadow:
        0 8px 32px rgba(0, 0, 0, 0.25),
        0 1px 0 rgba(255, 255, 255, 0.06) inset;
}`;

const cssNavbarBlur = `/* ── Navbar Fading Blur Backdrop ── */
.top-nav-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    z-index: 990;
    pointer-events: none;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    /* Fade the blur out smoothly downward */
    mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 0) 100%
    );
}`;

const cssBgGlow = `/* ── Ambient Background Glows ── */
.bg-glow {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transition: opacity 0.5s ease;
}

.glow-1 {  /* Amber — top-left */
    top: -15%; left: -10%;
    width: 50vw; height: 50vw;
    background: radial-gradient(circle, var(--glow-1) 0%, transparent 70%);
}
.glow-2 {  /* Sky blue — bottom-right */
    bottom: -15%; right: -10%;
    width: 60vw; height: 60vw;
    background: radial-gradient(circle, var(--glow-2) 0%, transparent 70%);
}
.glow-3 {  /* Rose — mid-right */
    top: 40%; right: 10%;
    width: 30vw; height: 30vw;
    background: radial-gradient(circle, var(--glow-3) 0%, transparent 70%);
}`;

const cssGlassButton = `/* ── Glassmorphic Buttons ── */
.btn-primary.liquid-glass {
    background: rgba(255, 255, 255, 0.7) !important;
    color: var(--text-primary) !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow:
        inset 0 1.5px 2px rgba(0, 0, 0, 0.15),
        0 8px 20px rgba(0, 0, 0, 0.04) !important;
}

body.dark .btn-primary.liquid-glass {
    background: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    box-shadow:
        inset 0 1.5px 2px rgba(255, 255, 255, 0.3),
        0 12px 40px rgba(0, 0, 0, 0.3) !important;
}

.btn-primary.liquid-glass:hover {
    background: var(--accent) !important;
    color: #000000 !important;
    border-color: var(--accent) !important;
    box-shadow: 0 0 25px var(--accent-glow) !important;
}`;

const cssColorTokens = `/* ── Design Token: Color System ── */
:root {
    --bg-primary:   #f8fafc;
    --bg-secondary: rgba(255, 255, 255, 0.7);
    --bg-tertiary:  rgba(255, 255, 255, 0.9);

    --text-primary:   #0f172a;
    --text-secondary: #475569;
    --text-tertiary:  #94a3b8;

    --accent:       #d97706;   /* amber */
    --accent-hover: #b45309;
    --accent-glow:  rgba(217, 119, 6, 0.2);

    /* Glow spot colours */
    --glow-1: rgba(217, 119, 6,  0.15);
    --glow-2: rgba(56,  189, 248, 0.15);
    --glow-3: rgba(244, 63,  94,  0.15);
}

body.dark {
    --bg-primary:   #0a0a0a;
    --bg-secondary: rgba(23, 23, 23, 0.4);
    --bg-tertiary:  rgba(255, 255, 255, 0.05);

    --text-primary:   #ffffff;
    --text-secondary: #d4d4d4;
    --text-tertiary:  #a3a3a3;

    --accent:       #facc15;   /* yellow */
    --accent-hover: #eab308;
    --accent-glow:  rgba(250, 204, 21, 0.3);

    --glow-1: rgba(234, 179, 8,   0.10);
    --glow-2: rgba(255, 255, 255, 0.05);
    --glow-3: rgba(115, 115, 115, 0.10);
}`;

// ─── Build document ────────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 48, bold: true, color: DARK, font: "Calibri" },
        paragraph: { spacing: { before: 480, after: 160 } },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 32, bold: true, color: ACCENT, font: "Calibri" },
        paragraph: { spacing: { before: 360, after: 120 } },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 26, bold: true, color: MID, font: "Calibri" },
        paragraph: { spacing: { before: 240, after: 80 } },
      },
    ],
  },
  sections: [
    {
      children: [
        // ── COVER / TITLE ────────────────────────────────────────────
        new Paragraph({
          children: [
            new TextRun({ text: "Principles of Design", bold: true, size: 64, color: DARK, font: "Calibri" }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Zyron Neil Bautista — Personal Portfolio", size: 28, color: MID, font: "Calibri" }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "style.css Design System & CSS Reference", size: 22, color: "94A3B8", italics: true, font: "Calibri" }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 480 },
        }),
        divider(),

        // ── INTRO ───────────────────────────────────────────────────
        h1("Overview"),
        body(
          "This document outlines the core visual design principles and CSS implementation details " +
          "behind the portfolio's design system — heavily inspired by Apple's Liquid Glass language, " +
          "premium glassmorphism, and modern ambient UI patterns."
        ),
        divider(),

        // ── PRINCIPLE 1 ─────────────────────────────────────────────
        h1("1. Liquid Glass 2.0 & Glassmorphism"),
        body(
          "The centrepiece of the design is the .liquid-glass class, which uses high-fidelity " +
          "backdrop-filter blur combined with multi-layer inset box-shadows to simulate the " +
          "refractive, specular character of real frosted glass."
        ),
        bullet("backdrop-filter", "blur(20px) saturate(160%) — creates the frosted / blurred background effect."),
        bullet("border-radius: 28px", "Squircle geometry — smooth, premium Apple-like rounded corners on all glass containers."),
        bullet("Inset box-shadow", "Top inset shadow = specular highlight; bottom inset shadow = rim light."),
        bullet("Thin border", "1px solid rgba(0,0,0,0.08) outlines the glass edge without hard borders."),

        h3("CSS — Liquid Glass"),
        ...codeBlock(cssLiquidGlass),
        divider(),

        // ── PRINCIPLE 2 ─────────────────────────────────────────────
        h1("2. Theme-Specific Specular Highlights"),
        body(
          "To simulate realistic lighting physics, each theme has its own specular treatment:"
        ),
        bullet("Light Mode", "Uses a dark specular highlight (inset 0 1.5px 2px rgba(0,0,0,0.1)) on the top edge, simulating a carved / etched surface facing downward light."),
        bullet("Dark Mode", "Uses a bright white specular (inset 0 1.5px 2px rgba(255,255,255,0.3)) on the top edge, catching the virtual light source and popping against the dark background."),
        divider(),

        // ── PRINCIPLE 3 ─────────────────────────────────────────────
        h1("3. Squircle Geometry"),
        body(
          "All major containers use border-radius: 28px to produce an Apple-like squircle shape. " +
          "This consistent 28px token is applied universally — bento boxes, cards, buttons, modals, " +
          "tags — so the geometry feels intentional and cohesive, not accidental."
        ),
        divider(),

        // ── PRINCIPLE 4 ─────────────────────────────────────────────
        h1("4. Universal Glass System"),
        body(
          "Glass styling is applied consistently across all UI layers. This includes:"
        ),
        bullet("Navbar", "Floating liquid-glass pill at the top of the viewport."),
        bullet("Bento boxes", "About-section grid cells with tilt + glass."),
        bullet("Project cards", "Filterable glass cards in the projects section."),
        bullet("Buttons", "btn-primary.liquid-glass and btn-secondary.liquid-glass."),
        bullet("Modals", "Case-study detail modals with full glass treatment."),
        bullet("Tags & Pills", ".frosted-tag badges using the fake-glass variables."),

        h3("CSS — Glassmorphic Buttons"),
        ...codeBlock(cssGlassButton),
        divider(),

        // ── PRINCIPLE 5 ─────────────────────────────────────────────
        h1("5. Ambient Background Glows"),
        body(
          "Three fixed, full-page radial gradient blobs provide ambient lighting behind all content. " +
          "They have zero GPU filter cost (pure CSS gradients, no filter) and transition smoothly between themes."
        ),
        bullet("glow-1 (amber)", "Top-left — amber/warm accent glow."),
        bullet("glow-2 (sky)", "Bottom-right — cool/sky blue balance glow."),
        bullet("glow-3 (rose)", "Mid-right — subtle rose accent for depth."),

        h3("CSS — Background Glows"),
        ...codeBlock(cssBgGlow),
        divider(),

        // ── PRINCIPLE 6 ─────────────────────────────────────────────
        h1("6. Fading Blur Backdrops (Navbar & Bottom Nav)"),
        body(
          "Instead of a solid navbar background, a mask-image gradient is used to fade the " +
          "backdrop-filter blur from opaque at the very top to transparent further down. " +
          "This creates a seamless 'content slides under the navbar' effect."
        ),
        h3("CSS — Fading Blur Backdrop"),
        ...codeBlock(cssNavbarBlur),
        divider(),

        // ── PRINCIPLE 7 ─────────────────────────────────────────────
        h1("7. Fake Glass Fallback System"),
        body(
          "For elements where backdrop-filter would be too expensive or unnecessary, " +
          "a set of --fake-glass-* CSS variables provides a consistent lightweight alternative. " +
          "They use semi-transparent rgba backgrounds and inset shadows — no filter required."
        ),
        h3("CSS — Fake Glass Variables"),
        ...codeBlock(cssFakeGlass),
        divider(),

        // ── PRINCIPLE 8 ─────────────────────────────────────────────
        h1("8. Design Token — Color System"),
        body(
          "All colours are managed as CSS custom properties on :root (light) and body.dark (dark). " +
          "This allows every component to automatically adapt to both themes without duplication."
        ),
        h3("CSS — Color Tokens"),
        ...codeBlock(cssColorTokens),
        divider(),

        // ── PRINCIPLE 9 ─────────────────────────────────────────────
        h1("9. Dynamic 3D Tilt Effect"),
        body(
          "Project cards and bento boxes implement a mouse-tracking 3D perspective transform via JavaScript. " +
          "Combined with the glass material, this reinforces the physical, tactile quality of the UI."
        ),
        bullet("Technology", "CSS perspective + rotateX/rotateY transforms applied via JS mousemove listener."),
        bullet("Performance", "will-change: transform is applied to glass elements for compositor-thread promotion."),
        bullet("GPU acceleration", "transform: translateZ(0) forces GPU compositing on fixed/glass elements."),
        divider(),

        // ── PRINCIPLE 10 ──────────────────────────────────────────
        h1("10. Performance Philosophy"),
        body("Every visual effect is optimized for 60 fps:"),
        bullet("Scroll throttling", "requestAnimationFrame cap — max 60 fps scroll handler."),
        bullet("Passive listeners", "passive: true on scroll events for compositor-thread scrolling."),
        bullet("IntersectionObserver", "Scroll-reveal animations with zero scroll event cost."),
        bullet("Radial gradients vs filter", "Background glows use CSS gradients (free) instead of CSS filter: blur() (expensive)."),
        bullet("will-change hints", "Applied on .liquid-glass and animated elements for layer promotion."),
        divider(),

        // ── FOOTER ────────────────────────────────────────────────
        new Paragraph({
          children: [
            new TextRun({ text: "Designed & Developed by Zyron Neil Bautista © 2026", size: 18, color: "94A3B8", italics: true }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync("style.docx", buffer);
console.log("✅ style.docx created successfully!");
