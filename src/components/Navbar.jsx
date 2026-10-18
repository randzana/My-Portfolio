import { useState, useEffect, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
    useReducedMotion,
} from 'framer-motion';
import { LuArrowRight, LuArrowUp, LuMoon, LuSun } from 'react-icons/lu';
import { EASE_OUT, PILL_SPRING } from '../lib/motion';
import { focusElement, goToSection, scrollToElement } from '../lib/scroll';
import './Navbar.css';

const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Resume', id: 'resume' },
];

const CONDENSE_AT = 24;
const BACK_TO_TOP_AT = 600;

/* The floating back-to-top button only appears where the side gutter can
   hold it without covering content. Below that the sticky nav, the footer's
   "Back to top" and (in app mode) re-tapping the dock tab do the job. */
const GUTTER_FITS = '(min-width: 1400px)';
const subscribeGutter = onChange => {
    const media = window.matchMedia(GUTTER_FITS);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
};
const gutterFits = () => window.matchMedia(GUTTER_FITS).matches;

function readStoredTheme() {
    try {
        const saved = localStorage.getItem('theme');
        return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
        return null;
    }
}

function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// index.html applies the theme before first paint, so start from what is
// already on <html> and nothing flips on mount.
function initialTheme() {
    const applied = document.documentElement.dataset.theme;
    if (applied === 'light' || applied === 'dark') return applied;
    return readStoredTheme() ?? systemTheme();
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // Keep the browser chrome (mobile address bar) in step with the page.
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    if (bg) {
        document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
            meta.setAttribute('content', bg);
        });
    }
}

// <main> is never hidden (dock pages hide sections, not the landmark), so the
// skip link works on every page.
function skipToContent(event) {
    const main = document.getElementById('main');
    if (!main) return;
    event.preventDefault();
    scrollToElement(main);
    focusElement(main);
}

export default function Navbar() {
    const reduceMotion = useReducedMotion();
    const [condensed, setCondensed] = useState(() => window.scrollY > CONDENSE_AT);
    const [pastFold, setPastFold] = useState(() => window.scrollY > BACK_TO_TOP_AT);
    const [activeSection, setActiveSection] = useState('');
    const [footerInView, setFooterInView] = useState(false);
    const [theme, setTheme] = useState(initialTheme);
    const roomForTopButton = useSyncExternalStore(subscribeGutter, gutterFits);

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // The footer has its own "Back to top", so the floating one steps aside there.
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    // Follow the OS theme until the visitor picks one themselves.
    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = event => {
            if (!readStoredTheme()) setTheme(event.matches ? 'dark' : 'light');
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const y = window.scrollY;
            setCondensed(y > CONDENSE_AT);
            setPastFold(y > BACK_TO_TOP_AT);

            let current = '';
            document.querySelectorAll('section[id]').forEach(section => {
                if (y >= section.offsetTop - 220) current = section.id;
            });
            setActiveSection(current);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        // First measurement once the sections below have mounted.
        frame = requestAnimationFrame(update);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const toggleTheme = event => {
        const next = theme === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem('theme', next);
        } catch {
            /* storage blocked — the choice still applies for this visit */
        }

        const commit = () => {
            flushSync(() => setTheme(next));
            applyTheme(next);
        };

        if (!document.startViewTransition || reduceMotion) {
            commit();
            return;
        }

        // Reveal the new theme in a circle growing out of the toggle.
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const root = document.documentElement;

        root.classList.add('nav-theme-switching');
        const transition = document.startViewTransition(commit);
        transition.ready
            .then(() => {
                root.animate(
                    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                    { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
                );
            })
            .catch(() => {});
        transition.finished
            .catch(() => {})
            .finally(() => root.classList.remove('nav-theme-switching'));
    };

    const isDark = theme === 'dark';
    const ThemeIcon = isDark ? LuSun : LuMoon;
    const showTopButton = roomForTopButton && pastFold && !footerInView;

    return (
        <>
            <a href="#main" className="nav-skip" onClick={skipToContent}>Skip to content</a>

            <div className="nav-progress" aria-hidden="true">
                <motion.div className="nav-progress-bar" style={{ scaleX: progress }} />
            </div>

            <header className={`nav ${condensed ? 'is-condensed' : ''}`}>
                <nav className="nav-bar" aria-label="Primary">
                    <a
                        href="#hero"
                        className="nav-brand"
                        onClick={e => goToSection(e, 'hero')}
                        aria-label="Rand Zana — home"
                    >
                        <span className="nav-brand-tile" aria-hidden="true">RZ</span>
                        <span className="nav-brand-name" aria-hidden="true">
                            Rand Zana<span className="nav-brand-dot" />
                        </span>
                    </a>

                    <ul className="nav-links">
                        {navItems.map(item => {
                            const isActive = activeSection === item.id;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`nav-link ${isActive ? 'is-active' : ''}`}
                                        aria-current={isActive ? 'location' : undefined}
                                        onClick={e => goToSection(e, item.id)}
                                    >
                                        {isActive && (
                                            <motion.span
                                                className="nav-link-pill"
                                                layoutId="nav-active-pill"
                                                transition={PILL_SPRING}
                                            />
                                        )}
                                        <span className="nav-link-label">{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="nav-actions">
                        <button
                            type="button"
                            className="icon-btn nav-theme"
                            onClick={toggleTheme}
                            aria-label="Dark theme"
                            aria-pressed={isDark}
                            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={theme}
                                    className="nav-theme-icon"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                                    transition={{ duration: 0.25, ease: EASE_OUT }}
                                    aria-hidden="true"
                                >
                                    <ThemeIcon />
                                </motion.span>
                            </AnimatePresence>
                        </button>

                        <a href="#contact" className="btn btn-primary btn-sm nav-cta" onClick={e => goToSection(e, 'contact')}>
                            Let’s talk
                            <span className="btn-arrow" aria-hidden="true">
                                <LuArrowRight />
                            </span>
                        </a>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {showTopButton && (
                    <motion.button
                        key="back-to-top"
                        type="button"
                        className="icon-btn nav-top"
                        onClick={e => goToSection(e, 'hero')}
                        initial={{ opacity: 0, y: 16, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.85 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        aria-label="Back to top"
                        title="Back to top"
                    >
                        <LuArrowUp aria-hidden="true" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
