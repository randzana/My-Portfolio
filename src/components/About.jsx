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

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function About() {
    return (
        <section id="about">
            <div className="container">
                <motion.div
                    className="section-header"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
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
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
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
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3>Hello! I'm <span className="about-name-highlight">Rand Zana</span> 👋</h3>
                        <p>
                            I'm a multi-disciplinary creative — a software engineer who also wields a camera
                            and builds brands. From architecting backend systems to shooting cinematic videos
                            and crafting marketing strategies, I thrive at the intersection of technology and creativity.
                        </p>
                        <p>
                            Whether I'm writing clean code, producing engaging content, or managing a brand's
                            digital presence, I bring the same obsession with quality and detail to everything I do.
                        </p>

                        <div className="about-tags">
                            {tags.map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    className="about-tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                    whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
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
