import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import FloatingTabBar from './components/FloatingTabBar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
    const [theme, setTheme] = useState('dark');

    // Theme auto-sync and persistent storage logic
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(prefersDark ? 'dark' : 'light');
        }

        // Auto-listen to system changes if user hasn't explicitly set a preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-yellow-400/30 selection:text-yellow-900 dark:selection:text-yellow-200 relative overflow-hidden transition-colors duration-500">

                {/* Background Ambient Glows - Adjusted for both modes */}
                <div className="fixed top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-yellow-400/20 dark:bg-yellow-500/10 blur-[120px] -z-0 pointer-events-none transition-colors duration-500" />
                <div className="fixed bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/10 dark:bg-white/5 blur-[150px] -z-0 pointer-events-none transition-colors duration-500" />
                <div className="fixed top-[40%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-rose-400/10 dark:bg-neutral-500/10 blur-[100px] -z-0 pointer-events-none transition-colors duration-500" />

                <Navbar theme={theme} toggleTheme={toggleTheme} />
                <FloatingTabBar />

                {/* Added pb-28 on mobile so footer isn't hidden behind the dock */}
                <main className="relative z-10 pb-28 md:pb-0">
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                </main>

                <Footer />
            </div>
        </div>
    );
}