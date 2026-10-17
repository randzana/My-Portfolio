// Dock tab (its aria-label in MobileTabBar) that displays each section in mobile-app-mode.
const DOCK_TAB = {
    hero: 'Home',
    about: 'Home',
    projects: 'Projects',
    skills: 'Skills',
    certificates: 'Skills',
    experience: 'Work',
    resume: 'Work',
    contact: 'Contact',
};

export const scrollBehavior = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/* Click handler for in-page links: <a href="#contact" onClick={e => goToSection(e, 'contact')}>.
   Scrolls instead of jumping. In mobile-app-mode a section on another dock
   page has no layout boxes, so we switch to that page first (which jumps to
   its top), then glide to the section. Accepts "contact" or "#contact". */
export function goToSection(event, idOrHash) {
    const id = idOrHash.replace(/^#/, '');
    const target = document.getElementById(id);
    if (!target) return;
    event?.preventDefault();

    if (target.getClientRects().length === 0) {
        const tab = [...document.querySelectorAll(`button[aria-label="${DOCK_TAB[id]}"]`)].find(
            el => el.getClientRects().length > 0
        );
        if (!tab) return;
        tab.click();
        requestAnimationFrame(() =>
            requestAnimationFrame(() => target.scrollIntoView({ behavior: scrollBehavior() }))
        );
        return;
    }
    target.scrollIntoView({ behavior: scrollBehavior() });
}
