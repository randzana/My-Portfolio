import {
    useCallback,
    useEffect,
    useEffectEvent,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useIsPresent, useReducedMotion } from 'framer-motion';
import {
    LuSearch,
    LuX,
    LuChevronLeft,
    LuChevronRight,
    LuChevronDown,
    LuMaximize2,
    LuImageOff,
    LuSearchX,
} from 'react-icons/lu';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import FilterTabs from './ui/FilterTabs';
import { trackSpotlight } from '../lib/spotlight';
import { EASE_OUT, LAYOUT_SPRING, cardVariants } from '../lib/motion';
import { pad } from '../lib/format';
import './Certificates.css';

// Curated order: highlights first, then roughly newest to oldest.
// `color` is the issuer's brand colour, used only for the small issuer dot.
// `height` is the scan's height at 1024px wide (Sololearn scans are 1024 × 722).
const CERTIFICATES = [
    {
        title: 'The Complete Python Bootcamp From Zero to Hero in Python',
        issuer: 'Udemy',
        date: '20 July 2026',
        image: '/certificates/udemy-python-bootcamp.webp',
        height: 761,
        color: '#a435f0',
        category: 'coding',
    },
    {
        title: 'Zanko Award (2nd Place)',
        issuer: 'Koya University',
        date: '18 June 2026',
        image: '/certificates/koya-zanko-award.webp',
        height: 735,
        color: '#15803d',
        category: 'coding',
        badge: 'Award',
    },
    {
        title: 'Leader of the SOFTSPACE Group',
        issuer: 'Koya University, Faculty of Engineering',
        date: 'Academic Year 2025–2026',
        image: '/certificates/koya-softspace-leader.webp',
        height: 682,
        color: '#0d56a6',
        category: 'coding',
        badge: 'Leadership',
    },
    {
        title: 'SOFTSPACE trip to HITEX, led by Rand',
        issuer: 'SOFTSPACE Group, Koya University',
        date: 'Academic Year 2025–2026',
        image: '/certificates/softspace-hitex-trip.webp',
        height: 768,
        color: '#0d56a6',
        category: 'networking',
        badge: 'Leadership',
    },
    {
        title: 'SmartSuli AI Hackathon: our team',
        issuer: 'SmartSuli, The Foundation',
        date: 'September 2026',
        image: '/certificates/hackathon-team.webp',
        height: 768,
        color: '#2563eb',
        category: 'ai',
        badge: 'Hackathon',
    },
    {
        title: 'SmartSuli AI Hackathon: Channel 8 interview',
        issuer: 'SmartSuli, The Foundation',
        date: 'September 2026',
        image: '/certificates/hackathon-interview.webp',
        height: 768,
        color: '#2563eb',
        category: 'ai',
        badge: 'Hackathon',
    },
    {
        title: 'SmartSuli AI Hackathon: at The Foundation',
        issuer: 'SmartSuli, The Foundation',
        date: 'September 2026',
        image: '/certificates/hackathon-wall.webp',
        height: 768,
        color: '#2563eb',
        category: 'ai',
        badge: 'Hackathon',
    },
    {
        title: 'Introduction to ERP with Odoo',
        issuer: 'Koya Lab, The Foundation',
        date: '13 May 2025',
        image: '/certificates/koya-odoo-erp.webp',
        height: 768,
        color: '#875a7b',
        category: 'coding',
    },
    {
        title: 'Storytelling in the Digital Era',
        issuer: 'Koya Lab, The Foundation',
        date: 'September 2024',
        image: '/certificates/koya-storytelling.webp',
        height: 679,
        color: '#875a7b',
        category: 'networking',
    },
    {
        title: 'Getting Started with Cisco Packet Tracer',
        issuer: 'Cisco Networking Academy',
        date: '01 March 2026',
        image: '/certificates/cisco-packet-tracer.webp',
        height: 677,
        color: '#049fd9',
        category: 'networking',
    },
    {
        title: 'Web Development',
        issuer: 'Sololearn',
        date: '02 January 2026',
        image: '/certificates/sololearn-web-dev.webp',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'Generative AI in Practice',
        issuer: 'Sololearn',
        date: '29 December 2024',
        image: '/certificates/sololearn-gen-ai.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Write with AI',
        issuer: 'Sololearn',
        date: '29 December 2024',
        image: '/certificates/sololearn-write-ai.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Brainstorm with AI',
        issuer: 'Sololearn',
        date: '31 December 2024',
        image: '/certificates/sololearn-brainstorm.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'AI-Powered A/B Testing',
        issuer: 'Sololearn',
        date: '30 December 2024',
        image: '/certificates/sololearn-ab-testing.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Think Creatively with AI',
        issuer: 'Sololearn',
        date: '23 December 2024',
        image: '/certificates/sololearn-think-creatively.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'AI in Data Analysis',
        issuer: 'Sololearn',
        date: '23 December 2024',
        image: '/certificates/sololearn-ai-data-analysis.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Prompt Engineering',
        issuer: 'Sololearn',
        date: '22 December 2024',
        image: '/certificates/sololearn-prompt-eng.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Introduction to LLMs',
        issuer: 'Sololearn',
        date: '22 December 2024',
        image: '/certificates/sololearn-intro-llms.webp',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Social Media Marketing with AI',
        issuer: 'Sololearn',
        date: '22 December 2024',
        image: '/certificates/sololearn-social-media-marketing.webp',
        color: '#e8573a',
        category: 'networking',
    },
    {
        title: 'Java Intermediate',
        issuer: 'Sololearn',
        date: '25 October 2024',
        image: '/certificates/sololearn-java-intermediate.webp',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'SQL Intermediate',
        issuer: 'Sololearn',
        date: '11 September 2024',
        image: '/certificates/sololearn-sql.webp',
        color: '#e8573a',
        category: 'database',
    },
    {
        title: 'Introduction to SQL',
        issuer: 'Sololearn',
        date: '30 August 2024',
        image: '/certificates/sololearn-intro-sql.webp',
        color: '#e8573a',
        category: 'database',
    },
    {
        title: 'Introduction to C#',
        issuer: 'Sololearn',
        date: 'August 2024',
        image: '/certificates/sololearn-csharp.webp',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'Intro to Machine Learning',
        issuer: 'Kaggle',
        date: 'April 2024',
        image: '/certificates/kaggle-ml.webp',
        height: 631,
        color: '#20beff',
        category: 'ai',
    },
    {
        title: 'Tech for Everyone',
        issuer: 'Sololearn',
        date: '30 March 2024',
        image: '/certificates/sololearn-tech.webp',
        color: '#e8573a',
        category: 'networking',
    },
    {
        title: 'Introduction to Java',
        issuer: 'Sololearn',
        date: 'March 2024',
        image: '/certificates/sololearn-java.webp',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'Intro to Programming',
        issuer: 'Kaggle',
        date: 'February 2024',
        image: '/certificates/kaggle-programming.webp',
        height: 631,
        color: '#20beff',
        category: 'coding',
    },
];

