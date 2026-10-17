import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';
import FeaturedProject from './FeaturedProject';
import { trackSpotlight } from '../lib/spotlight';
import './Projects.css';

// `hue` is the tiny colour marker that replaces the old gradient covers.
const projects = [
    {
        title: 'Cineplex',
        desc: 'A university project: a streaming platform for watching movies and series.',
        techs: ['PHP', 'HTML', 'MySQL'],
        tag: 'Web Advanced',
        hue: '#8b5cf6',
        github: 'https://github.com/randvision/cineplex.git',
        live: '#',
    },
    {
        title: '8-Puzzle Solver using AI',
        desc: 'A university project that solves the 8-puzzle problem using AI algorithms.',
        techs: ['Python'],
        tag: 'AI',
        hue: '#06b6d4',
        github: 'https://github.com/randzana/8-puzzle-project.git',
        live: '#',
    },
    {
        title: 'Animal Conditions',
        desc: 'A university project that diagnoses animal conditions using machine learning algorithms.',
        techs: ['Python'],
        tag: 'AI',
        hue: '#14b8a6',
        github: 'https://github.com/randzana/Animal-Condition.git',
        live: '#',
    },
    {
        title: 'UI/UX Design for a Mobile App',
        desc: 'My first UI/UX design project: a mobile app designed around a real-world scenario.',
        techs: ['Figma'],
        tag: 'UI/UX',
        hue: '#ec4899',
        github: null,
        live: 'https://www.figma.com/design/npfRyscSUXG7W4tz3eBtwK/Easy-Sale?node-id=4-2&t=GtJvMQxcpTZqNBXM-1',
        liveLabel: 'Figma',
        liveIcon: 'fa-brands fa-figma',
    },
    {
        title: 'Live Menu',
        desc: 'A real-world project: a live digital menu for a restaurant.',
        techs: ['HTML', 'CSS', 'JS'],
        tag: 'Web',
        hue: '#f59e0b',
        github: 'https://github.com/randzana/LIive-Menu-For-Diwaxani-Nali.git',
        live: 'https://diwaxan.netlify.app/',
    },
];

const GITHUB_PROFILE = 'https://github.com/randzana';

// '#' is a placeholder for "no live build yet" — never render it as a link.
const hasLive = project => Boolean(project.live) && project.live !== '#';

function ProjectCard({ project }) {
    const live = hasLive(project);
    const liveLabel = project.liveLabel || 'Live demo';
    // The whole card opens the live build when there is one, else the repo.
    const primaryHref = live ? project.live : project.github;

    return (
        <article className="proj-card card card-hover spotlight" onPointerMove={trackSpotlight}>
            <div className="proj-card-top">
                <span className="chip chip-mono proj-cat">
                    <span className="proj-cat-dot" style={{ '--proj-hue': project.hue }} aria-hidden="true" />
                    {project.tag}
                </span>
                <div className="proj-card-links">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="icon-btn"
                            aria-label={`${project.title}: source code on GitHub (opens in a new tab)`}
                            title="Source code"
                        >
                            <i className="fa-brands fa-github" aria-hidden="true" />
                        </a>
                    )}
                    {live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="icon-btn"
                            aria-label={`${project.title}: ${liveLabel} (opens in a new tab)`}
                            title={liveLabel}
                        >
                            <i className={project.liveIcon || 'fa-solid fa-arrow-up-right-from-square'} aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="proj-card-title">
                <a href={primaryHref} target="_blank" rel="noreferrer" className="proj-card-link">
                    {project.title}
                </a>
            </h3>
            <p className="proj-card-desc">{project.desc}</p>

            <div className="proj-card-foot">
                <ul className="proj-card-techs" aria-label="Built with">
                    {project.techs.map(t => (
                        <li key={t} className="chip">{t}</li>
                    ))}
                </ul>
                <span className="proj-card-arrow" aria-hidden="true">
                    <i className="fa-solid fa-arrow-right" />
                </span>
            </div>
        </article>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="proj">
            <div className="container">
                <SectionHeader
                    index="02"
                    label="Projects"
                    title={<>Selected <em className="serif">work</em></>}
                    desc="A selection of projects that showcase my skills and passion for building great software."
                />

                <FeaturedProject />

                <Reveal className="proj-subhead" blur={false} y={12}>
                    <h3 className="eyebrow proj-subhead-title">Other projects</h3>
                    <span className="proj-subhead-rule" aria-hidden="true" />
                    <span className="proj-count">
                        {String(projects.length).padStart(2, '0')}
                        <span className="sr-only"> projects</span>
                    </span>
                </Reveal>

                <ul className="proj-grid">
                    {projects.map((project, i) => (
                        <Reveal as="li" key={project.title} className="proj-item" delay={i * 0.06}>
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                    <Reveal as="li" className="proj-item proj-item--more" delay={projects.length * 0.06}>
                        <a
                            href={GITHUB_PROFILE}
                            target="_blank"
                            rel="noreferrer"
                            className="proj-more card"
                        >
                            <span className="proj-more-icon" aria-hidden="true">
                                <i className="fa-brands fa-github" />
                            </span>
                            <span className="proj-more-text">
                                <span className="proj-more-title">More on GitHub</span>
                                <span className="proj-more-url">github.com/randzana</span>
                            </span>
                            <span className="proj-card-arrow" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </Reveal>
                </ul>
            </div>
        </section>
    );
}
