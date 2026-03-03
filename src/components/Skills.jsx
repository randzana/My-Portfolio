import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skills = [
    {
        icon: 'fas fa-code',
        color: 'purple',
        title: 'Frontend Development',
        desc: 'Building responsive, accessible, and performant user interfaces with modern frameworks.',
        techs: ['React'],
    },
    {
        icon: 'fas fa-server',
        color: 'cyan',
        title: 'Backend Development',
        desc: 'Designing robust APIs and microservices with scalable architectures.',
        techs: ['Python', 'Java', 'PHP'],
    },
    {
        icon: 'fas fa-database',
        color: 'pink',
        title: 'Database',
        desc: 'Managing data at scale with modern databases and cloud-native solutions.',
        techs: ['MySQL'],
    },
    {
        icon: 'fas fa-brain',
        color: 'green',
        title: 'AI & Machine Learning',
        desc: ' i am still learning about AI & Machine Learning',
        techs: [],
    },
    {
        icon: 'fas fa-mobile-alt',
        color: 'orange',
        title: 'Mobile Development',
        desc: 'Creating cross-platform mobile experiences that feel truly native.',
        techs: ['Flutter', 'Kotlin'],
    },
    {
        icon: 'fas fa-tools',
        color: 'purple',
        title: 'DevOps & Tools',
        desc: 'Streamlining development workflows with CI/CD and modern tooling.',
        techs: ['Git', 'GitHub Actions'],
    },
    {
        icon: 'fas fa-video',
        color: 'red',
        title: 'Videography & Editing',
        desc: 'Producing cinematic videos from concept to final cut — shooting, color grading, motion graphics.',
        techs: ['Premiere Pro', 'CapCut', 'After Effects', 'Drone'],
    },
    {
        icon: 'fas fa-bullhorn',
        color: 'indigo',
        title: 'Marketing Management',
        desc: 'Building brand strategies, running campaigns, and driving growth through data-driven marketing.',
        techs: ['SEO/SEM', 'Google Ads', 'Meta Ads', 'Analytics', 'Email Marketing'],
    },
    {
        icon: 'fas fa-pen-fancy',
        color: 'teal',
        title: 'Content Creation',
        desc: 'Crafting compelling stories across platforms — from social media to YouTube.',
        techs: ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Photoshop'],
    },
    {
        icon: 'fas fa-network-wired',
        color: 'blue',
        title: 'Networking and Cybersecurity',
        desc: 'I am still learning about Networking and Cybersecurity.',
        techs: [],
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
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : index * 0.08 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {!isMobile && <div className="skill-card-glow" style={{ background: colors.glow }} />}
            <div
                className="skill-icon"
                style={{ background: colors.bg, color: colors.color }}
            >
                <i className={skill.icon} />
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

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 900);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <section id="skills">
            {!isMobile && <div className="gradient-orb gradient-orb-1" />}
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: isMobile ? 0.3 : 0.6 }}
                >
                    <div className="section-tag">My Toolkit</div>
                    <h2 className="section-title">Skills & Technologies</h2>
                    <p className="section-desc">
                        A versatile skill set covering the full spectrum of modern software development.
                    </p>
                </motion.div>

                <div className="skills-grid">
                    {skills.map((skill, i) => (
                        <SkillCard key={skill.title} skill={skill} index={i} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </section>
    );
}
