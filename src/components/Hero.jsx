import { useEffect, useRef, useState } from 'react';
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'framer-motion';
import ParticleField from './ParticleField';
import './Hero.css';

const PORTRAIT = '/portrait.jpg';
const PORTRAIT_SM = '/portrait-sm.jpg';

const ROLES = ['Software Engineer', 'Videographer', 'Content Creator', 'Brand Strategist'];

const STATS = [
    { target: 4, suffix: '+', label: 'Years Exp.' },
    { target: 7, suffix: '+', label: 'Projects' },
    { target: 12, suffix: '+', label: 'Technologies' },
    { target: 100, suffix: '%', label: 'Passion' },
];

function Counter({ target, suffix = '+' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let timer;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let current = 0;
                    const step = target / 120;
                    timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(current));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            clearInterval(timer);
        };
    }, [target]);

    return (
        <span ref={ref} className="stat-number">
            {count}
            {suffix}
        </span>
    );
}

/* Cycles the role line under the headline. Height is fixed in CSS so the
   swap never shifts the layout below it. */
function RotatingRole() {
    const [index, setIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;
        // Background tabs get no animation frames, so advancing there would
        // queue exit transitions that never finish and leave the slot blank.
        const id = setInterval(() => {
            if (document.hidden) return;
            setIndex(i => (i + 1) % ROLES.length);
        }, 2600);
        return () => clearInterval(id);
    }, [reduceMotion]);

    return (
        <div className="hero-role" aria-label={ROLES.join(', ')}>
            <span className="hero-role-prefix">{'//'}</span>
            <span className="hero-role-slot">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={ROLES[index]}
                        className="hero-role-word"
                        initial={{ opacity: 0, y: '55%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        exit={{ opacity: 0, y: '-55%' }}
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {ROLES[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        </div>
    );
}

/* Portrait card with a pointer-driven 3D tilt. Disabled for coarse pointers
   and when the user asks for reduced motion. */
function HeroPortrait() {
    const reduceMotion = useReducedMotion();
    const cardRef = useRef(null);

    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const spring = { stiffness: 140, damping: 18, mass: 0.6 };
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);
    const shineX = useTransform(px, [-0.5, 0.5], ['20%', '80%']);
    const shineY = useTransform(py, [-0.5, 0.5], ['15%', '85%']);

    const handleMove = e => {
        if (reduceMotion || e.pointerType !== 'mouse') return;
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        px.set(0);
        py.set(0);
    };

    return (
        <motion.div
            className="hero-portrait-wrap"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="portrait-glow portrait-glow-warm" />
            <div className="portrait-glow portrait-glow-accent" />
            <div className="portrait-grid" aria-hidden="true" />

            <motion.div
                ref={cardRef}
                className="hero-portrait"
                style={{ rotateX, rotateY }}
                onPointerMove={handleMove}
                onPointerLeave={handleLeave}
            >
                <div className="portrait-frame">
                    <img
                        src={PORTRAIT}
                        srcSet={`${PORTRAIT_SM} 500w, ${PORTRAIT} 1000w`}
                        sizes="(max-width: 380px) 210px, (max-width: 900px) 250px, 430px"
                        alt="Rand Zana"
                        fetchPriority="high"
                        decoding="async"
                    />
                    <div className="portrait-scrim" />
                    <motion.div
                        className="portrait-sheen"
                        style={{ '--shine-x': shineX, '--shine-y': shineY }}
                    />
                </div>

                <div className="portrait-chip">
                    <span className="portrait-chip-dot" />
                    <span className="portrait-chip-text">
                        <strong>Rand Zana</strong>
                        <em>Engineer · Videographer</em>
                    </span>
                </div>
            </motion.div>

            <div className="portrait-accent-line" aria-hidden="true" />
        </motion.div>
    );
}

/* Orchestration lives on the parent's own variant — `staggerChildren` in a bare
   `transition` prop is ignored unless the parent is itself variant-driven. */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-gradient-1" />
            <div className="hero-gradient-2" />
            <div className="hero-mesh" aria-hidden="true" />
            <ParticleField count={45} />

            <div className="hero-inner">
                <motion.div
                    className="hero-content"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="hero-badge"
                        variants={rise}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <span className="badge-dot" />
                        <span>Available for opportunities</span>
                    </motion.div>

                    <motion.h1 variants={rise} transition={{ duration: 0.6, ease: 'easeOut' }}>
                        I Build <span className="hero-gradient-text">Digital Experiences</span>
                        <br />
                        That Matter
                    </motion.h1>

                    <motion.div variants={rise} transition={{ duration: 0.6, ease: 'easeOut' }}>
                        <RotatingRole />
                    </motion.div>

                    <motion.p
                        className="hero-desc"
                        variants={rise}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        I craft elegant digital experiences — from architecting clean, reliable
                        systems to shooting cinematic stories and building brands that stand out.
                    </motion.p>

                    <motion.div
                        className="hero-buttons"
                        variants={rise}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <a
                            href="#projects"
                            className="btn btn-primary"
                            onClick={e => {
                                e.preventDefault();
                                document
                                    .querySelector('#projects')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <i className="fa-solid fa-rocket" /> View My Work
                        </a>
                        <a
                            href="#contact"
                            className="btn btn-outline"
                            onClick={e => {
                                e.preventDefault();
                                document
                                    .querySelector('#contact')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <i className="fa-solid fa-paper-plane" /> Get in Touch
                        </a>
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        variants={rise}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        {STATS.map((s, i) => (
                            <div className="stat-group" key={s.label}>
                                {i > 0 && <div className="stat-divider" />}
                                <div className="stat">
                                    <Counter target={s.target} suffix={s.suffix} />
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <HeroPortrait />
            </div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() =>
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                }
            >
                <span>Scroll</span>
                <div className="scroll-line">
                    <div className="scroll-dot" />
                </div>
            </motion.div>
        </section>
    );
}