const CATEGORIES = [
    { id: 'all', label: 'All Achievements' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'coding', label: 'Software Eng.' },
    { id: 'database', label: 'Databases & SQL' },
    { id: 'networking', label: 'Net & Marketing' },
].map(cat => ({
    ...cat,
    count: cat.id === 'all' ? CERTIFICATES.length : CERTIFICATES.filter(c => c.category === cat.id).length,
}));

// Every scan ships as <name>.webp (1024w, used by the viewer) and <name>-640.webp.
const SCAN_WIDTH = 1024;
const SCAN_HEIGHT = 722;
const thumbOf = image => image.replace(/\.webp$/, '-640.webp');

// Rendered width of a card's scan per grid layout (see Certificates.css), so
// even 2× screens pick the 640w file for the grid.
const CARD_IMAGE_SIZES =
    '(max-width: 480px) 120px, (max-width: 900px) calc(50vw - 70px), (max-width: 1080px) calc(33vw - 75px), 260px';

// Grid columns per breakpoint, mirroring Certificates.css.
const COLUMN_QUERIES = [
    ['(max-width: 480px)', 1],
    ['(max-width: 900px)', 2],
    ['(max-width: 1080px)', 3],
];

function currentColumns() {
    const match = COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches);
    return match ? match[1] : 4;
}

