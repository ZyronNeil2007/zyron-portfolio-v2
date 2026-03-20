import React from 'react';
import { Terminal, Monitor, Code2, Palette, Coffee, Gamepad2, Film, Music } from 'lucide-react';

export const NAV_LINKS = ['Home', 'About', 'Projects', 'Contact'];

export const SKILLS = [
    { category: 'Programming', items: ['Java', 'Python', 'C++'], icon: <Terminal size={20} /> },
    { category: 'Web Development', items: ['HTML', 'CSS', 'JavaScript'], icon: <Monitor size={20} /> },
    { category: 'Tools', items: ['phpMyAdmin', 'VS Code'], icon: <Code2 size={20} /> },
    { category: 'Design', items: ['Layouting', 'Pubmats', 'UI Design'], icon: <Palette size={20} /> },
];

export const PROJECTS = [
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

export const FUN_FACTS = [
    { text: 'Loves coffee & chill coding', icon: <Coffee size={24} /> },
    { text: 'Plays Minecraft', icon: <Gamepad2 size={24} /> },
    { text: 'Enjoys movies, anime & BL', icon: <Film size={24} /> },
    { text: 'Into funk & pop music', icon: <Music size={24} /> },
];
