import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar({ activeSection, onLogoClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  
  // Mobile Morph Refs
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);
  const dot4Ref = useRef(null);
  const toggleTextRef = useRef(null);
  const mobileOverlayRef = useRef(null);

  // Desktop Navbar Items Mapping
  const navItems = [
    { label: 'Plans', href: '#about', sectionId: 'about' },
    { label: 'Real Stories', href: '#journey', sectionId: 'journey' },
    { label: 'Device', href: '#projects', sectionId: 'projects' },
    { label: 'Science', href: '#designs', sectionId: 'designs' },
    { label: 'Reach Us', href: '#contact', sectionId: 'contact' }
  ];

  // 1. Entrance animation on mount
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // 2. GSAP Dot Grid Morph Animation and Mobile Overlay Transition
  useEffect(() => {
    const d1 = dot1Ref.current;
    const d2 = dot2Ref.current;
    const d3 = dot3Ref.current;
    const d4 = dot4Ref.current;
    const textEl = toggleTextRef.current;
    const overlay = mobileOverlayRef.current;

    if (!d1 || !d2 || !d3 || !d4) return;

    if (isOpen) {
      // Disable document scrolling when mobile menu is open
      document.body.style.overflow = 'hidden';

      // --- Morph 2x2 dot grid into X ---
      gsap.to(d1, { x: 3.5, y: 3.5, rotation: 45, width: 14, height: 1.5, borderRadius: '1px', duration: 0.4, ease: 'power3.out' });
      gsap.to(d4, { x: -3.5, y: -3.5, rotation: 45, width: 14, height: 1.5, borderRadius: '1px', duration: 0.4, ease: 'power3.out' });
      gsap.to(d2, { x: -3.5, y: 3.5, rotation: -45, width: 14, height: 1.5, borderRadius: '1px', duration: 0.4, ease: 'power3.out' });
      gsap.to(d3, { x: 3.5, y: -3.5, rotation: -45, width: 14, height: 1.5, borderRadius: '1px', duration: 0.4, ease: 'power3.out' });

      // Smooth slide and morph MENU to CLOSE text
      gsap.to(textEl, { opacity: 0, x: -10, duration: 0.15, onComplete: () => {
        textEl.innerText = "CLOSE";
        gsap.to(textEl, { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out' });
      }});

      // --- Fade In Fullscreen Mobile Overlay ---
      gsap.fromTo(overlay,
        { opacity: 0, visibility: 'hidden' },
        { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.out' }
      );

      // Stagger animate mobile nav items
      gsap.fromTo('.mobile-nav-link',
        { opacity: 0, y: 40, letterSpacing: '0.05em' },
        { opacity: 1, y: 0, letterSpacing: '0.12em', duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );

    } else {
      // Re-enable document scrolling
      document.body.style.overflow = '';

      // --- Morph X back to 2x2 dot grid ---
      gsap.to(d1, { x: 0, y: 0, rotation: 0, width: 6, height: 6, borderRadius: '50%', duration: 0.4, ease: 'power3.out' });
      gsap.to(d4, { x: 0, y: 0, rotation: 0, width: 6, height: 6, borderRadius: '50%', duration: 0.4, ease: 'power3.out' });
      gsap.to(d2, { x: 0, y: 0, rotation: 0, width: 6, height: 6, borderRadius: '50%', duration: 0.4, ease: 'power3.out' });
      gsap.to(d3, { x: 0, y: 0, rotation: 0, width: 6, height: 6, borderRadius: '50%', duration: 0.4, ease: 'power3.out' });

      // Smooth slide and morph CLOSE to MENU text
      gsap.to(textEl, { opacity: 0, x: 10, duration: 0.15, onComplete: () => {
        textEl.innerText = "MENU";
        gsap.to(textEl, { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out' });
      }});

      // --- Fade Out Mobile Overlay ---
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          overlay.style.visibility = 'hidden';
        }
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMobileLinkClick = (e, sectionId) => {
    setIsOpen(false);
    // Smooth scroll to element
    const el = document.getElementById(sectionId);
    if (el) {
      e.preventDefault();
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-[1000] rounded-full transition-all duration-300 liquid-glass backdrop-blur-nav py-3 px-6 select-none"
      >
        <div className="flex justify-between items-center w-full">
          
          {/* Left Side: Minimal Logo & Brand Text */}
          <div 
            onClick={onLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="logo-box relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border border-white/10 shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]">
              <img src="image/logo.png" alt="Zyron Logo" className="logo-img w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold tracking-wider text-white uppercase opacity-85 group-hover:opacity-100 transition-opacity">
              ZYRON NEIL
            </span>
          </div>

          {/* Center Section: Pill-style Navigation (Desktop Only) */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-full p-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive 
                      ? 'text-white bg-white/10 border border-white/10 shadow-inner' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right Section: CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            {/* Live Indicator CTA Button (Desktop Only) */}
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 group shadow-md"
            >
              {/* Pulse status live indicator dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-semibold text-neutral-300 group-hover:text-white uppercase tracking-wider">
                Let's Talk
              </span>
            </a>

            {/* Mobile Menu Toggle Pill Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {/* Animated 2x2 Dot Grid Morph Icon */}
              <div className="relative w-4 h-4 flex items-center justify-center">
                <span ref={dot1Ref} className="absolute left-[2px] top-[2px] w-1.5 h-1.5 bg-white rounded-full origin-center" />
                <span ref={dot2Ref} className="absolute right-[2px] top-[2px] w-1.5 h-1.5 bg-white rounded-full origin-center" />
                <span ref={dot3Ref} className="absolute left-[2px] bottom-[2px] w-1.5 h-1.5 bg-white rounded-full origin-center" />
                <span ref={dot4Ref} className="absolute right-[2px] bottom-[2px] w-1.5 h-1.5 bg-white rounded-full origin-center" />
              </div>
              
              {/* Menu / Close Text */}
              <span
                ref={toggleTextRef}
                className="text-[10px] font-bold tracking-widest text-neutral-300 uppercase w-10 text-center"
              >
                MENU
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Fullscreen Mobile Cinematic Overlay Menu */}
      <div
        ref={mobileOverlayRef}
        className="fixed inset-0 w-full h-full z-[990] flex items-center justify-center bg-black/90 backdrop-blur-2xl border-none opacity-0 invisible transition-all duration-500"
      >
        {/* Soft Radial Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-blue-950/20 pointer-events-none" />
        <div className="absolute w-[80vw] h-[80vw] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Large Centered Navigation Items */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-h-[80vh] overflow-y-auto w-full px-8 py-12">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleMobileLinkClick(e, item.sectionId)}
                className={`mobile-nav-link text-3xl sm:text-4xl font-extrabold uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-500 hover:text-neutral-200 hover:scale-105'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* Social Links on mobile menu */}
          <div className="flex gap-6 mt-12 mobile-nav-link opacity-0">
            <a href="mailto:zyronneilbautista10@gmail.com" className="text-neutral-500 hover:text-white transition-colors duration-300">
              <i className="ph ph-envelope text-xl"></i>
            </a>
            <a href="https://github.com/ZyronNeil2007" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors duration-300">
              <i className="ph ph-github-logo text-xl"></i>
            </a>
            <a href="https://www.instagram.com/zyronnei10/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors duration-300">
              <i className="ph ph-instagram-logo text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
