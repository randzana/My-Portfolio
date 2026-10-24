import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { pad } from '../lib/format';
import './Experience.css';

// Each group is listed newest first. `end` marks a date range; `label` replaces
// the dates for roles the CV only gives a duration for.
const GROUPS = [
    {
        id: 'work',
        label: 'Work',
        items: [
            {
                start: '2026',
                role: 'Media Manager & Sales Manager',
                org: 'kurddetective',
                desc: 'Marketing Manager at kurddetective, an AI-powered platform that helps businesses to automate their marketing tasks.',
            },
            {
                start: '2025',
                end: 'Present',
                role: 'Freelance Full-Stack Developer',
                org: 'Self-employed',
                desc: 'Built and deployed a two-portal café management system that’s live in production; developed a gym management system for KF and a real estate management system, gathering requirements directly with each business. Now building a management system for a kindergarten and a K–12 school.',
            },
            {
                start: '2025',
                role: 'Freelance UI/UX Designer',
                org: 'Self-employed',
                desc: 'Leading development of UI/UX designs for various clients, mentoring junior designers, and driving technical architecture decisions.',
            },
            {
                start: '2025',
                role: 'Videographer',
                org: 'Self-employed',
                desc: 'Covering events for Diwaxani Nali and Koya University’s social media.',
            },
            {
                label: '3 months',
                role: 'Manager',
                org: 'Dawan Company & Real Estate',
                desc: 'Managed daily operations, the team and client requests.',
            },
        ],
    },
    {
        id: 'education',
        label: 'Education',
        items: [
            {
                start: '2023',
                end: '2027',
                role: 'Software Engineering Student',
                org: 'Koya University, Faculty of Engineering',
                desc: 'Studying Software Engineering at Koya University. Learning about software development, algorithms, data structures, and other related topics.',
            },
        ],
    },
];

function Period({ start, end, label }) {
    if (label) return <p className="exp-date">{label}</p>;
    return (
        <p className="exp-date">
            <time dateTime={start}>{start}</time>
            {end && (
                <>
                    <span className="exp-date-sep" aria-hidden="true"> – </span>
                    <span className="sr-only"> to </span>
                    {end === 'Present' ? end : <time dateTime={end}>{end}</time>}
                </>
            )}
        </p>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="exp">
            <div className="container">
                <SectionHeader
                    index="04"
                    label="Experience"
                    title={<>Experience & <em className="serif">education</em></>}
                    desc="A timeline of my professional growth and milestones."
                />

                <div className="exp-groups">
                    {GROUPS.map(group => (
                        <div key={group.id} className="exp-group">
                            {/* Group heading: "// WORK ──────── 05" (same pattern as Projects). */}
                            <Reveal className="exp-group-head" y={12} blur={false}>
                                <h3 id={`exp-${group.id}`} className="eyebrow exp-group-label">
                                    {group.label}
                                </h3>
                                <span className="exp-group-rule" aria-hidden="true" />
                                {/* The list already announces its length. */}
                                <span className="exp-group-count" aria-hidden="true">
                                    {pad(group.items.length)}
                                </span>
                            </Reveal>

                            <ol className="exp-list" aria-labelledby={`exp-${group.id}`}>
                                {group.items.map((item, i) => (
                                    <Reveal
                                        as="li"
                                        key={`${item.role}-${item.org}`}
                                        className="exp-row"
                                        delay={i * 0.06}
                                    >
                                        <Period start={item.start} end={item.end} label={item.label} />
                                        <div className="exp-heading">
                                            <h4 className="exp-role">{item.role}</h4>
                                            <p className="exp-org">{item.org}</p>
                                        </div>
                                        <p className="exp-desc">{item.desc}</p>
                                    </Reveal>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
