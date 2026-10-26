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
    LuArrowDown,
    LuArrowUpRight,
} from 'react-icons/lu';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import FilterTabs from './ui/FilterTabs';
import { trackSpotlight } from '../lib/spotlight';
import { LAYOUT_SPRING, cardVariants } from '../lib/motion';
import { pad } from '../lib/format';
import { goToSection } from '../lib/scroll';
import './Skills.css';

// Order sets each skill's 01–12 index. The primary focus leads; the rest
// run tech → creative → marketing, the same order as the filter tabs, so
// the index reads top to bottom at every width.
const SKILLS = [
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
        Icon: LuBrainCircuit,
        title: 'AI & Machine Learning',
        desc: 'Building AI agents that automate tasks with Python.',
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
        Icon: LuNetwork,
        title: 'Networking & Cybersecurity',
        desc: 'Exploring computer networks, protocol suites, and modern cybersecurity strategies.',
        techs: [],
        category: 'tech',
    },
    {
        Icon: LuClapperboard,
        title: 'Videography & Editing',
        desc: 'Producing cinematic videos from concept to final cut — shooting, color grading, motion graphics.',
        techs: ['Premiere Pro', 'CapCut', 'After Effects', 'Drone'],
        category: 'creative',
        link: { href: 'https://www.instagram.com/rand.vision/', label: 'See my work on Instagram' },
    },
    {
        Icon: LuPenTool,
        title: 'Content Creation',
        desc: 'Crafting compelling stories across platforms — from social media to YouTube.',
        techs: ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Photoshop'],
        category: 'creative',
        link: { href: 'https://www.instagram.com/rand.vision/', label: 'See my work on Instagram' },
    },
    {
        Icon: LuMegaphone,
        title: 'Marketing Management',
        desc: 'Building brand strategies, running campaigns, and driving growth through data-driven marketing.',
        techs: ['SEO/SEM', 'Google Ads', 'Meta Ads', 'Analytics', 'Email Marketing'],
        category: 'marketing',
    },
].map((skill, i) => ({ ...skill, index: pad(i + 1) }));

const CATEGORIES = [
    { id: 'all', label: 'All Toolkit' },
    { id: 'tech', label: 'Tech & Development' },
    { id: 'creative', label: 'Media & Creative' },
    { id: 'marketing', label: 'Brand & Marketing' },
].map(cat => ({
    ...cat,
    count: cat.id === 'all' ? SKILLS.length : SKILLS.filter(s => s.category === cat.id).length,
}));

// Keeps hyphenated compounds ("end-to-end", "data-driven") on one line so
// narrow columns never break them at the hyphen, and ties a dash to the
// word before it so no line starts with "—".
function keepCompounds(text) {
    return text.replace(/ —/g, ' —').split(/(\S+-\S+)/g).map((part, i) =>
        i % 2 ? <span key={i} className="skills-nowrap">{part}</span> : part,
    );
}

// Shared by every skill so cards, rows and the "view all" band enter,
// leave and re-flow the same way when the filter changes.
function motionProps(variants, delay) {
    return {
        // Position-only: rows change size as the grid re-flows, and
        // scaling them would smear the text mid-flight.
        layout: 'position',
        variants,
        custom: delay,
        initial: 'hidden',
        whileInView: 'shown',
        exit: 'gone',
        viewport: { once: true, amount: 0.2 },
        transition: { layout: LAYOUT_SPRING },
    };
}

function Techs({ title, techs }) {
    if (techs.length === 0) {
        // No tool list yet: say what the description already says.
        return (
            <p className="skills-exploring">
                <span className="skills-exploring__dot" aria-hidden="true" />
                Currently exploring
            </p>
        );
    }
    return (
        <ul className="skills-techs" aria-label={`${title} tools`}>
            {techs.map(tech => (
                <li key={tech} className="chip">{tech}</li>
            ))}
        </ul>
    );
}

