// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Management ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

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

    function createCursor(blinking) {
        const cursor = document.createElement('span');
        cursor.className = `typing-cursor ${blinking ? 'blinking' : ''}`;
        return cursor;
    }

    function typeWriter() {
        if (charCount <= line1.length) {
            elLine1.textContent = line1.substring(0, charCount);
            elLine1.appendChild(createCursor(charCount === 0 || charCount === line1.length));
            elLine2.innerHTML = '';
            elLine3.innerHTML = '';
        } else if (charCount <= line1.length + line2.length) {
            elLine1.textContent = line1;
            elLine2.textContent = line2.substring(0, charCount - line1.length);
            elLine2.appendChild(createCursor(charCount === line1.length + line2.length));
            elLine3.innerHTML = '';
        } else if (charCount <= totalChars) {
            elLine1.textContent = line1;
            elLine2.textContent = line2;
            elLine3.textContent = line3.substring(0, charCount - line1.length - line2.length);
            elLine3.appendChild(createCursor(charCount === totalChars));
        }

        if (charCount < totalChars) {
            charCount++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(() => {
        charCount = 1;
        typeWriter();
    }, 800);

    // --- 3. Scroll Reveal (IntersectionObserver — zero scroll cost) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Scroll Spy & Navbar (throttled with rAF) ---
    const navbar = document.getElementById('navbar');
    const tabLinks = document.querySelectorAll('.tab-link');
    const sectionIds = ['home', 'about', 'projects', 'contact'];
    // Cache section elements once
    const sectionEls = sectionIds.map(id => document.getElementById(id));

    let scrollRAF = null;
    let lastScrollY = -1;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar scrolled class
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Active section detection — read only, no writes in loop
        let currentSection = 'home';
        const half = window.innerHeight / 2;
        for (let i = 0; i < sectionEls.length; i++) {
            if (sectionEls[i] && sectionEls[i].getBoundingClientRect().top <= half) {
                currentSection = sectionIds[i];
            }
        }

        tabLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === currentSection);
        });

        lastScrollY = scrollY;
        scrollRAF = null;
    }

    // Passive + rAF-throttled scroll listener
    window.addEventListener('scroll', () => {
        if (!scrollRAF) {
            scrollRAF = requestAnimationFrame(handleScroll);
        }
    }, { passive: true });

    handleScroll();

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            tabLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 5. Footer Year ---
    document.getElementById('year').textContent = new Date().getFullYear();
});
