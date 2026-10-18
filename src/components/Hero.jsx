import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    AnimatePresence,
    animate,
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'framer-motion';
import {
    LuArrowDown,
    LuArrowRight,
    LuDownload,
    LuMapPin,
    LuPause,
    LuPlay,
    LuTrophy,
} from 'react-icons/lu';
import { EASE_OUT } from '../lib/motion';
import { CV_FILE, CV_FILENAME } from '../lib/profile';
import { goToSection } from '../lib/scroll';
import './Hero.css';

const PORTRAIT = '/portrait.jpg';
const PORTRAIT_SM = '/portrait-sm.jpg';
// Keep in sync with the preload's `imagesizes` in index.html.
const PORTRAIT_SIZES = '(max-width: 900px) 340px, (max-width: 1400px) 30vw, 420px';

// localStorage key for the visitor's "pause motion" choice.
const MOTION_KEY = 'motion';

const ROLES = ['Software Engineer', 'Videographer', 'Content Creator', 'Brand Strategist'];

const STATS = [
    { target: 4, suffix: '+', label: 'Years Exp.' },
    { target: 7, suffix: '+', label: 'Projects' },
    { target: 12, suffix: '+', label: 'Technologies' },
    { target: 100, suffix: '%', label: 'Passion' },
];

// Disciplines are set in the serif italic and tools in the sans, so the strip
// reads as an editorial line rather than a tag cloud.
const MARQUEE = [
    { label: 'Software Engineering', serif: true },
    { label: 'React' },
    { label: 'Next.js' },
    { label: 'Laravel' },
    { label: 'PostgreSQL' },
    { label: 'TypeScript' },
    { label: 'Flutter' },
    { label: 'Docker' },
    { label: 'Figma' },
    { label: 'Videography', serif: true },
    { label: 'Premiere Pro' },
    { label: 'After Effects' },
    { label: 'Content Creation', serif: true },
    { label: 'Branding', serif: true },
];

function readMotionPaused() {
    try {
        return localStorage.getItem(MOTION_KEY) === 'paused';
    } catch {
        return false;
    }
}

/* Counts up once the stat is half in view. Reduced motion shows the final value. */
function Counter({ target }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const reduceMotion = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView || reduceMotion) return;
        const controls = animate(0, target, {
            duration: 1.8,
            ease: EASE_OUT,
            onUpdate: v => setValue(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, reduceMotion, target]);

    return <span ref={ref}>{reduceMotion ? target : value}</span>;
}

/* Cycles the role line under the headline. It only ticks while the hero is on
   screen (a hidden dock page counts as off screen) and stops when the visitor
   pauses motion or prefers reduced motion. The slot has a fixed size in CSS,
   so swapping roles never shifts the layout below it. */
