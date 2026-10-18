import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { trackSpotlight } from '../lib/spotlight';
import './Resume.css';

const CV_FILE = '/cv/Rand-Zana-CV.pdf';
const CV_NAME = 'Rand-Zana-CV.pdf';
const CV_PREVIEW = '/cv/cv-preview.webp';

// The CV's own section headings, in the order they appear on the page.
const CONTENTS = [
    { icon: 'fa-solid fa-code', label: 'Tech Skills' },
    { icon: 'fa-solid fa-briefcase', label: 'Experience' },
    { icon: 'fa-solid fa-diagram-project', label: 'Projects' },
    { icon: 'fa-solid fa-graduation-cap', label: 'Education' },
    { icon: 'fa-solid fa-certificate', label: 'Certifications' },
    { icon: 'fa-solid fa-trophy', label: 'Leadership & Awards' },
];

export default function Resume() {
    return (
        <section id="resume" className="resume">
            <div className="container">
                <SectionHeader
                    index="06"
                    label="Resume"
                    title={<>Download my <em className="serif">CV</em></>}
                    desc="Everything on one page — my skills, projects and experience, ready to save or print."
                />

                <Reveal className="resume-card card card-hover spotlight" onPointerMove={trackSpotlight} delay={0.1}>
                    <a
                        href={CV_FILE}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-stage"
                        aria-label="Open Rand Zana's CV in a new tab"
                    >
                        <span className="resume-stage-grid bg-grid" aria-hidden="true" />
                        <span className="resume-stage-meta resume-stage-meta--top" aria-hidden="true">
                            <span>Preview</span>
                            <span>A4</span>
                        </span>

                        <span className="resume-paper">
                            <img
                                src={CV_PREVIEW}
                                alt="Preview of Rand Zana's CV"
                                width="720"
                                height="1019"
                                loading="lazy"
                                decoding="async"
                            />
                            <span className="resume-paper-cta" aria-hidden="true">
                                <i className="fa-solid fa-eye" />
                                View full CV
                            </span>
                        </span>

                        <span className="resume-stage-meta resume-stage-meta--bottom" aria-hidden="true">
                            <span>Rand Zana</span>
                            <span>1 / 1</span>
                        </span>
                    </a>

                    <div className="resume-body">
                        <div className="resume-file">
                            <span className="resume-file-icon" aria-hidden="true">
                                <i className="fa-solid fa-file-pdf" />
                            </span>
                            <span className="resume-file-text">
                                <strong>{CV_NAME}</strong>
                                <small>PDF · A4 · 1 page</small>
                            </span>
                        </div>

                        <h3 className="resume-title">Full-Stack Software Engineer</h3>
                        <p className="resume-summary">
                            Final-year Software Engineering student at Koya University building full-stack
                            web apps with React, Next.js, Laravel and PostgreSQL — including a café
                            management system that's live in production.
                        </p>

                        <div className="resume-contents">
                            <h4 className="eyebrow resume-contents-label" id="resume-contents-label">
                                What's inside
                            </h4>
                            <ul className="resume-contents-list" aria-labelledby="resume-contents-label">
                                {CONTENTS.map((item, i) => (
                                    <li key={item.label} className="resume-contents-item">
                                        <span className="resume-contents-index" aria-hidden="true">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <i className={`${item.icon} resume-contents-icon`} aria-hidden="true" />
                                        <span>{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="resume-actions">
                            <a href={CV_FILE} download={CV_NAME} className="btn btn-primary resume-download">
                                Download CV
                                <span className="btn-arrow" aria-hidden="true">
                                    <i className="fa-solid fa-download" />
                                </span>
                            </a>
                            <a href={CV_FILE} target="_blank" rel="noreferrer" className="btn btn-secondary">
                                View Online
                                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
