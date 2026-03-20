import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight, Code2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal.jsx';

const Hero = () => {
    const [charCount, setCharCount] = useState(0);
    const line1 = "Hi, I'm Zyron ";
    const line2 = "I blend code with ";
    const line3 = "design.";
    const totalChars = line1.length + line2.length + line3.length;

    // Typewriter Engine
    useEffect(() => {
        let timer;
        if (charCount === 0) {
            // Start typing right after the page fade-in completes
            timer = setTimeout(() => setCharCount(1), 800);
        } else if (charCount < totalChars) {
            // Typing speed (lower = faster)
            timer = setTimeout(() => setCharCount(prev => prev + 1), 50);
        }
        return () => clearTimeout(timer);
    }, [charCount, totalChars]);

    const Cursor = ({ blinking }) => (
        <span className={`inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-yellow-500 ml-1 translate-y-[0.1em] align-baseline ${blinking ? 'animate-pulse opacity-70' : 'opacity-100'}`}></span>
    );

    return (
        <section id="home" className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center min-h-[90vh] md:min-h-screen relative">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 w-full">

                {/* Left Column: Text Content */}
                <div className="flex-1 max-w-2xl w-full text-center md:text-left">

                    <ScrollReveal delay={100} direction="up">
                        {/* Frosted Tag */}
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl text-yellow-600 dark:text-yellow-400 font-medium text-xs sm:text-sm mb-6 sm:mb-8 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-colors">
                            <Sparkles size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>CS Student & Creative Developer</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} direction="up">
                        <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tighter mb-4 sm:mb-6 leading-[1.1] transition-colors text-neutral-900 dark:text-white relative">

                            {/* LINE 1 */}
                            <span className="relative">
                                {line1.substring(0, Math.max(0, Math.min(line1.length, charCount)))}
                                {charCount <= line1.length && <Cursor blinking={charCount === 0} />}
                                <span className="opacity-0">{line1.substring(Math.max(0, Math.min(line1.length, charCount)))}</span>
                            </span>

                            <br className="hidden sm:block" />

                            {/* LINE 2 */}
                            <span className="text-neutral-400 dark:text-white/40 relative">
                                {line2.substring(0, Math.max(0, Math.min(line2.length, charCount - line1.length)))}
                                {charCount > line1.length && charCount <= line1.length + line2.length && <Cursor blinking={false} />}
                                <span className="opacity-0">{line2.substring(Math.max(0, Math.min(line2.length, charCount - line1.length)))}</span>
                            </span>

                            <br className="hidden sm:block" />

                            {/* LINE 3 */}
                            <span className="text-yellow-500 dark:text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.2)] dark:drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-colors relative">
                                {line3.substring(0, Math.max(0, Math.min(line3.length, charCount - line1.length - line2.length)))}
                                {charCount > line1.length + line2.length && <Cursor blinking={charCount === totalChars} />}
                                <span className="opacity-0">{line3.substring(Math.max(0, Math.min(line3.length, charCount - line1.length - line2.length)))}</span>
                            </span>

                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={300} direction="up">
                        <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300/80 mb-8 sm:mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed tracking-wide font-light transition-colors">
                            I specialize in building functional systems while making them visually engaging and user-friendly. I believe technology should not only work well but also feel good to use.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={400} direction="up">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center justify-center md:justify-start">
                            <a
                                href="#projects"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.2)] text-sm sm:text-base"
                            >
                                View Projects <ArrowUpRight size={20} />
                            </a>
                            <a
                                href="#about"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 text-neutral-700 dark:text-white font-medium transition-all hover:scale-105 shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-center text-sm sm:text-base"
                            >
                                Learn More
                            </a>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Right Column: Profile Picture */}
                <ScrollReveal delay={300} direction="scale" className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0 group mx-auto md:mx-0">
                    {/* Animated Glow Behind Image */}
                    <div className="absolute inset-0 bg-yellow-400/40 dark:bg-yellow-500/20 rounded-[2rem] sm:rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700 -z-10"></div>

                    {/* Glassmorphism Frame */}
                    <div className="relative w-full h-full rounded-[2rem] sm:rounded-[3rem] border-[6px] border-white/60 dark:border-white/10 p-2 sm:p-3 bg-white/40 dark:bg-white/5 backdrop-blur-2xl shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-105">
                        {/* Actual Image Container */}
                        <div className="w-full h-full rounded-[1.5rem] sm:rounded-[2.25rem] overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative">

                            {/* REPLACE THE 'src' URL BELOW WITH YOUR ACTUAL IMAGE LINK */}
                            <img
                                src="C:\Users\hp\Desktop\my-portfolio\Gemini_Generated_Image_fnpzccfnpzccfnpz_.png"
                                alt="Zyron Neil Bautista"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                            />

                        </div>
                    </div>

                    {/* Floating Apple-Style Badge */}
                    <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-3 sm:p-4 rounded-full border border-white/40 dark:border-white/10 shadow-xl transition-transform hover:scale-110 group-hover:-translate-y-2 duration-500">
                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default Hero;