function subscribeColumns(onChange) {
    const lists = COLUMN_QUERIES.map(([query]) => window.matchMedia(query));
    lists.forEach(list => list.addEventListener('change', onChange));
    return () => lists.forEach(list => list.removeEventListener('change', onChange));
}

const useGridColumns = () => useSyncExternalStore(subscribeColumns, currentColumns, () => 4);

// A certificate scan, or a themed placeholder if the file is missing.
// Render it with key={src} so a new image gets a fresh error state.
function CertImage({ src, alt, className, ...rest }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <span className={`certs-fallback ${className ?? ''}`} role="img" aria-label={alt}>
                <LuImageOff aria-hidden="true" />
                <span className="certs-fallback__text">Image pending</span>
            </span>
        );
    }

    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}

// `ref` comes from AnimatePresence: popLayout needs it to lift a leaving
// card out of the flow straight away.
function CertCard({ cert, delay, variants, onOpen, ref }) {
    return (
        <motion.li
            ref={ref}
            // Position-only: scaling a card mid-reflow would smear its text.
            layout="position"
            className="certs-item"
            variants={variants}
            custom={delay}
            initial="hidden"
            whileInView="shown"
            exit="gone"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ layout: LAYOUT_SPRING }}
        >
            <button
                type="button"
                className="certs-card card card-hover spotlight"
                style={{ '--cert-color': cert.color }}
                data-cert={cert.title}
                aria-haspopup="dialog"
                aria-label={`View certificate: ${cert.title}, ${cert.issuer}, ${cert.date}`}
                onPointerMove={trackSpotlight}
                onClick={event => onOpen(cert, event.currentTarget)}
            >
                <span className="certs-card__frame">
                    <span className="certs-card__media">
                        <CertImage
                            key={cert.image}
                            src={cert.image}
                            srcSet={`${thumbOf(cert.image)} 640w, ${cert.image} ${SCAN_WIDTH}w`}
                            sizes={CARD_IMAGE_SIZES}
                            alt={`${cert.title} certificate`}
                            className="certs-card__img"
                            width={SCAN_WIDTH}
                            height={cert.height ?? SCAN_HEIGHT}
                            loading="lazy"
                            decoding="async"
                        />
                    </span>
                    <span className="certs-card__view" aria-hidden="true">
                        <LuMaximize2 />
                    </span>
                </span>

                <span className="certs-card__body">
                    <span className="certs-card__issuer">
                        <span className="certs-dot" aria-hidden="true" />
                        <span className="certs-card__issuer-name">{cert.issuer}</span>
                    </span>
                    <span className="certs-card__title">{cert.title}</span>
                    <span className="certs-card__foot">
                        <span className="certs-card__date">{cert.date}</span>
                        {cert.badge && (
                            <span className="certs-card__badge chip chip-mono chip-accent">{cert.badge}</span>
                        )}
                    </span>
                </span>
            </button>
        </motion.li>
    );
}

const FOCUSABLE = 'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])';

// Keeps Tab / Shift+Tab cycling inside the open dialog.
function trapFocus(event, container) {
    if (!container) return;
    const nodes = [...container.querySelectorAll(FOCUSABLE)];
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const inside = container.contains(document.activeElement);
    if (event.shiftKey && (document.activeElement === first || !inside)) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
        event.preventDefault();
        first.focus();
    }
}