function FeaturedSkill({ skill, variants }) {
    const { Icon, title, desc, techs, areas, areasLabel, index } = skill;
    const labelId = `skills-areas-${index}`;

    return (
        <motion.article
            className="skills-feat card card-hover spotlight"
            onPointerMove={trackSpotlight}
            {...motionProps(variants, 0)}
        >
            <span className="skills-feat__grid bg-grid" aria-hidden="true" />

            <div className="skills-feat__top">
                <span className="skills-feat__icon" aria-hidden="true"><Icon /></span>
                <span className="skills-feat__meta">
                    <span className="chip chip-mono chip-accent">Primary focus</span>
                    <span className="skills-index" aria-hidden="true">{index}</span>
                </span>
            </div>

            <div className="skills-feat__body">
                <h3 className="skills-feat__title">{title}</h3>
                <p className="skills-feat__desc">{keepCompounds(desc)}</p>
                <div className="skills-feat__techs">
                    <Techs title={title} techs={techs} />
                </div>
            </div>

            <div className="skills-feat__areas">
                <p className="skills-feat__label" id={labelId}>{areasLabel}</p>
                <ol className="skills-feat__list" aria-labelledby={labelId}>
                    {areas.map((area, i) => (
                        <li key={area}>
                            <span className="skills-feat__num" aria-hidden="true">{pad(i + 1)}</span>
                            {/* Balanced (see CSS), so no compound is held together here. */}
                            <span>{area}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </motion.article>
    );
}

function SkillRow({ skill, delay, fill, variants }) {
    const { Icon, title, desc, techs, index, link } = skill;

    return (
        <motion.article
            className={`skills-row${fill ? ' skills-row--fill' : ''}`}
            {...motionProps(variants, delay)}
        >
            <span className="skills-row__index skills-index" aria-hidden="true">{index}</span>
            <span className="skills-row__icon" aria-hidden="true"><Icon /></span>
            <div className="skills-row__text">
                <h3 className="skills-row__title">{title}</h3>
                <div className="skills-row__copy">
                    <p className="skills-row__desc">{keepCompounds(desc)}</p>
                    {link && (
                        <a className="skills-link" href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                            <LuArrowUpRight aria-hidden="true" />
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    )}
                </div>
            </div>
            <div className="skills-row__techs">
                <Techs title={title} techs={techs} />
            </div>
        </motion.article>
    );
}

export default function Skills() {
    const [category, setCategory] = useState('all');
    const reduceMotion = useReducedMotion();
    const toolbarRef = useRef(null);

    const variants = useMemo(() => cardVariants(reduceMotion), [reduceMotion]);

    const visible = useMemo(
        () => (category === 'all' ? SKILLS : SKILLS.filter(s => s.category === category)),
        [category],
    );
    const rows = visible.filter(s => !s.featured);

    // Two-column index: an odd row count leaves the last one alone, so it
    // takes the whole line instead (tools move to its right).
    const fillLast = rows.length % 2 === 1;

    // A filter with only one or two results reads as a dead end; a band
    // under the list points back to the full toolkit.
    const showMore = category !== 'all' && visible.length < 3;

    const showAll = () => {
        setCategory('all');
        // The band is about to unmount; keep keyboard focus on the filter.
        toolbarRef.current?.querySelector('[data-id="all"]')?.focus();
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

                <Reveal className="skills-toolbar" y={16} blur={false} ref={toolbarRef}>
                    <FilterTabs
                        items={CATEGORIES}
                        value={category}
                        onChange={setCategory}
                        label="Filter skills by category"
                        layoutId="skills-filter-pill"
                        className="skills-tabs"
                    />
                    <div className="skills-toolbar__aside">
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
                        {/* App mode only: certificates share this dock page but sit far below. */}
                        <a
                            href="#certificates"
                            className="skills-jump"
                            onClick={event => goToSection(event, 'certificates')}
                        >
                            Jump to certificates
                            <span className="skills-jump__arrow" aria-hidden="true"><LuArrowDown /></span>
                        </a>
                    </div>
                </Reveal>

                <div className="skills-stage">
                    <AnimatePresence mode="popLayout">
                        {visible.map(skill => {
                            if (skill.featured) {
                                return <FeaturedSkill key={skill.title} skill={skill} variants={variants} />;
                            }
                            const i = rows.indexOf(skill);
                            return (
                                <SkillRow
                                    key={skill.title}
                                    skill={skill}
                                    delay={(i % 2) * 0.06}
                                    fill={fillLast && i === rows.length - 1}
                                    variants={variants}
                                />
                            );
                        })}
                        {showMore && (
                            <motion.div key="skills-more" className="skills-more" {...motionProps(variants, 0.06)}>
                                <p className="skills-more__label">Filtered view</p>
                                <p className="skills-more__body">
                                    <span className="skills-more__count">+{SKILLS.length - visible.length}</span>
                                    <span className="skills-more__text">more skills in the full toolkit</span>
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm skills-more__btn"
                                    onClick={showAll}
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
