import React, { useState, useEffect, useRef } from 'react';

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const getDirectionClasses = () => {
        switch (direction) {
            case 'up': return 'translate-y-12';
            case 'down': return '-translate-y-12';
            case 'left': return '-translate-x-12';
            case 'right': return 'translate-x-12';
            case 'scale': return 'scale-90';
            default: return 'translate-y-12';
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : `opacity-0 ${getDirectionClasses()}`
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
