import { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import './MobileTabBar.css';

const MOBILE_MAX = 900;

const tabs = [
    { id: 'home',       label: 'Home',     icon: 'fa-solid fa-house',       sections: ['hero', 'about'] },
    { id: 'projects',   label: 'Projects', icon: 'fa-solid fa-code',        sections: ['projects'] },
    { id: 'skills',     label: 'Skills',   icon: 'fa-solid fa-layer-group', sections: ['skills', 'certificates'] },
    { id: 'experience', label: 'Work',     icon: 'fa-solid fa-briefcase',   sections: ['experience', 'resume'] },
    { id: 'contact',    label: 'Contact',  icon: 'fa-solid fa-paper-plane', sections: ['contact'] },
];

const SPRING = { type: 'spring', stiffness: 520, damping: 40, mass: 0.9 };

// Shows only the sections of `tabId` (the footer only on Contact) and
// jumps back to the top — each tab behaves like its own page.
function showTab(tabId) {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;
    document.querySelectorAll('section[id]').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('mobile-page');
    });
    tab.sections.forEach(sectionId => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.style.display = '';
            el.classList.add('mobile-page');
        }
    });
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = tabId === 'contact' ? '' : 'none';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Back to the normal one-page layout.
function showAll() {
    document.querySelectorAll('section[id]').forEach(s => {
        s.style.display = '';
        s.classList.remove('mobile-page');
    });
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = '';
}

const isMobileWidth = () => window.innerWidth <= MOBILE_MAX;

export default function MobileTabBar() {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobile, setIsMobile] = useState(isMobileWidth);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = isMobileWidth();
            setIsMobile(mobile);
            // Re-entering mobile mode always starts on Home.
            if (!mobile) setActiveTab('home');
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Switch the page into (or out of) app mode before paint, so the
    // full one-page layout never flashes on a phone.
    useLayoutEffect(() => {
        if (!isMobile) {
            showAll();
            return undefined;
        }
        document.body.classList.add('mobile-app-mode');
        showTab('home');
        return () => document.body.classList.remove('mobile-app-mode');
    }, [isMobile]);

    const switchTab = tabId => {
        if (!isMobile) return;
        setActiveTab(tabId);
        showTab(tabId);
    };

    if (!isMobile) return null;

    return (
        <nav className="dock" aria-label="Mobile navigation">
            <div className="dock-inner">
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                        <motion.button
                            key={tab.id}
                            type="button"
                            layout
                            transition={SPRING}
                            className={`dock-tab ${isActive ? 'is-active' : ''}`}
                            onClick={() => switchTab(tab.id)}
                            aria-label={tab.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {isActive && (
                                <motion.span
                                    className="dock-pill"
                                    layoutId="dock-active-pill"
                                    transition={SPRING}
                                    style={{ borderRadius: 999 }}
                                />
                            )}
                            <motion.i layout="position" transition={SPRING} className={`dock-icon ${tab.icon}`} aria-hidden="true" />
                            {isActive && (
                                <motion.span
                                    className="dock-label"
                                    layout="position"
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ ...SPRING, opacity: { duration: 0.2, delay: 0.08 } }}
                                    aria-hidden="true"
                                >
                                    {tab.label}
                                </motion.span>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </nav>
    );
}
