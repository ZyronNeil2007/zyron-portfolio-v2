// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Management ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        if (savedTheme === 'light') {
            body.classList.remove('dark');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        } else {
            body.classList.add('dark');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }
    } else {
        if (!prefersDark) {
            body.classList.remove('dark');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        }
    }

    // Toggle theme
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- 2. Typewriter Effect ---
    const line1 = "Hi, I'm Zyron ";
    const line2 = "I blend code with ";
    const line3 = "design.";
    
    const elLine1 = document.getElementById('type-line1');
    const elLine2 = document.getElementById('type-line2');
    const elLine3 = document.getElementById('type-line3');
    
    let charCount = 0;
    const totalChars = line1.length + line2.length + line3.length;
    
    // Setup Cursor Element
    function createCursor(blinking) {
        const cursor = document.createElement('span');
        cursor.className = `typing-cursor ${blinking ? 'blinking' : ''}`;
        return cursor;
    }

    function typeWriter() {
        if (charCount <= line1.length) {
            elLine1.textContent = line1.substring(0, charCount);
            elLine1.innerHTML += createCursor(charCount === 0 || charCount === line1.length).outerHTML;
            elLine2.innerHTML = '';
            elLine3.innerHTML = '';
        } else if (charCount <= line1.length + line2.length) {
            elLine1.textContent = line1;
            elLine2.textContent = line2.substring(0, charCount - line1.length);
            elLine2.innerHTML += createCursor(charCount === line1.length + line2.length).outerHTML;
            elLine3.innerHTML = '';
        } else if (charCount <= totalChars) {
            elLine1.textContent = line1;
            elLine2.textContent = line2;
            elLine3.textContent = line3.substring(0, charCount - line1.length - line2.length);
            elLine3.innerHTML += createCursor(charCount === totalChars).outerHTML;
        }

        if (charCount < totalChars) {
            charCount++;
            setTimeout(typeWriter, 50); // Typing speed
        }
    }

    // Start typing after initial delay
    setTimeout(() => {
        charCount = 1;
        typeWriter();
    }, 800);

    // --- 3. Scroll Reveal ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 4. Scroll Spy & Navbar ---
    const navbar = document.getElementById('navbar');
    const tabLinks = document.querySelectorAll('.tab-link');
    const sections = ['home', 'about', 'projects', 'contact'];

    function handleScroll() {
        // Navbar styling on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active tab detection
        let currentSection = 'home';
        
        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2) {
                    currentSection = sectionId;
                }
            }
        }

        tabLinks.forEach(link => {
            if (link.getAttribute('data-target') === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on load

    // Add click listener for floating tabs to handle active state immediately
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            tabLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 5. Footer Year ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 6. Liquid Glass Integration ---
    const getDisplacementMap = (height, width, radius, depth) => {
        const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <style>.mix { mix-blend-mode: screen; }</style>
            <defs>
                <linearGradient id="Y" x1="0" x2="0" y1="${Math.ceil((radius / height) * 15)}%" y2="${Math.floor(100 - (radius / height) * 15)}%">
                    <stop offset="0%" stop-color="#0F0" />
                    <stop offset="100%" stop-color="#000" />
                </linearGradient>
                <linearGradient id="X" x1="${Math.ceil((radius / width) * 15)}%" x2="${Math.floor(100 - (radius / width) * 15)}%" y1="0" y2="0">
                    <stop offset="0%" stop-color="#F00" />
                    <stop offset="100%" stop-color="#000" />
                </linearGradient>
            </defs>
            <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
            <g filter="blur(2px)">
              <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
              <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" class="mix" />
              <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" class="mix" />
              <rect x="${depth}" y="${depth}" height="${height - 2 * depth}" width="${width - 2 * depth}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
            </g>
        </svg>`;
        return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    };

    const getDisplacementFilter = (height, width, radius, depth, strength = 100, chromaticAberration = 0) => {
        const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="displace" color-interpolation-filters="sRGB">
                    <feImage x="0" y="0" height="${height}" width="${width}" href="${getDisplacementMap(height, width, radius, depth)}" result="displacementMap" />
                    <feDisplacementMap transform-origin="center" in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration * 2}" xChannelSelector="R" yChannelSelector="G" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedR" />
                    <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration}" xChannelSelector="R" yChannelSelector="G" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="displacedG" />
                    <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="displacedB" />
                    <feBlend in="displacedR" in2="displacedG" mode="screen"/>
                    <feBlend in2="displacedB" mode="screen"/>
                </filter>
            </defs>
        </svg>`;
        return "data:image/svg+xml;utf8," + encodeURIComponent(svg) + "#displace";
    };

    const supportsBackdropFilterUrl = (() => {
        const testEl = document.createElement("div");
        testEl.style.cssText = "backdrop-filter: url(#test)";
        return testEl.style.backdropFilter === "url(#test)" || testEl.style.backdropFilter === 'url("#test")';
    })();

    function redrawGlass(glass) {
        const liquidGlass = glass.querySelector(".glass-box");
        const content = glass.querySelector(".lg-content");
        if (!liquidGlass || !content) return;

        const rect = glass.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);

        const blur = parseFloat(liquidGlass.dataset.blur || "0");
        const chromaticAberration = parseFloat(liquidGlass.dataset.cab || "0");
        const depth = parseFloat(liquidGlass.dataset.depth || "10");
        const strength = parseFloat(liquidGlass.dataset.strength || "100");
        const saturate = parseFloat(liquidGlass.dataset.saturate || "1.5");
        const brightness = parseFloat(liquidGlass.dataset.brightness || "1.1");
        
        const computedStyle = window.getComputedStyle(glass);
        let radius = parseFloat(computedStyle.borderRadius || "0");
        if (isNaN(radius)) radius = 0;
        if (computedStyle.borderRadius.includes('%')) {
            radius = Math.min(width, height) / 2;
        } else if (radius > Math.min(width, height) / 2) {
            radius = Math.min(width, height) / 2;
        }

        liquidGlass.style.height = `${height}px`;
        liquidGlass.style.width = `${width}px`;

        if (supportsBackdropFilterUrl) {
            liquidGlass.style.backdropFilter = `blur(${blur / 2}px) url('${getDisplacementFilter(height, width, radius, depth, strength, chromaticAberration)}') blur(${blur}px) brightness(${brightness}) saturate(${saturate})`;
        } else {
            liquidGlass.style.webkitBackdropFilter = `blur(${width / 10}px) saturate(180%)`;
            liquidGlass.style.backdropFilter = `blur(${width / 10}px) saturate(180%)`;
        }
    }

    function initLiquidGlass() {
        const glassElements = document.querySelectorAll(".liquid-glass");
        if (glassElements.length === 0) return;

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                redrawGlass(entry.target);
            });
        });

        glassElements.forEach((glass) => {
            redrawGlass(glass);
            resizeObserver.observe(glass);
            
            if (!supportsBackdropFilterUrl) {
                glass.style.boxShadow = "0px 0px 1px var(--border-color)";
            }
        });
    }

    initLiquidGlass();
});
