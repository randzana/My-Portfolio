import { motion } from 'framer-motion';
import './Experience.css';

const items = [
    {
        date: '2025',
        title: 'Freelance UI/UX Designer',
        company: 'Self-Employed',
        desc: 'Leading development of UI/UX designs for various clients, mentoring junior designers, and driving technical architecture decisions.',
    },
    {
        date: '2023 – 2027',
        title: 'Software Engineer Student',
        company: 'Koya University',
        desc: 'Studying Software Engineering at Koya University. Learning about software development, algorithms, data structures, and other related topics.',
    },
];

export default function Experience() {
    return (
        <section id="experience">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">Journey</div>
                    <h2 className="section-title">Experience & Education</h2>
                    <p className="section-desc">A timeline of my professional growth and milestones.</p>
                </motion.div>

                <div className="timeline">
                    <div className="timeline-line" />
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                            initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                        >
                            <div className="timeline-dot">
                                <div className="timeline-dot-inner" />
                            </div>
                            <div className="timeline-card">
                                <div className="timeline-date">{item.date}</div>
                                <h3>{item.title}</h3>
                                <h4>{item.company}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
