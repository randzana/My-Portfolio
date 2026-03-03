import { motion } from 'framer-motion';
import './About.css';

const tags = [
    '🎯 Problem Solver',
    '🚀 Fast Learner',
    '🤝 Team Player',
    '💡 Creative Thinker',
    '📐 Clean Code',
    '🎬 Videographer',
    '📈 Marketing',
    '✍️ Content Creator',
];

const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
};

export default function About() {
    return (
        <section id="about">
            <div className="container">
                <motion.div
                    className="section-header"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">About Me</div>
                    <h2 className="section-title">Turning Vision Into Reality</h2>
                    <p className="section-desc">
                        A passionate engineer who loves transforming ideas into impactful software solutions.
                    </p>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-avatar-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="about-avatar">
                            <div className="about-avatar-ring" />
                            <div className="about-avatar-ring ring-2" />
                            <div className="about-avatar-inner">
                                <div className="about-avatar-img">
                                    <img src="/profile.jpg" alt="Rand Zana" />
                                </div>
                            </div>
                            <div className="about-avatar-glow" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                    >
                        <h3>Hello! I'm <span className="about-name-highlight">Rand Zana</span> 👋</h3>
                        <p>
                            I bridge the gap between tech and creativity. As a software engineer, photographer, and brand strategist, I do everything from architecting complex systems to crafting marketing campaigns and cinematic content.
                        </p>
                        <p>
                            From clean code to engaging content, I'm obsessed with the details. I apply the same high standards to every project, whether it's technical or creative.
                        </p>

                        <div className="about-tags">
                            {tags.map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    className="about-tag"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: 'easeOut' }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
