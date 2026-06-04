import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MobileTabBar.css';

const tabs = [
    { id: 'home',       label: 'Home',       icon: 'fa-solid fa-house',          sections: ['hero', 'about'] },
    { id: 'projects',   label: 'Projects',   icon: 'fa-solid fa-code',           sections: ['projects'] },
    { id: 'skills',     label: 'Skills',     icon: 'fa-solid fa-layer-group',    sections: ['skills', 'certificates'] },
    { id: 'experience', label: 'Work',       icon: 'fa-solid fa-briefcase',      sections: ['experience'] },
    { id: 'contact',    label: 'Contact',    icon: 'fa-solid fa-paper-plane',    sections: ['contact'] },
];

export default function MobileTabBar() {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 900;
            setIsMobile(mobile);

            if (mobile) {
                document.body.classList.add('mobile-app-mode');
            } else {
                document.body.classList.remove('mobile-app-mode');
                // Restore all sections on desktop
                document.querySelectorAll('section[id]').forEach(s => {
                    s.style.display = '';
                });
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
            document.body.classList.remove('mobile-app-mode');
        };
    }, []);

    // Show/hide sections based on active tab (mobile only)
    const switchTab = useCallback((tabId) => {
        if (!isMobile) return;

        setActiveTab(tabId);

        const tab = tabs.find(t => t.id === tabId);
        if (!tab) return;

        // Hide all sections
        document.querySelectorAll('section[id]').forEach(s => {
            s.style.display = 'none';
            s.classList.remove('mobile-page');
        });

        // Show only the active tab's sections
        tab.sections.forEach(sectionId => {
            const el = document.getElementById(sectionId);
            if (el) {
                el.style.display = '';
                el.classList.add('mobile-page');
            }
        });

        // Also handle footer visibility (show on contact tab)
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = tabId === 'contact' ? '' : 'none';
        }

        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [isMobile]);

    // Initialize: hide non-home sections on mobile
    useEffect(() => {
        if (isMobile) {
            switchTab('home');
        } else {
            // Restore everything on desktop
            document.querySelectorAll('section[id]').forEach(s => {
                s.style.display = '';
                s.classList.remove('mobile-page');
            });
            const footer = document.querySelector('footer');
            if (footer) footer.style.display = '';
        }
    }, [isMobile, switchTab]);

    if (!isMobile) return null;

    return (
        <nav className="mobile-tab-bar" aria-label="Mobile navigation">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`mtb-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => switchTab(tab.id)}
                    aria-label={tab.label}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                    <span className="mtb-dot" />
                    <i className={`mtb-icon ${tab.icon}`} />
                    <span className="mtb-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
}
