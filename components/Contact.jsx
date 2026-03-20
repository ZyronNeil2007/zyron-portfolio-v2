import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal.jsx';

const Contact = () => (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal direction="scale" delay={0}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 text-yellow-500 dark:text-yellow-400 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-neutral-200/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transform rotate-3 transition-colors">
                <Mail size={32} className="-rotate-3 sm:w-9 sm:h-9" />
            </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-neutral-900 dark:text-white tracking-tighter mb-4 sm:mb-6 transition-colors">
                Let's build something <span className="text-yellow-500 dark:text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.2)] dark:drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-colors">great.</span>
            </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 leading-relaxed font-light max-w-2xl mx-auto transition-colors">
                I’m always open to learning new things, collaborating, and building projects that make an impact. Let's get in touch.
            </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
            <a
                href="mailto:zyron@example.com"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-neutral-900 dark:bg-white/90 backdrop-blur-xl text-white dark:text-neutral-950 hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-neutral-950 hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] font-semibold transition-all hover:scale-105 text-base sm:text-lg shadow-xl"
            >
                Say Hello <ArrowUpRight size={20} className="sm:w-6 sm:h-6" />
            </a>
        </ScrollReveal>
    </section>
);

export default Contact;
