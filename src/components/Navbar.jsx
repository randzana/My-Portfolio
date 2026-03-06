import { useState, useEffect } from 'react';
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
                                <span className="nav-indicator" />
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
            </nav>

            {/* Mobile full-screen overlay */}
            <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
                {/* Close button inside the overlay */}
                <button
                    className="mobile-close-btn"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <i className="fas fa-times" />
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
                        <i className="fas fa-paper-plane" /> Let's Talk
                    </a>
                </div>
            </div>
        </>
    );
}
