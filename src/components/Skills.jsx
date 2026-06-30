import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaBrain, FaMobileAlt, FaTools, FaVideo, FaBullhorn, FaPenFancy, FaNetworkWired, FaLayerGroup, FaChartBar } from 'react-icons/fa';
import './Skills.css';

const skills = [
    {
        Icon: FaCode,
        color: 'purple',
        title: 'Frontend Development',
        desc: 'Building responsive, accessible, and performant user interfaces with modern frameworks.',
        techs: ['React.js', 'React.tsx', 'Vue.js', 'Vue.tsx', 'Typescript', 'HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
        category: 'tech',
    },
    {
        Icon: FaServer,
        color: 'cyan',
        title: 'Backend Development',
        desc: 'Designing robust APIs and microservices with scalable architectures.',
        techs: ['Laravel'],
        category: 'tech',
    },
    {
        Icon: FaDatabase,
        color: 'pink',
        title: 'Database',
        desc: 'Managing data at scale with modern databases and cloud-native solutions.',
        techs: ['PostgreSQL', 'MySQL', 'MongoDB'],
        category: 'tech',
    },
    {
        Icon: FaLayerGroup,
        color: 'purple',
        title: 'FullStack Development',
        desc: 'Orchestrating robust end-to-end applications. Key areas a modern fullstack developer must master include: System Design & Patterns, RESTful/GraphQL APIs, Client & Server-side State Management, Web Security (CORS, CSRF, JWT), Database Optimization (indexing), and Deployment pipelines (Docker, CI/CD).',
        techs: ['React/Next.js', 'Laravel', 'PostgreSQL', 'System Design', 'APIs & Security', 'Docker/Git'],
        category: 'tech',
    },
    {
        Icon: FaBrain,
        color: 'green',
        title: 'AI & Machine Learning',
        desc: 'can built Agent for any task ',
        techs: ['Python'],
        category: 'tech',
    },
    {
        Icon: FaChartBar,
        color: 'teal',
        title: 'Data Analysis',
        desc: 'Extracting insights and making data-informed decisions through structured analytical thinking.',
        techs: ['Curiosity', 'Understanding Context', 'Technical Mindset', 'Data Strategy'],
        category: 'tech',
    },
    {
        Icon: FaMobileAlt,
        color: 'orange',
        title: 'Mobile Development',
        desc: 'Creating cross-platform mobile experiences that feel truly native.',
        techs: ['Flutter', 'Kotlin'],
        category: 'tech',
    },
    {
        Icon: FaTools,
        color: 'purple',
        title: 'DevOps & Tools',
        desc: 'Streamlining development workflows with version control, containerization, and automated pipelines.',
        techs: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Kubernetes'],
        category: 'tech',
    },
    {
        Icon: FaVideo,
        color: 'red',
        title: 'Videography & Editing',
        desc: 'Producing cinematic videos from concept to final cut — shooting, color grading, motion graphics.',
        techs: ['Premiere Pro', 'CapCut', 'After Effects', 'Drone'],
        category: 'creative',
    },
    {
        Icon: FaBullhorn,
        color: 'indigo',
        title: 'Marketing Management',
        desc: 'Building brand strategies, running campaigns, and driving growth through data-driven marketing.',
        techs: ['SEO/SEM', 'Google Ads', 'Meta Ads', 'Analytics', 'Email Marketing'],
        category: 'marketing',
    },
    {
        Icon: FaPenFancy,
        color: 'teal',
        title: 'Content Creation',
        desc: 'Crafting compelling stories across platforms — from social media to YouTube.',
        techs: ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Photoshop'],
        category: 'creative',
    },
    {
        Icon: FaNetworkWired,
        color: 'blue',
        title: 'Networking and Cybersecurity',
        desc: 'Exploring computer networks, protocol suites, and modern cybersecurity strategies.',
        techs: [],
        category: 'tech',
    },
];

const colorMap = {
    purple: { bg: 'rgba(124,58,237,0.12)', color: '#a78bfa', glow: 'rgba(124,58,237,0.25)' },
    cyan: { bg: 'rgba(6,182,212,0.12)', color: '#22d3ee', glow: 'rgba(6,182,212,0.25)' },
    pink: { bg: 'rgba(236,72,153,0.12)', color: '#f472b6', glow: 'rgba(236,72,153,0.25)' },
    green: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', glow: 'rgba(16,185,129,0.25)' },
    orange: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', glow: 'rgba(245,158,11,0.25)' },
    red: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', glow: 'rgba(239,68,68,0.25)' },
    indigo: { bg: 'rgba(99,102,241,0.12)', color: '#818cf8', glow: 'rgba(99,102,241,0.25)' },
    teal: { bg: 'rgba(20,184,166,0.12)', color: '#2dd4bf', glow: 'rgba(20,184,166,0.25)' },
    blue: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', glow: 'rgba(59,130,246,0.25)' },
};

const skillCategories = [
    { id: 'all', label: 'All Toolkit' },
    { id: 'tech', label: 'Tech & Development' },
    { id: 'creative', label: 'Media & Creative' },
    { id: 'marketing', label: 'Brand & Marketing' }
];

function SkillCard({ skill, index, isMobile }) {
    const cardRef = useRef(null);
    const colors = colorMap[skill.color];

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    };

    const handleMouseLeave = () => {
        if (cardRef.current) cardRef.current.style.transform = '';
    };

    return (
        <motion.div
            ref={cardRef}
            className="skill-card"
            layout
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {!isMobile && <div className="skill-card-glow" style={{ background: colors.glow }} />}
            <div
                className="skill-icon"
                style={{ background: colors.bg, color: colors.color }}
            >
                <skill.Icon />
            </div>
            <h3>{skill.title}</h3>
            <p>{skill.desc}</p>
            <div className="skill-techs">
                {skill.techs.map(t => (
                    <span key={t} className="skill-tech-tag">{t}</span>
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 900);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const filteredSkills = useMemo(() => {
        if (selectedCategory === 'all') return skills;
        return skills.filter(s => s.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <section id="skills">
            {!isMobile && <div className="gradient-orb gradient-orb-1" />}
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">My Toolkit</div>
                    <h2 className="section-title">Skills & Technologies</h2>
                    <p className="section-desc">
                        A versatile skill set covering the full spectrum of modern software development.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <div className="skills-controls">
                    <div className="filter-tabs">
                        {skillCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.label}
                                {selectedCategory === cat.id && (
                                    <motion.span
                                        className="tab-pill-indicator"
                                        layoutId="activeSkillTab"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skills Grid */}
                <motion.div 
                    className="skills-grid"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, i) => (
                            <SkillCard 
                                key={skill.title} 
                                skill={skill} 
                                index={i} 
                                isMobile={isMobile} 
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
