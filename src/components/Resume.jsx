import { motion } from 'framer-motion';
import './Resume.css';

const CV_FILE = '/cv/Rand-Zana-CV.pdf';
const CV_PREVIEW = '/cv/cv-preview.jpg';

const contents = [
    { icon: 'fa-solid fa-code', label: 'Tech Skills' },
    { icon: 'fa-solid fa-briefcase', label: 'Experience' },
    { icon: 'fa-solid fa-diagram-project', label: 'Projects' },
    { icon: 'fa-solid fa-graduation-cap', label: 'Education' },
    { icon: 'fa-solid fa-certificate', label: 'Certifications' },
    { icon: 'fa-solid fa-trophy', label: 'Leadership & Awards' },
];

export default function Resume() {
    return (
        <section id="resume">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">Resume</div>
                    <h2 className="section-title">Download My CV</h2>
                    <p className="section-desc">
                        Everything on one page — my skills, projects and experience, ready to save or print.
                    </p>
                </motion.div>

                <motion.div
                    className="resume-card"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                >
                    <a
                        href={CV_FILE}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-preview"
                        aria-label="Open Rand Zana's CV in a new tab"
                    >
                        <div className="resume-paper">
                            <img
                                src={CV_PREVIEW}
                                alt="Preview of Rand Zana's CV"
                                width="720"
                                height="1019"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="resume-preview-overlay">
                                <span><i className="fa-solid fa-eye" /> View full CV</span>
                            </div>
                        </div>
                    </a>

                    <div className="resume-details">
                        <div className="resume-file">
                            <div className="resume-file-icon">
                                <i className="fa-solid fa-file-pdf" />
                            </div>
                            <div>
                                <strong>Rand-Zana-CV.pdf</strong>
                                <small>PDF · A4 · 1 page</small>
                            </div>
                        </div>

                        <h3>Full-Stack Software Engineer</h3>
                        <p>
                            Final-year Software Engineering student at Koya University building full-stack
                            web apps with React, Next.js, Laravel and PostgreSQL — including a café
                            management system that's live in production.
                        </p>

                        <div className="resume-contents-label">What's inside</div>
                        <ul className="resume-contents">
                            {contents.map(item => (
                                <li key={item.label}>
                                    <i className={item.icon} />
                                    {item.label}
                                </li>
                            ))}
                        </ul>

                        <div className="resume-actions">
                            <a href={CV_FILE} download="Rand-Zana-CV.pdf" className="btn btn-primary">
                                <i className="fa-solid fa-download" /> Download CV
                            </a>
                            <a href={CV_FILE} target="_blank" rel="noreferrer" className="btn btn-outline">
                                <i className="fa-solid fa-arrow-up-right-from-square" /> View Online
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