function RotatingRole({ paused }) {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0 });
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const running = inView && !paused && !reduceMotion;

    useEffect(() => {
        if (!running) return;
        // Background tabs get no animation frames, so advancing there would
        // queue exit transitions that never finish and leave the slot blank.
        const id = setInterval(() => {
            if (document.hidden) return;
            setIndex(i => (i + 1) % ROLES.length);
        }, 2600);
        return () => clearInterval(id);
    }, [running]);

    return (
        <p className="hero-role" ref={ref}>
            <span className="sr-only">{ROLES.join(', ')}</span>
            <span className="hero-role-prefix" aria-hidden="true">
                {'//'}
            </span>
            <span className="hero-role-slot" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={ROLES[index]}
                        className="hero-role-word"
                        initial={{ opacity: 0, y: '60%', filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: '-60%', filter: 'blur(4px)' }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                    >
                        {ROLES[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        </p>
    );
}

/* Portrait card with a calm pointer tilt; the glass chips drift a little
   further than the card for depth. Mouse only, and off for reduced motion. */
function HeroPortrait() {
    const reduceMotion = useReducedMotion();
    const ref = useRef(null);

    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const spring = { stiffness: 120, damping: 20, mass: 0.6 };
    const sx = useSpring(px, spring);
    const sy = useSpring(py, spring);
    const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
    const chipX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
    const chipY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
    const shineX = useTransform(sx, [-0.5, 0.5], ['20%', '80%']);
    const shineY = useTransform(sy, [-0.5, 0.5], ['15%', '85%']);

    const handleMove = e => {
        if (reduceMotion || e.pointerType !== 'mouse') return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        px.set(0);
        py.set(0);
    };

    const chipIn = delay => ({
        initial: { opacity: 0, y: 14, scale: 0.94 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { delay, duration: 0.7, ease: EASE_OUT },
    });

    return (
        <motion.div
            ref={ref}
            className="hero-portrait"
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: EASE_OUT }}
        >
            <motion.div className="hero-card" style={{ rotateX, rotateY }}>
                <div className="hero-photo">
                    {/* The LCP image: preloaded in index.html, decoded synchronously. */}
                    <img
                        src={PORTRAIT}
                        srcSet={`${PORTRAIT_SM} 500w, ${PORTRAIT} 1000w`}
                        sizes={PORTRAIT_SIZES}
                        width="1000"
                        height="1502"
                        alt="Rand Zana"
                        fetchPriority="high"
                    />
                    <span className="hero-frame-marks" aria-hidden="true" />
                    <motion.span
                        className="hero-sheen"
                        style={{ '--shine-x': shineX, '--shine-y': shineY }}
                        aria-hidden="true"
                    />
                </div>
            </motion.div>

            <motion.div className="hero-chip hero-chip--award" {...chipIn(0.75)}>
                <motion.div className="hero-chip-inner" style={{ x: chipX, y: chipY }}>
                    <span className="hero-chip-icon hero-chip-icon--accent" aria-hidden="true">
                        <LuTrophy />
                    </span>
                    <span className="hero-chip-text">
                        <strong>Zanko Award</strong>
                        <span>2nd place · 2026</span>
                    </span>
                </motion.div>
            </motion.div>

            <motion.div className="hero-chip hero-chip--role" {...chipIn(0.9)}>
                <motion.div className="hero-chip-inner" style={{ x: chipX, y: chipY }}>
                    <span className="hero-chip-icon hero-chip-icon--mark" aria-hidden="true">
                        RZ
                    </span>
                    <span className="hero-chip-text">
                        <strong>Rand Zana</strong>
                        <span>Engineer · Videographer</span>
                    </span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

/* Full-bleed strip of disciplines and tools. The CSS loop is paused while the
   strip is off screen, by the visitor's toggle (html[data-motion]) and, on
   mouse devices, on hover. The toggle sits in the strip's clear right end. */
function Marquee({ paused, onToggle }) {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0 });

    return (
        <motion.div
            ref={ref}
            className={`hero-marquee${inView ? '' : ' is-offscreen'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
        >
            <div className="hero-marquee-viewport" aria-hidden="true">
                <div className="hero-marquee-track">
                    {[0, 1].map(copy => (
                        <ul className="hero-marquee-list" key={copy}>
                            {MARQUEE.map(item => (
                                <li key={item.label}>
                                    <span className={item.serif ? 'serif' : undefined}>
                                        {item.label}
                                    </span>
                                    <span className="hero-marquee-sep">✦</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>

            {/* A toggle keeps one name and reports its state through aria-pressed;
                the visible hint says what a click will do next. */}
            <button
                type="button"
                className="hero-motion"
                aria-label="Pause motion"
                aria-pressed={paused}
                data-hint={paused ? 'Play motion' : 'Pause motion'}
                onClick={onToggle}
            >
                {paused ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />}
            </button>
        </motion.div>
    );
}

/* Orchestration lives on the parent's own variant — `staggerChildren` in a
   bare `transition` prop is ignored unless the parent is variant-driven. */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const titleStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

// Each headline line slides up from behind its own clipping mask.
const lineUp = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 1, ease: EASE_OUT } },
};

// MotionConfig only drops transforms under reduced motion, so the blur is
// removed here by hand (same as Reveal).
function riseVariants(reduceMotion) {
    if (reduceMotion) {
        return {
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
        };
    }
    return {
        hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
        show: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: EASE_OUT },
            transitionEnd: { filter: 'none' },
        },
    };
}

export default function Hero() {
    const reduceMotion = useReducedMotion();
    const rise = riseVariants(reduceMotion);
    const [motionPaused, setMotionPaused] = useState(readMotionPaused);

    // index.css pauses every CSS animation under html[data-motion="paused"];
    // applied before paint so a saved choice never shows a frame of motion.
    useLayoutEffect(() => {
        const root = document.documentElement;
        if (motionPaused) root.dataset.motion = 'paused';
        else delete root.dataset.motion;
    }, [motionPaused]);

    const toggleMotion = () => {
        const next = !motionPaused;
        setMotionPaused(next);
        try {
            if (next) localStorage.setItem(MOTION_KEY, 'paused');
            else localStorage.removeItem(MOTION_KEY);
        } catch {
            /* storage blocked: the choice lasts for this visit only */
        }
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-backdrop bg-grid" aria-hidden="true" />

            <div className="container hero-inner">
                <div className="hero-main">
                    <motion.div
                        className="hero-copy"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div className="hero-meta" variants={rise}>
                            <span className="hero-status">
                                <span className="status-dot" aria-hidden="true" />
                                Available for opportunities
                            </span>
                            <span className="hero-loc">
                                <LuMapPin aria-hidden="true" />
                                Koya, Kurdistan
                            </span>
                        </motion.div>

                        <motion.h1 className="hero-title" variants={titleStagger}>
                            <span className="hero-line">
                                <motion.span variants={lineUp}>I build digital</motion.span>
                            </span>
                            <span className="hero-line">
                                <motion.span variants={lineUp}>
                                    <em className="serif">experiences</em> that
                                </motion.span>
                            </span>
                            <span className="hero-line">
                                <motion.span variants={lineUp}>
                                    {/* The full stop stays real text (the heading reads
                                        "matter."); CSS paints the brand's round dot over it. */}
                                    matter<span className="hero-title-dot">.</span>
                                </motion.span>
                            </span>
                        </motion.h1>

                        <motion.div variants={rise}>
                            <RotatingRole paused={motionPaused} />
                        </motion.div>

                        <motion.p className="hero-desc" variants={rise}>
                            I craft elegant digital experiences — from architecting clean, reliable
                            systems to shooting cinematic stories and building brands that stand out.
                        </motion.p>

                        <motion.div className="hero-ctas" variants={rise}>
                            <a
                                href="#projects"
                                className="btn btn-primary btn-lg hero-cta-main"
                                onClick={e => goToSection(e, 'projects')}
                            >
                                View my work
                                <span className="btn-arrow" aria-hidden="true">
                                    <LuArrowRight />
                                </span>
                            </a>
                            <a href={CV_FILE} download={CV_FILENAME} className="btn btn-secondary btn-lg">
                                <LuDownload aria-hidden="true" />
                                Download CV
                            </a>
                            <a
                                href="#contact"
                                className="btn btn-ghost btn-lg"
                                onClick={e => goToSection(e, 'contact')}
                            >
                                Get in touch
                            </a>
                        </motion.div>
                    </motion.div>

                    <HeroPortrait />
                </div>

                <motion.div
                    className="hero-band"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: EASE_OUT }}
                >
                    <ul className="hero-stats">
                        {STATS.map(s => (
                            <li className="hero-stat" key={s.label}>
                                <span className="hero-stat-num" aria-hidden="true">
                                    <Counter target={s.target} />
                                    <span className="hero-stat-suffix">{s.suffix}</span>
                                </span>
                                <span className="sr-only">
                                    {s.target}
                                    {s.suffix}
                                </span>
                                <span className="hero-stat-label">{s.label}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="hero-band-end">
                        <a
                            href="#about"
                            className="hero-scroll"
                            aria-label="Scroll to About"
                            onClick={e => goToSection(e, 'about')}
                        >
                            Scroll
                            <span className="hero-scroll-icon" aria-hidden="true">
                                <LuArrowDown />
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>

            <Marquee paused={motionPaused} onToggle={toggleMotion} />
        </section>
    );
}
