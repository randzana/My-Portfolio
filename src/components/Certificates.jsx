import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Certificates.css';

const certificates = [
    {
        title: 'Getting Started with Cisco Packet Tracer',
        issuer: 'Cisco Networking Academy',
        date: '01 March, 2026',
        image: '/certificates/cisco-packet-tracer.png',
        color: '#049fd9',
    },
    {
        title: 'Web Development',
        issuer: 'Sololearn',
        date: '02 January, 2026',
        image: '/certificates/sololearn-web-dev.png',
        color: '#e8573a',
    },
    {
        title: 'Generative AI in Practice',
        issuer: 'Sololearn',
        date: '29 December, 2024',
        image: '/certificates/sololearn-gen-ai.png',
        color: '#e8573a',
    },
    {
        title: 'Write with AI',
        issuer: 'Sololearn',
        date: '29 December, 2024',
        image: '/certificates/sololearn-write-ai.png',
        color: '#e8573a',
    },
    {
        title: 'Brainstorm with AI',
        issuer: 'Sololearn',
        date: '31 December, 2024',
        image: '/certificates/sololearn-brainstorm.png',
        color: '#e8573a',
    },
    {
        title: 'AI-Powered A/B Testing',
        issuer: 'Sololearn',
        date: '30 December, 2024',
        image: '/certificates/sololearn-ab-testing.png',
        color: '#e8573a',
    },
    {
        title: 'Think Creatively with AI',
        issuer: 'Sololearn',
        date: '23 December, 2024',
        image: '/certificates/sololearn-think-creatively.png',
        color: '#e8573a',
    },
    {
        title: 'AI in Data Analysis',
        issuer: 'Sololearn',
        date: '23 December, 2024',
        image: '/certificates/sololearn-ai-data-analysis.png',
        color: '#e8573a',
    },
    {
        title: 'Prompt Engineering',
        issuer: 'Sololearn',
        date: '22 December, 2024',
        image: '/certificates/sololearn-prompt-eng.png',
        color: '#e8573a',
    },
    {
        title: 'Introduction to LLMs',
        issuer: 'Sololearn',
        date: '22 December, 2024',
        image: '/certificates/sololearn-intro-llms.png',
        color: '#e8573a',
    },
    {
        title: 'Social Media Marketing with AI',
        issuer: 'Sololearn',
        date: '22 December, 2024',
        image: '/certificates/sololearn-social-media-marketing.png',
        color: '#e8573a',
    },
    {
        title: 'Java Intermediate',
        issuer: 'Sololearn',
        date: '25 October, 2024',
        image: '/certificates/sololearn-java-intermediate.png',
        color: '#e8573a',
    },
    {
        title: 'SQL Intermediate',
        issuer: 'Sololearn',
        date: '11 September, 2024',
        image: '/certificates/sololearn-sql.png',
        color: '#e8573a',
    },
    {
        title: 'Introduction to SQL',
        issuer: 'Sololearn',
        date: '30 August, 2024',
        image: '/certificates/sololearn-intro-sql.png',
        color: '#e8573a',
    },
    {
        title: 'Introduction to C#',
        issuer: 'Sololearn',
        date: 'August 2024',
        image: '/certificates/sololearn-csharp.png',
        color: '#e8573a',
    },
    {
        title: 'Intro to Machine Learning',
        issuer: 'Kaggle',
        date: 'April 2024',
        image: '/certificates/kaggle-ml.png',
        color: '#20beff',
    },
    {
        title: 'Tech for Everyone',
        issuer: 'Sololearn',
        date: '30 March, 2024',
        image: '/certificates/sololearn-tech.png',
        color: '#e8573a',
    },
    {
        title: 'Introduction to Java',
        issuer: 'Sololearn',
        date: 'March 2024',
        image: '/certificates/sololearn-java.png',
        color: '#e8573a',
    },
    {
        title: 'Intro to Programming',
        issuer: 'Kaggle',
        date: 'February 2024',
        image: '/certificates/kaggle-programming.png',
        color: '#20beff',
    },
];

export default function Certificates() {
    const [selected, setSelected] = useState(null);

    return (
        <section id="certificates">
            <div className="gradient-orb gradient-orb-3" />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">Achievements</div>
                    <h2 className="section-title">Certificates & Courses</h2>
                    <p className="section-desc">
                        Continuous learning through industry-recognized platforms and certifications.
                    </p>
                </motion.div>

                <div className="certificates-grid">
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={cert.title}
                            className="cert-card"
                            initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.05 }}
                            onClick={() => setSelected(cert)}
                        >
                            <div className="cert-preview">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x450/111122/a78bfa?text=Certificate+Image+Pending';
                                    }}
                                />
                                <div className="cert-overlay" />
                                <div className="cert-badge" style={{ color: cert.color, borderColor: `${cert.color}40`, background: `${cert.color}15` }}>
                                    {cert.issuer}
                                </div>
                            </div>
                            <div className="cert-info">
                                <h3>{cert.title}</h3>
                                <p>
                                    <i className="fas fa-calendar-alt" /> {cert.date}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <div className="lightbox-backdrop" onClick={() => setSelected(null)}>
                        <motion.div
                            className="lightbox-content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lightbox-close" onClick={() => setSelected(null)}>
                                <i className="fas fa-times" />
                            </button>
                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="lightbox-img"
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/800x600/111122/a78bfa?text=Certificate+Image+Pending';
                                }}
                            />
                            <div className="lightbox-info">
                                <h3>{selected.title}</h3>
                                <p>{selected.issuer} · {selected.date}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
