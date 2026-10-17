import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import './Experience.css';

// Each group is listed newest first. `end` marks a date range.
const GROUPS = [
    {
        id: 'work',
        label: 'Experience',
        items: [
            {
                start: '2026',
                role: 'Media Manager & Sales Manager',
                org: 'kurddetective',
                desc: 'Marketing Manager at kurddetective, an AI-powered platform that helps businesses to automate their marketing tasks.',
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
                desc: "Covering events for Diwaxani Nali and Koya University's social media.",
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
                org: 'Koya University',
                desc: 'Studying Software Engineering at Koya University. Learning about software development, algorithms, data structures, and other related topics.',
            },
        ],
    },
];

const pad = n => String(n).padStart(2, '0');

function Period({ start, end }) {
    return (
        <p className="exp-date">
            <time dateTime={start}>{start}</time>
            {end && (
                <>
                    <span className="exp-date-sep" aria-hidden="true"> – </span>
                    <span className="sr-only"> to </span>
                    <time dateTime={end}>{end}</time>
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
                            <Reveal className="exp-group-head" y={12} blur={false}>
                                <h3 id={`exp-${group.id}`} className="eyebrow exp-group-label">
                                    {group.label}
                                </h3>
                                <span className="exp-group-count" aria-hidden="true">
                                    {pad(group.items.length)}
                                </span>
                            </Reveal>

                            <ol className="exp-list" aria-labelledby={`exp-${group.id}`}>
                                {group.items.map((item, i) => (
                                    <Reveal
                                        as="li"
                                        key={`${item.role}-${item.start}`}
                                        className="exp-row"
                                        delay={i * 0.06}
                                    >
                                        <Period start={item.start} end={item.end} />
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
