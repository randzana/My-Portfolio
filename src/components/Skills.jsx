import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
    LuCodeXml,
    LuServer,
    LuDatabase,
    LuLayers,
    LuBrainCircuit,
    LuChartColumn,
    LuSmartphone,
    LuWrench,
    LuClapperboard,
    LuMegaphone,
    LuPenTool,
    LuNetwork,
    LuArrowRight,
} from 'react-icons/lu';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { trackSpotlight } from '../lib/spotlight';
import { EASE_OUT } from '../lib/motion';
import './Skills.css';

// Order matters: it sets each card's 01–12 index and, with the dense grid,
// lets the featured full-stack card interlock with its neighbours.
const SKILLS = [
    {
        Icon: LuCodeXml,
        title: 'Frontend Development',
        desc: 'Building responsive, accessible, and performant user interfaces with modern frameworks.',
        techs: ['React.js', 'React.tsx', 'Vue.js', 'Vue.tsx', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
        category: 'tech',
    },
    {
        Icon: LuServer,
        title: 'Backend Development',
        desc: 'Designing robust APIs and microservices with scalable architectures.',
        techs: ['Laravel'],
        category: 'tech',
    },
    {
        Icon: LuDatabase,
        title: 'Database',
        desc: 'Managing data at scale with modern databases and cloud-native solutions.',
        techs: ['PostgreSQL', 'MySQL', 'MongoDB'],
        category: 'tech',
    },
    {
        Icon: LuLayers,
        title: 'Full-Stack Development',
        desc: 'Orchestrating robust end-to-end applications.',
        areasLabel: 'Key areas to master',
        areas: [
            'System Design & Patterns',
            'RESTful / GraphQL APIs',
            'Client & Server-side State Management',
            'Web Security (CORS, CSRF, JWT)',
            'Database Optimization (indexing)',
            'Deployment Pipelines (Docker, CI/CD)',
        ],
        techs: ['React/Next.js', 'Laravel', 'PostgreSQL', 'System Design', 'APIs & Security', 'Docker/Git'],
        category: 'tech',
        featured: true,
    },
    {
        Icon: LuBrainCircuit,
        title: 'AI & Machine Learning',
        desc: 'Building AI agents and machine-learning models that automate real-world tasks.',
        techs: ['Python'],
        category: 'tech',
    },
    {
        Icon: LuChartColumn,
        title: 'Data Analysis',
        desc: 'Extracting insights and making data-informed decisions through structured analytical thinking.',
        techs: ['Curiosity', 'Understanding Context', 'Technical Mindset', 'Data Strategy'],
        category: 'tech',
    },
    {
        Icon: LuSmartphone,
        title: 'Mobile Development',
        desc: 'Creating cross-platform mobile experiences that feel truly native.',
        techs: ['Flutter', 'Kotlin'],
        category: 'tech',
    },
    {
        Icon: LuWrench,
        title: 'DevOps & Tools',
        desc: 'Streamlining development workflows with version control, containerization, and automated pipelines.',
        techs: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Kubernetes'],
        category: 'tech',
    },
    {
        Icon: LuClapperboard,
        title: 'Videography & Editing',
        desc: 'Producing cinematic videos from concept to final cut — shooting, color grading, motion graphics.',
        techs: ['Premiere Pro', 'CapCut', 'After Effects', 'Drone'],
        category: 'creative',
    },
    {
        Icon: LuMegaphone,
        title: 'Marketing Management',
        desc: 'Building brand strategies, running campaigns, and driving growth through data-driven marketing.',
        techs: ['SEO/SEM', 'Google Ads', 'Meta Ads', 'Analytics', 'Email Marketing'],
        category: 'marketing',
    },
    {
        Icon: LuPenTool,
        title: 'Content Creation',
        desc: 'Crafting compelling stories across platforms — from social media to YouTube.',
        techs: ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Photoshop'],
        category: 'creative',
    },
    {
        Icon: LuNetwork,
        title: 'Networking & Cybersecurity',
        desc: 'Exploring computer networks, protocol suites, and modern cybersecurity strategies.',
        techs: [],
        category: 'tech',
    },
].map((skill, i) => ({ ...skill, index: String(i + 1).padStart(2, '0') }));

const CATEGORIES = [
    { id: 'all', label: 'All Toolkit' },
    { id: 'tech', label: 'Tech & Development' },
    { id: 'creative', label: 'Media & Creative' },
    { id: 'marketing', label: 'Brand & Marketing' },
].map(cat => ({
    ...cat,
    count: cat.id === 'all' ? SKILLS.length : SKILLS.filter(s => s.category === cat.id).length,
}));

const pad = n => String(n).padStart(2, '0');

// Keeps hyphenated compounds ("end-to-end", "data-driven") on one line so
// narrow cards never break them at the hyphen.
function keepCompounds(text) {
    return text.split(/(\S+-\S+)/g).map((part, i) =>
        i % 2 ? <span key={i} className="skills-nowrap">{part}</span> : part,
    );
}

const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 };
const LAYOUT_SPRING = { type: 'spring', stiffness: 360, damping: 36, mass: 0.9 };

