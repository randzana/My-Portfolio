import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 200) current = s.id;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="logo-text">RZ</span>
                <span className="logo-dot">.</span>
            </a>

            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                {navItems.map(item => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={activeSection === item.href.slice(1) ? 'active' : ''}
                        onClick={e => scrollTo(e, item.href)}
                    >
                        {item.label}
                        {activeSection === item.href.slice(1) && (
                            <motion.span className="nav-indicator" layoutId="navIndicator" />
                        )}
                    </a>
                ))}
                <a
                    href="#contact"
                    className="nav-cta"
                    onClick={e => scrollTo(e, '#contact')}
                >
                    <i className="fas fa-paper-plane" /> Let's Talk
                </a>
            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>

            {/* Mobile overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-nav-content">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="mobile-link"
                                    onClick={e => scrollTo(e, item.href)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                className="btn btn-primary mobile-cta"
                                onClick={e => scrollTo(e, '#contact')}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <i className="fas fa-paper-plane" /> Let's Talk
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
