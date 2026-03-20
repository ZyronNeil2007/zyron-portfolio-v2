import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const NAV_LINKS = ['Home', 'About', 'Projects', 'Contact'];

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/60 dark:bg-neutral-900/40 backdrop-blur-2xl border-b border-white/40 dark:border-white/10 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-3 sm:py-4' : 'bg-transparent py-5 sm:py-6'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-neutral-950 font-bold tracking-tighter shadow-lg shadow-yellow-400/20">
                            ZB
                        </div>
                        <span className="text-xl font-semibold text-neutral-900 dark:text-white tracking-tight transition-colors">
                            Zyron.
                        </span>
                    </div>

                    {/* Desktop Menu - Apple Pill Glass */}
                    <div className="hidden md:flex space-x-8 items-center bg-white/60 dark:bg-white/5 px-6 py-2.5 rounded-full border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:scale-105 transition-all text-sm font-medium tracking-wide"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Desktop & Mobile Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:scale-110 transition-all shadow-sm backdrop-blur-xl"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <a
                            href="#contact"
                            className="hidden md:block px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white/90 backdrop-blur-xl text-white dark:text-neutral-950 hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-neutral-950 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 text-sm font-semibold tracking-wide"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
