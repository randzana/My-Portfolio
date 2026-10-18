import { openDockTab, tabForSection } from './dock';

export const scrollBehavior = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const px = value => parseFloat(value) || 0;

// Layout position in the document. Ignores transforms, so a dock page that
// is still sliding in (dockPageIn) is measured where it will settle.
function documentTop(el) {
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    return top;
}

/* Where an anchor jump puts `el`: honours html scroll-padding-top and the
   element's scroll-margin-top (index.css on desktop, MobileTabBar.css in app
   mode), so links, dock taps and deep links all land a header in the same place. */
function landingTop(el) {
    const padding = px(getComputedStyle(document.documentElement).scrollPaddingTop);
    const margin = px(getComputedStyle(el).scrollMarginTop);
    return Math.max(0, documentTop(el) - margin - padding);
}

export function scrollToElement(el, behavior = scrollBehavior()) {
    window.scrollTo({ top: landingTop(el), behavior });
}

/* Moves keyboard focus without scrolling, so the next Tab (and a screen
   reader) continues from `el`. Non-focusable elements get a temporary
   tabindex="-1" that is dropped again on blur. */
export function focusElement(el) {
    if (!el.hasAttribute('tabindex') && !el.matches('a[href], button, input, select, textarea')) {
        el.setAttribute('tabindex', '-1');
        el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
    }
    el.focus({ preventScroll: true });
}

// Keeps the address bar in step without adding history entries. The hero is
// the home position, so it clears the fragment instead.
export function replaceHash(id) {
    const url = id && id !== 'hero' ? `#${id}` : `${location.pathname}${location.search}`;
    if (url === location.hash || (!location.hash && !url.startsWith('#'))) return;
    history.replaceState(history.state, '', url);
}

const hashId = hash => {
    try {
        return decodeURIComponent(String(hash ?? '').replace(/^#/, ''));
    } catch {
        return '';
    }
};

// The section id named by a URL fragment ("#contact" -> "contact"), or ''.
// Works before the sections have mounted (it only parses the string).
export const sectionIdFromHash = (hash = location.hash) => {
    const id = hashId(hash);
    return tabForSection(id) ? id : '';
};

/* The one way to jump to a section:
     <a href="#contact" onClick={e => goToSection(e, 'contact')}>
   Accepts "contact" or "#contact". Scrolls (smoothly unless reduced motion
   is on), moves keyboard focus to the section and writes its #hash to the
   address bar. In mobile-app-mode a section on another dock page has no
   layout box, so that page opens first and the scroll glides from its top. */
export function goToSection(event, idOrHash, { behavior = scrollBehavior(), focus = true, updateHash = true } = {}) {
    const id = hashId(idOrHash);
    const target = id ? document.getElementById(id) : null;
    if (!target) return false;

    if (target.getClientRects().length === 0) {
        const tab = tabForSection(id);
        if (!tab || !openDockTab(tab.id, { focusHeading: false })) return false;
        event?.preventDefault();
        // Let the new page paint at its top for a frame before gliding down.
        requestAnimationFrame(() => scrollToElement(target, behavior));
    } else {
        event?.preventDefault();
        scrollToElement(target, behavior);
    }

    if (focus) focusElement(target);
    if (updateHash) replaceHash(id);
    return true;
}

// Deep links: lands on the section named in the URL. Returns false if none.
export function landOnHash({ behavior = 'instant', focus = true } = {}) {
    const id = sectionIdFromHash();
    if (!id) return false;
    return goToSection(null, id, { behavior, focus, updateHash: false });
}

const readingLine = () => px(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 24;

/* The section (or footer) under the reading line and how far through it the
   reader is, so a layout switch across 900px (rotating a tablet) can put
   them back in the same place. */
export function readingPosition() {
    const line = readingLine();
    for (const el of document.querySelectorAll('section[id], footer')) {
        if (el.getClientRects().length === 0) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > line) {
            return { el, fraction: Math.min(1, Math.max(0, (line - rect.top) / rect.height)) };
        }
    }
    return null;
}

export function restoreReadingPosition({ el, fraction }) {
    if (el.getClientRects().length === 0) return;
    const top = documentTop(el) + fraction * el.offsetHeight - readingLine();
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
}
