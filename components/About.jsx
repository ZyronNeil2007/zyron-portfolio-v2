import React from 'react';
import { Terminal, Monitor, Code2, Palette, Coffee, Gamepad2, Film, Music } from 'lucide-react';
import ScrollReveal from './ScrollReveal.jsx';

const SKILLS = [
    { category: 'Programming', items: ['Java', 'Python', 'C++'], icon: <Terminal size={20} /> },
    { category: 'Web Development', items: ['HTML', 'CSS', 'JavaScript'], icon: <Monitor size={20} /> },
    { category: 'Tools', items: ['phpMyAdmin', 'VS Code'], icon: <Code2 size={20} /> },
    { category: 'Design', items: ['Layouting', 'Pubmats', 'UI Design'], icon: <Palette size={20} /> },
];

const FUN_FACTS = [
    { text: 'Loves coffee & chill coding', icon: <Coffee size={24} /> },
    { text: 'Plays Minecraft', icon: <Gamepad2 size={24} /> },
    { text: 'Enjoys movies, anime & BL', icon: <Film size={24} /> },
    { text: 'Into funk & pop music', icon: <Music size={24} /> },
];

const About = () => (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <ScrollReveal direction="up" delay={0}>
            <div className="flex items-center gap-4 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight transition-colors">About Me</h2>
                <div className="h-[1px] flex-grow bg-neutral-200 dark:bg-white/10 transition-colors"></div>
            </div>
        </ScrollReveal>

        {/* Apple Glass Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

            {/* Intro Box - Frosted Glass */}
            <ScrollReveal direction="up" delay={100} className="md:col-span-2 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl shadow-neutral-200/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-3xl p-6 sm:p-8 lg:p-10 hover:bg-white/80 dark:hover:bg-neutral-800/40 hover:border-white/60 dark:hover:border-white/20 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 dark:text-white mb-4 transition-colors">Who I Am</h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base sm:text-lg font-light mb-4 sm:mb-6 transition-colors">
                    I’m a passionate tech enthusiast pursuing my degree in Computer Science. I enjoy turning ideas into real, working systems—whether it’s a quiz application, a functional website, or a creative layout.
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base sm:text-lg font-light transition-colors">
                    Outside coding, I’m someone who enjoys creativity, aesthetics, and storytelling. My ultimate goal is to become a software engineer and continue creating systems that make an impact.
                </p>
            </ScrollReveal>

            {/* What I Do Box */}
            <ScrollReveal direction="up" delay={200} className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl shadow-neutral-200/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-3xl p-6 sm:p-8 hover:bg-white/80 dark:hover:bg-neutral-800/40 hover:border-white/60 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-white mb-6 transition-colors">What I Do</h3>
                <ul className="space-y-4 sm:space-y-5">
                    <li className="flex items-center gap-4">
                        <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-yellow-600 dark:text-yellow-400 backdrop-blur-md shadow-sm transition-colors"><Code2 size={18} /></div>
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors">Develop web systems</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-yellow-600 dark:text-yellow-400 backdrop-blur-md shadow-sm transition-colors"><Palette size={18} /></div>
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors">Create visual layouts</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-yellow-600 dark:text-yellow-400 backdrop-blur-md shadow-sm transition-colors"><Terminal size={18} /></div>
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors">Solve logic problems</span>
                    </li>
                </ul>
            </ScrollReveal>

            {/* Skills Box */}
            <ScrollReveal direction="up" delay={300} className="md:col-span-3 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl shadow-neutral-200/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-white/60 dark:hover:border-white/20 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-white mb-6 sm:mb-8 transition-colors">Technical Arsenal</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {SKILLS.map((skill, idx) => (
                        <div key={idx} className="bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 rounded-2xl p-5 backdrop-blur-sm shadow-sm dark:shadow-none transition-colors">
                            <div className="flex items-center gap-3 text-neutral-900 dark:text-white mb-4 transition-colors">
                                <span className="p-2 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-yellow-600 dark:text-yellow-400 transition-colors">{skill.icon}</span>
                                <h4 className="font-medium">{skill.category}</h4>
                            </div>
                            <div className="flex flex-col gap-2">
                                {skill.items.map((item, i) => (
                                    <span key={i} className="text-neutral-600 dark:text-neutral-400 text-sm flex items-center gap-2 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 dark:bg-yellow-400/50"></span>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            {/* Fun Facts Box - High Blur Container */}
            <ScrollReveal direction="up" delay={400} className="md:col-span-3 border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 overflow-hidden relative bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-xl shadow-neutral-200/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-colors">
                <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-white mb-4 sm:mb-6 text-center transition-colors">Behind the Code</h3>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
                    {FUN_FACTS.map((fact, idx) => (
                        <div key={idx} className="flex items-center gap-2 sm:gap-3 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-xl px-4 sm:px-5 py-2 sm:py-3 rounded-full border border-white/40 dark:border-white/10 shadow-sm hover:bg-white/80 dark:hover:bg-white/10 hover:border-white/60 dark:hover:border-white/20 transition-all duration-300">
                            <span className="text-yellow-600 dark:text-yellow-400 transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">{fact.icon}</span>
                            <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 font-medium transition-colors">{fact.text}</span>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

        </div>
    </section>
);

export default About;
