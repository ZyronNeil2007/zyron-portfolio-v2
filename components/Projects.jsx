import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal.jsx';

const PROJECTS = [
    {
        title: 'BNHS Online Quiz Website',
        description: 'A comprehensive system featuring admin and student portals, complete with quiz management, results tracking, and a built-in feedback system.',
        tech: ['Web Dev', 'phpMyAdmin', 'Logic Design'],
        link: '#',
        github: '#',
        accent: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
    },
    {
        title: 'School Platform',
        description: 'Designed and developed a fully functional school website tailored for seamless user experience and accessibility.',
        tech: ['HTML', 'CSS', 'JS', 'UI/UX'],
        link: '#',
        github: '#',
        accent: 'bg-neutral-900/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-900/10 dark:border-white/10'
    },
    {
        title: 'Nephricarn Business',
        description: 'A student-led business project selling burgers and beverages, featuring cohesive branding and promotional layout designs.',
        tech: ['Layouting', 'Pubmats', 'Branding'],
        link: '#',
        github: '#',
        accent: 'bg-neutral-900/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-900/10 dark:border-white/10'
    }
];

const Projects = () => (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <ScrollReveal direction="up" delay={0}>
            <div className="flex items-center gap-4 mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight transition-colors">Selected Work</h2>
                <div className="h-[1px] flex-grow bg-neutral-200 dark:bg-white/10 transition-colors"></div>
            </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 150} className="h-full">
                    <div
                        className="h-full group relative bg-white/60 dark:bg-neutral-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/40 dark:border-white/10 hover:border-white/60 dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-neutral-800/50 transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-xl shadow-neutral-200/50 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-2xl hover:shadow-neutral-200/80 dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                    >
                        <div className="p-6 sm:p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4 sm:mb-6">
                                <div className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide backdrop-blur-md transition-colors ${project.accent}`}>
                                    Project {idx + 1}
                                </div>
                                <div className="flex gap-2 text-neutral-500 dark:text-neutral-400">
                                    <a href={project.github} className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-all"><Github size={18} /></a>
                                    <a href={project.link} className="p-2 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-all"><ArrowUpRight size={18} /></a>
                                </div>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-2 sm:mb-3 tracking-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-neutral-600 dark:text-neutral-300 mb-6 sm:mb-8 flex-grow font-light leading-relaxed text-xs sm:text-sm transition-colors">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map((tech, techIdx) => (
                                    <span key={techIdx} className="text-xs font-medium px-3 py-1.5 bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-neutral-600 dark:text-neutral-300 rounded-full backdrop-blur-md shadow-sm transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

export default Projects;
