import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import {
    DOCK_TABS,
    FOOTER_TAB,
    SITE_TITLE,
    findTab,
    isAppModeWidth,
    pageTitle,
    registerDock,
    tabForElement,
    tabForSection,
} from '../lib/dock';
import {
    focusElement,
    landOnHash,
    readingPosition,
    replaceHash,
    restoreReadingPosition,
    scrollBehavior,
    sectionIdFromHash,
} from '../lib/scroll';
import './MobileTabBar.css';

const SPRING = { type: 'spring', stiffness: 520, damping: 40, mass: 0.9 };

// Fields that bring up the on-screen keyboard.
const TEXT_FIELD =
    'textarea, select, input:not([type="checkbox"], [type="radio"], [type="button"], [type="submit"], [type="reset"], [type="range"], [type="color"], [type="file"], [type="image"])';
const isTextField = el => Boolean(el?.matches?.(TEXT_FIELD));

// Shows only the sections of `tabId` (and the footer only on Contact):
// each dock tab behaves like its own page.
function showPage(tabId) {
    const tab = findTab(tabId);
    if (!tab) return;
    document.querySelectorAll('section[id]').forEach(section => {
        const onPage = tab.sections.includes(section.id);
        section.style.display = onPage ? '' : 'none';
        section.classList.toggle('mobile-page', onPage);
    });
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = tabId === FOOTER_TAB ? '' : 'none';
}

// Back to the normal one-page layout.
function showAllSections() {
    document.querySelectorAll('section[id]').forEach(section => {
        section.style.display = '';
        section.classList.remove('mobile-page');
    });
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = '';
}

// The page's first heading: where focus goes when the page changes.
const pageHeading = tab => document.getElementById(tab.sections[0])?.querySelector('h1, h2') ?? null;

// A deep link (/#contact) opens straight on its page; otherwise Home.
// Parses the hash only: the sections haven't mounted yet on first render.
function initialTab() {
    if (!isAppModeWidth()) return 'home';
    return tabForSection(sectionIdFromHash())?.id ?? 'home';
}

