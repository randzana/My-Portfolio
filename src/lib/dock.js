import { LuBriefcase, LuCodeXml, LuHouse, LuLayers, LuSend } from 'react-icons/lu';

/* The mobile "app" (≤900px, body.mobile-app-mode) shows one dock page at a
   time. This is the only place that says which sections each page holds:
   MobileTabBar renders it, lib/scroll.js uses it for cross-page jumps.
   QA tooling finds the dock buttons by these labels, so keep them as is. */
export const DOCK_TABS = [
    { id: 'home', label: 'Home', icon: LuHouse, sections: ['hero', 'about'] },
    { id: 'projects', label: 'Projects', icon: LuCodeXml, sections: ['projects'] },
    { id: 'skills', label: 'Skills', icon: LuLayers, sections: ['skills', 'certificates'] },
    { id: 'experience', label: 'Work', icon: LuBriefcase, sections: ['experience', 'resume'] },
    { id: 'contact', label: 'Contact', icon: LuSend, sections: ['contact'] },
];

// The footer is only shown on this page.
export const FOOTER_TAB = 'contact';

// Same breakpoint as the CSS (max-width: 900px); both count the scrollbar.
export const APP_MODE_MAX = 900;
export const isAppModeWidth = () => window.innerWidth <= APP_MODE_MAX;

export const findTab = id => DOCK_TABS.find(tab => tab.id === id) ?? null;
export const tabForSection = id => DOCK_TABS.find(tab => tab.sections.includes(id)) ?? null;
export const tabForElement = el => (el.tagName === 'FOOTER' ? findTab(FOOTER_TAB) : tabForSection(el.id));

// Home keeps the <title> from index.html; other pages read "Projects · Rand Zana".
export const SITE_TITLE = document.title;
export const pageTitle = tab => (!tab || tab.id === 'home' ? SITE_TITLE : `${tab.label} · Rand Zana`);

/* goToSection opens a page through this hook rather than clicking a dock
   button, so nothing depends on button labels. MobileTabBar registers its
   opener while app mode is on. */
let opener = null;

export function registerDock(open) {
    opener = open;
    return () => {
        if (opener === open) opener = null;
    };
}

// Returns false when the dock isn't there (desktop layout).
export function openDockTab(tabId, options) {
    if (!opener) return false;
    opener(tabId, options);
    return true;
}
