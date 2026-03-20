import React, { useState, useEffect } from 'react';
import { Home, User, Layers, Mail } from 'lucide-react';

const FloatingTabBar = () => {
    const [activeTab, setActiveTab] = useState('home');

    // Scroll Spy to automatically highlight active tab as you scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'contact'];
            let current = 'home';
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If the top of the section is above the middle of the screen
                    if (rect.top <= window.innerHeight / 2) {
                        current = section;
                    }
                }
            }
            setActiveTab(current);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger immediately to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const tabs = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'projects', label: 'Projects', icon: Layers },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] md:hidden">
            <div className="flex justify-around items-center px-2 py-2 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-500">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <a
                            key={tab.id}
                            href={`#${tab.id}`}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-3xl transition-all duration-300 group"
                        >
                            {/* Active Background Pill Fill */}
                            <div className={`absolute inset-0 bg-yellow-400/10 dark:bg-yellow-400/10 rounded-3xl -z-10 transition-transform duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>

                            {/* Icon */}
                            <Icon
                                size={22}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={`mb-1 transition-all duration-300 ${isActive ? 'text-yellow-600 dark:text-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 group-hover:scale-105'}`}
                            />

                            {/* Label */}
                            <span className={`text-[10px] font-medium tracking-wide transition-all duration-300 ${isActive ? 'text-yellow-700 dark:text-yellow-400' : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200'}`}>
                                {tab.label}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default FloatingTabBar;