export default function MobileTabBar() {
    const [isMobile, setIsMobile] = useState(isAppModeWidth);
    const [activeTab, setActiveTab] = useState(initialTab);
    const [announcement, setAnnouncement] = useState('');
    // Where the reader is, recorded while the layout matches the viewport,
    // and the place to restore after a switch between the two layouts.
    const lastPosition = useRef(null);
    const pendingRestore = useRef(null);

    useLayoutEffect(() => {
        if (!isMobile) return undefined;
        const { body } = document;
        body.classList.add('mobile-app-mode');
        return () => body.classList.remove('mobile-app-mode');
    }, [isMobile]);

    // Lay out the active page (or the whole one-page site) before paint, so
    // the wrong layout never flashes; then put the reader back after a
    // switch between the two.
    useLayoutEffect(() => {
        if (isMobile) {
            showPage(activeTab);
            document.title = pageTitle(findTab(activeTab));
        } else {
            showAllSections();
            document.title = SITE_TITLE;
        }
        const restore = pendingRestore.current;
        pendingRestore.current = null;
        if (restore) restoreReadingPosition(restore);
        lastPosition.current = readingPosition();
    }, [isMobile, activeTab]);

    // By the time a resize event arrives the page has already been re-laid
    // out at the new width, so the reading position is sampled on scroll
    // beforehand, skipping frames where the layout and viewport disagree.
    useEffect(() => {
        let frame = 0;
        const record = () => {
            frame = 0;
            if (document.body.classList.contains('mobile-app-mode') !== isAppModeWidth()) return;
            lastPosition.current = readingPosition();
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(record);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // Rotating a tablet across 900px keeps the visitor's place instead of
    // throwing them back to Home.
    useEffect(() => {
        const onResize = () => {
            const mobile = isAppModeWidth();
            if (mobile === isMobile) return;
            const position = lastPosition.current ?? readingPosition();
            pendingRestore.current = position;
            flushSync(() => {
                if (mobile) setActiveTab((position && tabForElement(position.el)?.id) || 'home');
                else setAnnouncement('');
                setIsMobile(mobile);
            });
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [isMobile]);

    // Opens a page at its top. Used by dock taps and, through lib/dock.js,
    // by goToSection (which then moves focus to its own target).
    const openTab = useCallback((tabId, { focusHeading = true } = {}) => {
        const tab = findTab(tabId);
        if (!tab) return;
        flushSync(() => setActiveTab(tabId));
        window.scrollTo({ top: 0, behavior: 'instant' });
        replaceHash(tab.sections[0]);
        setAnnouncement(`${tab.label} page`);
        if (focusHeading) {
            const heading = pageHeading(tab);
            if (heading) focusElement(heading);
        }
    }, []);

    useEffect(() => (isMobile ? registerDock(openTab) : undefined), [isMobile, openTab]);

    // Deep links and hash changes land on their section in both layouts.
    useEffect(() => {
        let landedAt = null;
        const land = () => {
            if (landOnHash()) landedAt = window.scrollY;
        };
        // Late fonts or images above the target can still push it down: land
        // once more if the visitor hasn't scrolled away in the meantime.
        const settle = () => {
            if (landedAt === null || Math.abs(window.scrollY - landedAt) > 2) return;
            if (landOnHash({ focus: false })) landedAt = window.scrollY;
        };
        // On a desktop reload the browser's own scroll restoration wins.
        const isReload = performance.getEntriesByType?.('navigation')[0]?.type === 'reload';
        const frame = !isReload || isAppModeWidth() ? requestAnimationFrame(land) : 0;
        document.fonts?.ready.then(() => requestAnimationFrame(settle));
        if (document.readyState !== 'complete') window.addEventListener('load', settle, { once: true });

        const onHashChange = () => landOnHash({ behavior: scrollBehavior() });
        window.addEventListener('hashchange', onHashChange);
        return () => {
            cancelAnimationFrame(frame);
            landedAt = null;
            window.removeEventListener('load', settle);
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    // While a text field has focus the dock steps aside: browsers that resize
    // the viewport for the keyboard would otherwise float it over the form.
    useEffect(() => {
        if (!isMobile) return undefined;
        const { body } = document;
        const onFocusIn = event => body.classList.toggle('dock-typing', isTextField(event.target));
        const onFocusOut = event => {
            if (!isTextField(event.relatedTarget)) body.classList.remove('dock-typing');
        };
        body.classList.toggle('dock-typing', isTextField(document.activeElement));
        document.addEventListener('focusin', onFocusIn);
        document.addEventListener('focusout', onFocusOut);
        return () => {
            document.removeEventListener('focusin', onFocusIn);
            document.removeEventListener('focusout', onFocusOut);
            body.classList.remove('dock-typing');
        };
    }, [isMobile]);

    const onTabClick = tab => {
        if (tab.id !== activeTab) {
            openTab(tab.id);
            return;
        }
        // Re-tapping the current tab returns to its top, like an iOS tab bar.
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
        const heading = pageHeading(tab);
        if (heading) focusElement(heading);
    };

    if (!isMobile) return null;

    return (
        <>
            <nav className="dock" aria-label="Mobile navigation">
                <div className="dock-inner">
                    {DOCK_TABS.map(tab => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <motion.button
                                key={tab.id}
                                type="button"
                                layout
                                transition={SPRING}
                                className={`dock-tab ${isActive ? 'is-active' : ''}`}
                                onClick={() => onTabClick(tab)}
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
                                <motion.span
                                    className="dock-icon"
                                    layout="position"
                                    transition={SPRING}
                                    aria-hidden="true"
                                >
                                    <Icon />
                                </motion.span>
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
            <p className="sr-only" role="status">
                {announcement}
            </p>
        </>
    );
}
