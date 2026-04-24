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

    // Timeline dot pulse — mark parent .timeline-item as visible
    const timelineItems = document.querySelectorAll('.timeline-item');
    const tlObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.15 });
    timelineItems.forEach(item => tlObserver.observe(item));


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

    // --- 6. Project Filtering ---
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active state
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            // Filter logic
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    card.classList.remove('hidden');
                    // Reset animation for fresh reveal
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- 7. Masonry Lightbox ---
    const masonryItems = document.querySelectorAll('.masonry-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        masonryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // --- 8. Case Study Modal ---
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.querySelector('.modal-close');

    if (projectModal) {
        // Open modal when clicking a project card
        document.querySelectorAll('.card-content').forEach(cardContent => {
            cardContent.style.cursor = 'pointer'; // indicate clickability
            cardContent.addEventListener('click', (e) => {
                // Prevent opening if they clicked the Github/External links
                if (e.target.closest('a')) return;

                const parent = cardContent.closest('.project-card');
                const title = parent.querySelector('.project-title').textContent;
                const desc = parent.querySelector('.project-desc').innerHTML;
                const techTags = parent.querySelector('.project-tech').innerHTML;

                modalTitle.textContent = title;
                modalDesc.innerHTML = desc; // You can add extra detailed content here later
                modalTech.innerHTML = techTags;

                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeProjectModal = () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (modalClose) modalClose.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    // --- 9. 3D Tilt Effect ---
    const tiltElements = document.querySelectorAll('.bento-box, .card-content');
    
    function applyTiltEffect() {
        // Disable on mobile
        if (window.innerWidth < 768) {
            tiltElements.forEach(el => {
                el.style.transform = '';
                el.classList.remove('tilt-element');
            });
            return;
        }

        tiltElements.forEach(el => {
            el.classList.add('tilt-element');

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                // Calculate percentage from center (-0.5 to 0.5)
                const xPct = (x / rect.width) - 0.5;
                const yPct = (y / rect.height) - 0.5;
                
                // Max rotation of 8 degrees
                const rotateY = xPct * 16;  
                const rotateX = yPct * -16; 

                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // Initialize tilt and re-evaluate on resize
    applyTiltEffect();
    window.addEventListener('resize', () => {
        // Debounce resize slightly
        clearTimeout(window.tiltResizeTimer);
        window.tiltResizeTimer = setTimeout(applyTiltEffect, 100);
    });

    // --- 10. Anti-Gravity Easter Egg (Matter.js) ---
    const logoContainer = document.querySelector('.logo-container');
    let logoClickCount = 0;
    let logoClickTimer;

    if (logoContainer) {
        // Hint that it's clickable
        logoContainer.style.cursor = 'pointer';
        
        logoContainer.addEventListener('click', () => {
            logoClickCount++;
            clearTimeout(logoClickTimer);
            
            if (logoClickCount === 3) {
                triggerAntiGravity();
                logoClickCount = 0; // Reset
            } else {
                // 500ms window to click 3 times
                logoClickTimer = setTimeout(() => {
                    logoClickCount = 0;
                }, 500); 
            }
        });
    }

    function triggerAntiGravity() {
        // Prevent triggering multiple times
        if (window.antiGravityActive) return;
        window.antiGravityActive = true;

        // Ensure Matter is loaded
        if (typeof Matter === 'undefined') {
            console.error("Matter.js is not loaded!");
            return;
        }

        // Lock background scroll to contain the physics simulation
        document.body.style.overflow = 'hidden';
        
        // Module aliases
        const Engine = Matter.Engine,
              Runner = Matter.Runner,
              Bodies = Matter.Bodies,
              Composite = Matter.Composite,
              Mouse = Matter.Mouse,
              MouseConstraint = Matter.MouseConstraint,
              Events = Matter.Events;

        // Create the engine
        const engine = Engine.create();
        const world = engine.world;
        
        // Reverse gravity! (Anti-Gravity)
        engine.gravity.y = -0.5;

        // Viewport dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Create invisible boundaries (ceiling, floor, left wall, right wall)
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
        const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, wallOptions);
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
        
        Composite.add(world, [ground, ceiling, leftWall, rightWall]);

        // Target UI elements
        const targetElements = document.querySelectorAll('.bento-box, .project-card, .timeline-item, .frosted-tag');
        const physicsMap = [];

        // Create a physics container on top of everything to hold the free-floating elements
        const physicsContainer = document.createElement('div');
        physicsContainer.style.position = 'fixed';
        physicsContainer.style.top = '0';
        physicsContainer.style.left = '0';
        physicsContainer.style.width = '100vw';
        physicsContainer.style.height = '100vh';
        physicsContainer.style.pointerEvents = 'none'; // Let mouse events pass through to interactive bodies
        physicsContainer.style.zIndex = '9000';
        document.body.appendChild(physicsContainer);

        targetElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            
            // Skip elements that are hidden or haven't rendered
            if (rect.width === 0 || rect.height === 0) return;

            // Clone the element to preserve all styling exactly as it looks
            const clone = el.cloneNode(true);
            
            // Apply absolute positioning to break free from the layout
            clone.style.position = 'absolute';
            clone.style.margin = '0';
            clone.style.left = '0px'; 
            clone.style.top = '0px';  
            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;
            clone.style.pointerEvents = 'auto'; // Re-enable interaction on the clone
            clone.style.boxSizing = 'border-box';
            
            // Remove tilt transitions so physics runs smoothly
            clone.style.transition = 'none'; 
            clone.classList.remove('tilt-element');
            clone.classList.remove('scroll-reveal'); // Strip scroll animations

            physicsContainer.appendChild(clone);
            
            // Hide the original DOM element
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';

            // Matter.js bodies use the center of the rectangle as their origin
            const body = Bodies.rectangle(
                rect.left + rect.width / 2, 
                rect.top + rect.height / 2, 
                rect.width, 
                rect.height, 
                { 
                    restitution: 0.6, // Bouncy feel
                    friction: 0.1,
                    frictionAir: 0.02
                }
            );
            
            Composite.add(world, body);
            physicsMap.push({ dom: clone, body: body, width: rect.width, height: rect.height });
        });

        // Add Mouse interaction so user can drag and throw elements
        const mouse = Mouse.create(document.body);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Composite.add(world, mouseConstraint);

        // Sync DOM positions with Physics body positions every tick
        Events.on(engine, 'afterUpdate', function() {
            physicsMap.forEach(map => {
                const pos = map.body.position;
                const angle = map.body.angle;
                
                // Convert Matter.js center origin to DOM top-left origin
                const x = pos.x - map.width / 2;
                const y = pos.y - map.height / 2;
                
                map.dom.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
            });
        });

        // Start the physics engine
        Runner.run(Runner.create(), engine);
        
        // Bonus visual feedback
        const bgGlows = document.querySelectorAll('.bg-glow');
        bgGlows.forEach(glow => glow.style.filter = 'hue-rotate(90deg) blur(24px)');
    }
});