function Lightbox({ items, index, onStep, onClose }) {
    const reduceMotion = useReducedMotion();
    // False while the viewer fades out: keys then belong to the page again.
    const isPresent = useIsPresent();
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const [direction, setDirection] = useState(1);
    const cert = items[index];
    const multiple = items.length > 1;

    const go = useCallback(
        dir => {
            setDirection(dir);
            onStep(dir);
        },
        [onStep],
    );

    // Freeze the page behind the dialog (keeping the scrollbar's width so
    // nothing shifts) and move focus into it.
    useEffect(() => {
        const { body, documentElement } = document;
        const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
        const scrollbar = window.innerWidth - documentElement.clientWidth;
        body.style.overflow = 'hidden';
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
        closeRef.current?.focus({ preventScroll: true });
        return () => {
            body.style.overflow = previous.overflow;
            body.style.paddingRight = previous.paddingRight;
        };
    }, []);

    useEffect(() => {
        if (!isPresent) return;
        const onKeyDown = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            } else if (event.key === 'ArrowRight' && multiple) {
                event.preventDefault();
                go(1);
            } else if (event.key === 'ArrowLeft' && multiple) {
                event.preventDefault();
                go(-1);
            } else if (event.key === 'Tab') {
                trapFocus(event, dialogRef.current);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [go, onClose, multiple, isPresent]);

    // Swipe between certificates on touch screens (and drag with a mouse).
    const onDragEnd = (event, info) => {
        const swipe = info.offset.x + info.velocity.x * 0.2;
        if (swipe < -60) go(1);
        else if (swipe > 60) go(-1);
    };

    // Variants (not inline targets) so the leaving slide reads the *new*
    // direction through AnimatePresence's `custom`.
    const offset = reduceMotion ? 0 : 28;
    const slide = {
        enter: dir => ({ opacity: 0, x: dir * offset }),
        center: { opacity: 1, x: 0 },
        leave: dir => ({ opacity: 0, x: dir * -offset }),
    };

    return (
        <motion.div
            className="certs-lb"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
        >
            <motion.div
                ref={dialogRef}
                className="certs-lb__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="certs-lb-title"
                aria-describedby="certs-lb-meta"
                onClick={event => event.stopPropagation()}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                style={{ '--cert-color': cert.color }}
            >
                <div className="certs-lb__frame">
                    <AnimatePresence initial={false} mode="wait" custom={direction}>
                        <motion.div
                            key={cert.image}
                            className={`certs-lb__slide${multiple ? ' is-draggable' : ''}`}
                            custom={direction}
                            variants={slide}
                            initial="enter"
                            animate="center"
                            exit="leave"
                            transition={{ duration: 0.2, ease: EASE_OUT }}
                            drag={multiple ? 'x' : false}
                            dragSnapToOrigin
                            dragElastic={0.5}
                            onDragEnd={onDragEnd}
                        >
                            <CertImage
                                key={cert.image}
                                src={cert.image}
                                alt={`${cert.title} certificate from ${cert.issuer}`}
                                className="certs-lb__img"
                                width={SCAN_WIDTH}
                                height={cert.height ?? SCAN_HEIGHT}
                                draggable={false}
                                decoding="async"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="certs-lb__info">
                    <div className="certs-lb__text">
                        <h3 id="certs-lb-title" className="certs-lb__title">{cert.title}</h3>
                        <p id="certs-lb-meta" className="certs-lb__meta">
                            <span className="certs-dot" aria-hidden="true" />
                            <span>
                                {cert.issuer} <span className="certs-lb__sep" aria-hidden="true">·</span> {cert.date}
                            </span>
                        </p>
                    </div>

                    <div className="certs-lb__controls">
                        {multiple && (
                            <>
                                <p className="certs-lb__counter">
                                    <span className="sr-only">Certificate </span>
                                    <span className="certs-lb__counter-num">{pad(index + 1)}</span>
                                    <span className="certs-lb__counter-sep" aria-hidden="true">/</span>
                                    <span className="sr-only"> of </span>
                                    {pad(items.length)}
                                </p>
                                <button
                                    type="button"
                                    className="icon-btn certs-lb__btn"
                                    aria-label="Previous certificate"
                                    onClick={() => go(-1)}
                                >
                                    <LuChevronLeft aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="icon-btn certs-lb__btn"
                                    aria-label="Next certificate"
                                    onClick={() => go(1)}
                                >
                                    <LuChevronRight aria-hidden="true" />
                                </button>
                                <span className="certs-lb__divider" aria-hidden="true" />
                            </>
                        )}
                        <button
                            ref={closeRef}
                            type="button"
                            className="icon-btn certs-lb__btn certs-lb__close"
                            aria-label="Close certificate viewer"
                            onClick={onClose}
                        >
                            <LuX aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Certificates() {
    const reduceMotion = useReducedMotion();
    const [category, setCategory] = useState('all');
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [activeTitle, setActiveTitle] = useState(null);

    const gridRef = useRef(null);
    const searchRef = useRef(null);
    const toggleRef = useRef(null);
    const toggleTopRef = useRef(null);
    const openerRef = useRef(null);
    const openedTitleRef = useRef(null);

    // Two full rows by default: 2 × 4 on desktop, 3 × 3 at three columns and
    // 4 × 2 on tablets, so no row is left half empty.
    const columns = useGridColumns();
    const limit = columns * Math.ceil(8 / columns);

    const variants = useMemo(() => cardVariants(reduceMotion), [reduceMotion]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return CERTIFICATES.filter(cert => {
            const inCategory = category === 'all' || cert.category === category;
            const matches = !q || cert.title.toLowerCase().includes(q) || cert.issuer.toLowerCase().includes(q);
            return inCategory && matches;
        });
    }, [category, query]);

    // Only worth a click when it hides at least a full row (and never a lone card).
    const collapsible = results.length - limit >= Math.max(columns, 2);
    const visible = collapsible && !expanded ? results.slice(0, limit) : results;
    const filtered = category !== 'all' || query.trim() !== '';
    const countNoun = filtered ? (results.length === 1 ? 'result' : 'results') : 'credentials';

    const activeIndex = activeTitle ? results.findIndex(c => c.title === activeTitle) : -1;
    const isOpen = activeIndex >= 0;

    const openCert = (cert, opener) => {
        openerRef.current = opener;
        openedTitleRef.current = cert.title;
        setActiveTitle(cert.title);
    };

    // The viewer pages through every result, not only the cards on screen.
    const stepCert = useCallback(
        dir => {
            setActiveTitle(title => {
                // Ignore keys pressed while the viewer is fading out.
                if (title === null || results.length === 0) return title;
                const i = results.findIndex(c => c.title === title);
                return results[(i + dir + results.length) % results.length].title;
            });
        },
        [results],
    );

    const closeCert = useCallback(() => setActiveTitle(null), []);

    // Back to whatever opened the viewer. When that can't take focus (an
    // in-page jump focuses the section only until it blurs), fall back to
    // the certificate's own card.
    const returnFocus = useEffectEvent(() => {
        const opener = openerRef.current;
        openerRef.current = null;
        if (opener?.isConnected) opener.focus({ preventScroll: true });
        if (opener && document.activeElement === opener) return;
        const card = [...(gridRef.current?.querySelectorAll('[data-cert]') ?? [])].find(
            node => node.dataset.cert === openedTitleRef.current,
        );
        card?.focus({ preventScroll: true });
    });

    // While the viewer is open the page behind it is inert, so screen readers
    // that ignore aria-modal (iOS VoiceOver swipes) can't wander into it.
    // The viewer is portalled outside #root and stays live.
    useEffect(() => {
        if (!isOpen) return;
        const root = document.getElementById('root');
        const wasInert = root?.inert ?? false;
        if (root) root.inert = true;
        return () => {
            if (root) root.inert = wasInert;
            returnFocus();
        };
    }, [isOpen]);

    // Other sections can ask for a certificate by its exact title:
    //   window.dispatchEvent(new CustomEvent('certs:open', { detail: { title } }))
    // Filters are cleared first if they would hide it.
    const onOpenRequest = useEffectEvent(event => {
        const cert = CERTIFICATES.find(c => c.title === event.detail?.title);
        if (!cert) return;
        if (!results.includes(cert)) {
            setCategory('all');
            setQuery('');
        }
        const focused = document.activeElement;
        openCert(cert, focused instanceof HTMLElement && focused !== document.body ? focused : null);
    });

    useEffect(() => {
        const onOpen = event => onOpenRequest(event);
        window.addEventListener('certs:open', onOpen);
        return () => window.removeEventListener('certs:open', onOpen);
    }, []);

    const clearSearch = () => {
        setQuery('');
        searchRef.current?.focus();
    };

    const resetFilters = () => {
        setQuery('');
        setCategory('all');
        searchRef.current?.focus();
    };

    const toggleExpanded = () => {
        // Collapsing removes rows above the button; remember where it was so
        // it can stay under the pointer instead of jumping up the page.
        if (expanded && toggleRef.current) {
            toggleTopRef.current = toggleRef.current.getBoundingClientRect().top;
        }
        setExpanded(value => !value);
    };

    useLayoutEffect(() => {
        const before = toggleTopRef.current;
        toggleTopRef.current = null;
        if (before === null || !toggleRef.current) return;
        const delta = toggleRef.current.getBoundingClientRect().top - before;
        if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: 'instant' });
    }, [expanded]);

    return (
        <section id="certificates" className="certs">
            <div className="container">
                <SectionHeader
                    index="05"
                    label="Certificates"
                    title={<>Certificates & <em className="serif">courses</em></>}
                    desc={
                        <>
                            Continuous learning through <span className="certs-nowrap">industry-recognized</span>{' '}
                            platforms and certifications.
                        </>
                    }
                />

                <Reveal className="certs-toolbar" y={16} blur={false}>
                    <FilterTabs
                        items={CATEGORIES}
                        value={category}
                        onChange={setCategory}
                        label="Filter certificates by category"
                        layoutId="certs-filter-pill"
                        className="certs-tabs"
                    />

                    <div className="certs-toolbar__end">
                        <div className="certs-search" role="search">
                            <LuSearch className="certs-search__icon" aria-hidden="true" />
                            <input
                                ref={searchRef}
                                type="search"
                                className="certs-search__input"
                                placeholder="Search certificates…"
                                aria-label="Search certificates by title or issuer"
                                autoComplete="off"
                                spellCheck="false"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="certs-search__clear"
                                    aria-label="Clear search"
                                    onClick={clearSearch}
                                >
                                    <LuX aria-hidden="true" />
                                </button>
                            )}
                        </div>
                        <p className="certs-count" aria-live="polite" aria-atomic="true">
                            <span className="certs-count__num">{results.length}</span> {countNoun}
                        </p>
                    </div>
                </Reveal>

                <ul id="certs-grid" ref={gridRef} className="certs-grid" aria-label="Certificates">
                    <AnimatePresence mode="popLayout">
                        {visible.map((cert, i) => (
                            <CertCard
                                key={cert.title}
                                cert={cert}
                                delay={(i % columns) * 0.06}
                                variants={variants}
                                onOpen={openCert}
                            />
                        ))}
                    </AnimatePresence>
                </ul>

                {results.length === 0 && (
                    <motion.div
                        className="certs-empty"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                    >
                        <span className="certs-empty__icon" aria-hidden="true">
                            <LuSearchX />
                        </span>
                        <p className="certs-empty__title">No certificates found matching your criteria.</p>
                        <p className="certs-empty__hint">Try another keyword or category.</p>
                        <button type="button" className="btn btn-secondary btn-sm certs-empty__btn" onClick={resetFilters}>
                            Reset filters
                        </button>
                    </motion.div>
                )}

                {collapsible && (
                    <div className="certs-more">
                        <span className="certs-more__rule" aria-hidden="true" />
                        <button
                            ref={toggleRef}
                            type="button"
                            className="btn btn-secondary btn-sm certs-more__btn"
                            aria-expanded={expanded}
                            aria-controls="certs-grid"
                            onClick={toggleExpanded}
                        >
                            {expanded ? 'Show less' : `Show all ${results.length}`}
                            <LuChevronDown className="certs-more__icon" aria-hidden="true" />
                        </button>
                        <span className="certs-more__rule" aria-hidden="true" />
                    </div>
                )}
            </div>

            {/* Portalled to <body>, outside #root: a transformed ancestor (dock
                page transitions, reveals) would otherwise trap position: fixed,
                and #root goes inert while it's open. */}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <Lightbox
                            key="certs-lightbox"
                            items={results}
                            index={activeIndex}
                            onStep={stepCert}
                            onClose={closeCert}
                        />
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </section>
    );
}
