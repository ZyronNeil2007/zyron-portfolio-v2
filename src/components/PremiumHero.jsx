import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PremiumHero() {
  const containerRef = useRef(null);
  const topImageRef = useRef(null);
  const portalRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  // High performance DOM variable tracking
  const mask = useRef({ x: 0, y: 0, radius: 0, opacity: 0 });

  useEffect(() => {
    // 1. Entrance GSAP timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Pulsing background glows timeline
    gsap.to(glow1Ref.current, {
      scale: 1.15,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });
    gsap.to(glow2Ref.current, {
      scale: 1.2,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: 1
    });

    // Main entrance animations
    tl.fromTo(glow1Ref.current, { opacity: 0 }, { opacity: 0.6, duration: 2 })
      .fromTo(glow2Ref.current, { opacity: 0 }, { opacity: 0.5, duration: 2 }, '-=1.5')
      .fromTo(eyebrowRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=1.5')
      .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, '-=1.2')
      .fromTo(descRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1 }, '-=1.0')
      .fromTo(buttonGroupRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .fromTo(portalRef.current, { opacity: 0, scale: 0.92, rotateY: 15 }, { opacity: 1, scale: 1, rotateY: 0, duration: 1.6, ease: 'power3.out' }, '-=1.4');

    // 2. High-performance mouse follow logic using gsap.quickTo
    const target = topImageRef.current;
    if (!target || !containerRef.current) return;

    // quickTo handlers for smooth cursor interpolation
    const xTo = gsap.quickTo(mask.current, 'x', {
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: applyMask
    });

    const yTo = gsap.quickTo(mask.current, 'y', {
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: applyMask
    });

    const radiusTo = gsap.quickTo(mask.current, 'radius', {
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: applyMask
    });

    const opacityTo = gsap.quickTo(mask.current, 'opacity', {
      duration: 0.6,
      ease: 'power2.inOut',
      onUpdate: applyMask
    });

    function applyMask() {
      if (!target) return;
      const gradient = `radial-gradient(circle ${mask.current.radius}px at ${mask.current.x}px ${mask.current.y}px, transparent 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,${mask.current.opacity}) 100%)`;
      target.style.maskImage = gradient;
      target.style.webkitMaskImage = gradient;
    }

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
    };

    const handleMouseEnter = () => {
      // Fade in the reveal mask smoothly
      radiusTo(100);
      opacityTo(1);
    };

    const handleMouseLeave = () => {
      // Cinematic dissolve back: Animate radius and opacity to 0
      gsap.to(mask.current, {
        radius: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onUpdate: applyMask
      });
    };

    // Expand reveal area when hovering specifically over the portrait portal
    const handlePortalEnter = () => {
      radiusTo(240); // Larger circle for deep reveal
    };

    const handlePortalLeave = () => {
      radiusTo(100); // Standard reveal size
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    const portal = portalRef.current;
    if (portal) {
      portal.addEventListener('mouseenter', handlePortalEnter);
      portal.addEventListener('mouseleave', handlePortalLeave);
    }

    // Set initial mask state (completely masked)
    applyMask();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (portal) {
        portal.removeEventListener('mouseenter', handlePortalEnter);
        portal.removeEventListener('mouseleave', handlePortalLeave);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-24 md:py-32 max-w-none px-4 md:px-12 select-none"
    >
      {/* Background Animated Cyan/Blue Blurred Glows */}
      <div
        ref={glow1Ref}
        className="absolute top-1/4 left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={glow2Ref}
        className="absolute bottom-1/4 right-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Left Section - Elegant Text Content Aligned Bottom-Left */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 pt-6 md:pt-12">
          {/* Tagline / Eyebrow */}
          <div
            ref={eyebrowRef}
            data-aos="fade-up"
            data-aos-delay="100"
            className="frosted-tag liquid-glass mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-xs font-semibold uppercase tracking-widest text-cyan-400"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            CS Student &amp; Creative Developer
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            data-aos="fade-up"
            data-aos-delay="200"
            className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-6"
          >
            <span className="line1 text-white font-light block">Hi, I'm Zyron</span>
            <span className="line2 text-white/50 block font-normal">I blend code</span>
            <span className="line3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block font-extrabold drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              with design.
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            data-aos="fade-up"
            data-aos-delay="300"
            className="hero-desc text-lg sm:text-xl text-neutral-400 font-light max-w-lg mb-8 leading-relaxed"
          >
            I specialize in building functional systems while making them visually engaging and user-friendly. 
            I believe technology should not only work well but also feel good to use.
          </p>

          {/* Buttons */}
          <div
            ref={buttonGroupRef}
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Primary Filled Button */}
            <a
              href="#projects"
              className="btn-primary liquid-glass flex items-center justify-center gap-2 py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300 transform active:scale-95 bg-white text-black hover:bg-cyan-500 hover:text-black border border-white/20 shadow-lg hover:shadow-cyan-500/20"
            >
              <span>View Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 256 256"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path
                  fill="currentColor"
                  d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H96a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8Z"
                />
              </svg>
            </a>

            {/* Secondary Text Button */}
            <a
              href="#about"
              className="group btn-secondary flex items-center justify-center gap-2 py-3 px-8 rounded-full font-medium text-sm text-neutral-300 hover:text-white transition-all duration-300"
            >
              <span>Learn More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 256 256"
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  fill="currentColor"
                  d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Section - Interactive Portal Reveal */}
        <div className="col-span-1 md:col-span-5 flex justify-center items-center order-1 md:order-2">
          <div
            ref={portalRef}
            data-aos="fade-up"
            data-aos-delay="150"
            className="me-portal relative w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[350px] md:h-[465px] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl flex justify-center items-center backdrop-blur-md select-none group"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              perspective: '1000px',
            }}
          >
            {/* Liquid Glass Highlight Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-30 rounded-[36px]" />
            <div className="absolute inset-[1px] border border-white/10 pointer-events-none z-30 rounded-[35px]" />

            {/* Bottom Image Layer (Uniform) */}
            <img
              src="image/me/me_uniform.png"
              alt="Zyron Neil Bautista - Uniform"
              className="absolute w-full h-full pointer-events-none z-10 rounded-[36px] object-cover md:object-contain transition-all duration-300"
            />

            {/* Top Image Layer (Ordinary - Masked) */}
            <img
              ref={topImageRef}
              src="image/me/me_ordinary.png"
              alt="Zyron Neil Bautista - Ordinary"
              className="absolute w-full h-full pointer-events-none z-20 rounded-[36px] object-cover md:object-contain transition-all duration-300"
            />

            {/* Holographic Glowing Light Edge Catch */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-25" />
          </div>
        </div>
      </div>
    </section>
  );
}
