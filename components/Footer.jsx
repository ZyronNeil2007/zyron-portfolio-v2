import React from 'react';
import { Mail, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => (
    <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-neutral-200 dark:border-white/10 bg-white/40 dark:bg-neutral-950/60 backdrop-blur-2xl relative z-10 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold text-xs backdrop-blur-md transition-colors">
                    ZB
                </div>
                <span className="text-neutral-900 dark:text-white font-medium tracking-tight transition-colors">Zyron Neil Bautista</span>
            </div>

            <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light text-center md:text-left transition-colors">
                © {new Date().getFullYear()} Designed & Developed by Zyron.
            </p>

            <div className="flex flex-wrap justify-center gap-3 text-neutral-500 dark:text-neutral-400">
                <a href="zyronneilbautista10@gmail.com" aria-label="Email" className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-yellow-600 dark:hover:text-yellow-400 hover:scale-110 transition-all shadow-sm"><Mail size={18} /></a>
                <a href="https://www.facebook.com/share/18ZFsaeo4S/" aria-label="Facebook" className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-yellow-600 dark:hover:text-yellow-400 hover:scale-110 transition-all shadow-sm"><Facebook size={18} /></a>
                <a href="https://www.instagram.com/zyronnei10/" aria-label="Instagram" className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-yellow-600 dark:hover:text-yellow-400 hover:scale-110 transition-all shadow-sm"><Instagram size={18} /></a>
                <a href="https://www.tiktok.com/@zyron_neil" aria-label="TikTok" className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-yellow-600 dark:hover:text-yellow-400 hover:scale-110 transition-all shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </a>
                <a href="https://github.com/ZyronNeil2007" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-yellow-600 dark:hover:text-yellow-400 hover:scale-110 transition-all shadow-sm"><Github size={18} /></a>
            </div>
        </div>
    </footer>
);

export default Footer;