function cardVariants(reduceMotion) {
    return {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' },
        shown: delay => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.7, ease: EASE_OUT, delay },
            transitionEnd: { filter: 'none' },
        }),
        gone: reduceMotion
            ? { opacity: 0, transition: { duration: 0.15 } }
            : { opacity: 0, scale: 0.96, transition: { duration: 0.22, ease: EASE_OUT } },
    };
}

function SkillCard({ skill, delay, fill, variants, ref }) {
    const { Icon, title, desc, techs, areas, areasLabel, featured, index } = skill;
    const className = [
        'skills-card card card-hover spotlight',
        featured && 'skills-card--featured',
        fill && 'skills-card--fill',
    ].filter(Boolean).join(' ');

    return (
        <motion.article
            ref={ref}
            // Position-only layout animation: cards change height as rows
            // reflow, and scaling them would smear the text mid-flight.
            layout="position"
            className={className}
            variants={variants}
            custom={delay}
            initial="hidden"
            whileInView="shown"
            exit="gone"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ layout: LAYOUT_SPRING }}
            onPointerMove={trackSpotlight}
        >
            {featured && <span className="skills-feat__grid bg-grid" aria-hidden="true" />}

            <div className="skills-card__top">
                <span className="skills-card__icon" aria-hidden="true">
                    <Icon />
                </span>
                <span className="skills-card__meta">
                    {featured && <span className="skills-card__tag chip chip-mono chip-accent">Primary focus</span>}
                    <span className="skills-card__index" aria-hidden="true">{index}</span>
                </span>
            </div>

            <div className="skills-card__body">
                <h3 className="skills-card__title">{title}</h3>
                <p className="skills-card__desc">{keepCompounds(desc)}</p>
            </div>

            {areas && (
                <div className="skills-feat__areas">
                    <p className="skills-feat__label eyebrow" id={`skills-areas-${index}`}>{areasLabel}</p>
                    <ol className="skills-feat__list" aria-labelledby={`skills-areas-${index}`}>
                        {areas.map((area, i) => (
                            <li key={area}>
                                <span className="skills-feat__num" aria-hidden="true">{pad(i + 1)}</span>
                                <span>{keepCompounds(area)}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className="skills-card__foot">
                {techs.length > 0 ? (
                    <ul className="skills-card__techs" aria-label={`${title} tools`}>
                        {techs.map(tech => (
                            <li key={tech} className="chip">{tech}</li>
                        ))}
                    </ul>
                ) : (
                    // No tool list yet: say what the card's copy already says.
                    <p className="skills-card__exploring">
                        <span className="skills-card__exploring-dot" aria-hidden="true" />
                        Currently exploring
                    </p>
                )}
            </div>
        </motion.article>
    );
}

export default function Skills() {
    const [category, setCategory] = useState('all');
    const reduceMotion = useReducedMotion();
    const scrollerRef = useRef(null);

    const variants = useMemo(() => cardVariants(reduceMotion), [reduceMotion]);

    const visible = useMemo(
        () => (category === 'all' ? SKILLS : SKILLS.filter(s => s.category === category)),
        [category],
    );

    // In the two-column layout the featured card takes a full row, so an odd
    // number of regular cards leaves the last one alone: let it fill the row.
    const regularCount = visible.filter(s => !s.featured).length;
    const fillLast = regularCount >= 3 && regularCount % 2 === 1;

    // A filter with only one or two results would leave the row half empty;
    // a "view all" tile closes it and points back to the full toolkit.
    const showMore = category !== 'all' && visible.length < 3;

    const selectCategory = id => {
        setCategory(id);

        // On phones the control scrolls sideways; bring the chosen tab to the middle.
        const scroller = scrollerRef.current;
        if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
        const tab = scroller.querySelector(`[data-category="${id}"]`);
        if (!tab) return;
        const box = scroller.getBoundingClientRect();
        const rect = tab.getBoundingClientRect();
        scroller.scrollBy({
            left: rect.left + rect.width / 2 - (box.left + box.width / 2),
            behavior: reduceMotion ? 'auto' : 'smooth',
        });
    };

    return (
        <section id="skills" className="skills">
            <div className="container">
                <SectionHeader
                    index="03"
                    label="Skills"
                    title={<>Skills & <em className="serif">technologies</em></>}
                    desc="A versatile skill set covering the full spectrum of modern software development."
                />

                <Reveal className="skills-toolbar" y={16} blur={false}>
                    {/* layoutScroll: lets the pill's layout animation account for this scroller. */}
                    <motion.div className="skills-filter-scroll" ref={scrollerRef} layoutScroll>
                        <div className="skills-filter" role="group" aria-label="Filter skills by category">
                            {CATEGORIES.map(cat => {
                                const active = category === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className={`skills-filter__btn${active ? ' is-active' : ''}`}
                                        data-category={cat.id}
                                        aria-pressed={active}
                                        onClick={() => selectCategory(cat.id)}
                                    >
                                        {active && (
                                            <motion.span
                                                className="skills-filter__pill"
                                                layoutId="skills-filter-pill"
                                                transition={PILL_SPRING}
                                                aria-hidden="true"
                                            />
                                        )}
                                        <span className="skills-filter__label">{cat.label}</span>
                                        <span className="skills-filter__count" aria-hidden="true">{pad(cat.count)}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                    <p className="skills-toolbar__status">
                        <span className="skills-toolbar__count" aria-hidden="true">
                            <span className="skills-toolbar__num">{pad(visible.length)}</span>
                            <span className="skills-toolbar__sep">/</span>
                            {pad(SKILLS.length)} skills
                        </span>
                        <span className="sr-only" aria-live="polite">
                            Showing {visible.length} of {SKILLS.length} skills
                        </span>
                    </p>
                </Reveal>

                <div className="skills-grid">
                    <AnimatePresence mode="popLayout">
                        {visible.map((skill, i) => (
                            <SkillCard
                                key={skill.title}
                                skill={skill}
                                delay={(i % 3) * 0.06}
                                fill={fillLast && i === visible.length - 1}
                                variants={variants}
                            />
                        ))}
                        {showMore && (
                            <motion.div
                                key="skills-more"
                                layout="position"
                                className={`skills-more skills-more--after-${visible.length}`}
                                variants={variants}
                                custom={(visible.length % 3) * 0.06}
                                initial="hidden"
                                whileInView="shown"
                                exit="gone"
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ layout: LAYOUT_SPRING }}
                            >
                                <p className="skills-more__label eyebrow">Filtered view</p>
                                <div className="skills-more__body">
                                    <p className="skills-more__count">+{SKILLS.length - visible.length}</p>
                                    <p className="skills-more__text">more skills in the full toolkit</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm skills-more__btn"
                                    onClick={() => {
                                        selectCategory('all');
                                        // This tile is about to unmount; keep keyboard focus on the filter.
                                        scrollerRef.current?.querySelector('[data-category="all"]')?.focus();
                                    }}
                                >
                                    View all skills
                                    <span className="btn-arrow" aria-hidden="true"><LuArrowRight /></span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
