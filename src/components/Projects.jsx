import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
    {
        title: 'Cineplex',
        desc: 'A uni project for streaming platform to watch movies and series.',
        techs: ['PHP', 'HTML', 'MySQL'],
        tag: 'Web Advanced',
        tagClass: 'tag-web',
        gradient: 'linear-gradient(135deg, #1a1a2e, #7c3aed)',
        github: 'https://github.com/randvision/cineplex.git',
        live: '#',
    },
    {
        title: '8-Puzzle Solver using AI',
        desc: 'A uni project for solving 8-puzzle problem using AI algorithms.',
        techs: ['Python'],
        tag: 'AI',
        tagClass: 'tag-ai',
        gradient: 'linear-gradient(135deg, #1a1a2e, #06b6d4)',
        github: 'https://github.com/randzana/8-puzzle-project.git',
        live: '#',
    },
    {
        title: 'UI/UX Design for a Mobile App',
        desc: 'First project for UI/UX design for a mobile app with real-world scenario.',
        techs: ['Figma'],
        tag: 'UI/UX',
        tagClass: 'tag-uiux',
        gradient: 'linear-gradient(135deg, #1a1a2e, #ec4899)',
        github: null,
        live: 'https://www.figma.com/design/npfRyscSUXG7W4tz3eBtwK/Easy-Sale?node-id=4-2&t=GtJvMQxcpTZqNBXM-1',
        liveLabel: 'Figma',
        liveIcon: 'fab fa-figma',
    },
    {
        title: 'Live Menu for Restaurant',
        desc: 'The real project for live menu for restaurant.',
        techs: ['HTML', 'CSS', 'JS'],
        tag: 'Web',
        tagClass: 'tag-web2',
        gradient: 'linear-gradient(135deg, #1a1a2e, #f59e0b)',
        github: 'https://github.com/randzana/LIive-Menu-For-Diwaxani-Nali.git',
        live: 'https://diwaxan.netlify.app/',
    },
];

function ProjectCard({ project, index }) {
    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
        >
            <div className="project-preview" style={{ background: project.gradient }}>
                <div className="project-overlay" />
                <span className={`project-tag ${project.tagClass}`}>{project.tag}</span>
                <div className="project-preview-pattern" />
            </div>
            <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-techs">
                    {project.techs.map(t => (
                        <span key={t} className="skill-tech-tag">{t}</span>
                    ))}
                </div>
                <div className="project-links">
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
                            <i className={project.liveIcon || 'fas fa-external-link-alt'} />
                            <span>{project.liveLabel || 'Live Demo'}</span>
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                            <i className="fab fa-github" />
                            <span>Source Code</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">Portfolio</div>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-desc">
                        A selection of projects that showcase my skills and passion for building great software.
                    </p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
