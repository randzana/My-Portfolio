import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Theme initialization (localStorage -> system setting -> default dark)
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowScrollTop(window.scrollY > 500);

            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 220) {
                    current = s.id;
                }
            });
            setActiveSection(current);

            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                setScrollProgress((window.scrollY / totalScroll) * 100);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const scrollTo = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="scroll-progress-container">
                    <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
                </div>

                <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <span className="logo-text">RZ</span>
                    <span className="logo-dot">.</span>
                </a>

                {/* Desktop nav links */}
                <div className="nav-links-desktop">
                    {navItems.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                            onClick={e => scrollTo(e, item.href)}
                        >
                            {item.label}
                            {activeSection === item.href.slice(1) && (
                                <motion.span 
                                    className="nav-indicator"
                                    layoutId="navActiveIndicator"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}
                    
                    {/* Theme Toggle Button */}
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
                    </button>

                    <a
                        href="#contact"
                        className="nav-cta"
                        onClick={e => scrollTo(e, '#contact')}
                    >
                        <i className="fa-solid fa-paper-plane" /> Let's Talk
                    </a>
                </div>

                {/* Mobile actions container */}
                <div className="nav-right-mobile">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
                    </button>
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <i className={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile full-screen overlay */}
            <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
                <button
                    className="mobile-close-btn"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <i className="fa-solid fa-times" />
                </button>

                <div className="mobile-nav-content">
                    {navItems.map((item, i) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="mobile-link"
                            onClick={e => scrollTo(e, item.href)}
                            style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms' }}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="btn btn-primary mobile-cta"
                        onClick={e => scrollTo(e, '#contact')}
                        style={{ transitionDelay: menuOpen ? '320ms' : '0ms' }}
                    >
                        <i className="fa-solid fa-paper-plane" /> Let's Talk
                    </a>
                </div>
            </div>

            {/* Back to top button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        className="scroll-to-top-btn"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        initial={{ opacity: 0, scale: 0.7, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: 15 }}
                        whileHover={{ scale: 1.1, translateY: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        aria-label="Scroll to top"
                    >
                        <i className="fa-solid fa-arrow-up" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
