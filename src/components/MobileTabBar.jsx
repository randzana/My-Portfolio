import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './MobileTabBar.css';

const tabs = [
    { id: 'home',       label: 'Home',     icon: 'fa-solid fa-house',       sections: ['hero', 'about'] },
    { id: 'projects',   label: 'Projects', icon: 'fa-solid fa-code',        sections: ['projects'] },
    { id: 'skills',     label: 'Skills',   icon: 'fa-solid fa-layer-group', sections: ['skills', 'certificates'] },
    { id: 'experience', label: 'Work',     icon: 'fa-solid fa-briefcase',   sections: ['experience'] },
    { id: 'contact',    label: 'Contact',  icon: 'fa-solid fa-paper-plane', sections: ['contact'] },
];

export default function MobileTabBar() {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 900;
            setIsMobile(mobile);
            if (mobile) {
                document.body.classList.add('mobile-app-mode');
            } else {
                document.body.classList.remove('mobile-app-mode');
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

    const switchTab = useCallback((tabId) => {
        if (!isMobile) return;
        setActiveTab(tabId);
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
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            switchTab('home');
        } else {
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
            <div className="mtb-inner">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`mtb-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => switchTab(tab.id)}
                        aria-label={tab.label}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                                className="mtb-active-pill"
                                layoutId="mtbActivePill"
                                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                        )}
                        <i className={`mtb-icon ${tab.icon}`} />
                    </button>
                ))}
            </div>
        </nav>
    );
}
