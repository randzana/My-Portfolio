import {
    LuArrowUpRight,
    LuAward,
    LuBriefcase,
    LuCodeXml,
    LuDownload,
    LuEye,
    LuFileText,
    LuGraduationCap,
    LuLayers,
    LuTrophy,
} from 'react-icons/lu';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { trackSpotlight } from '../lib/spotlight';
import { pad } from '../lib/format';
import { CV_FILE, CV_FILENAME } from '../lib/profile';
import './Resume.css';

const CV_PREVIEW = '/cv/cv-preview.webp';

// The CV's own section headings, in the order they appear on the page.
// Icons match the dock's (Skills = layers, Projects = code) where they overlap.
const CONTENTS = [
    { Icon: LuLayers, label: 'Tech Skills' },
    { Icon: LuBriefcase, label: 'Experience' },
    { Icon: LuCodeXml, label: 'Projects' },
    { Icon: LuGraduationCap, label: 'Education' },
    { Icon: LuAward, label: 'Certifications' },
    { Icon: LuTrophy, label: 'Leadership & Awards' },
];

export default function Resume() {
    return (
        <section id="resume" className="resume">
            <div className="container">
                <SectionHeader
                    index="06"
                    label="Resume"
                    title={<>Download my <em className="serif">CV</em></>}
                    desc="My skills, projects and experience in one document, ready to save or print."
                />

                <Reveal className="resume-card card card-hover spotlight" onPointerMove={trackSpotlight} delay={0.1}>
                    <a
                        href={CV_FILE}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-stage"
                        aria-label="Open Rand Zana’s CV in a new tab"
                    >
                        <span className="resume-stage-grid bg-grid" aria-hidden="true" />
                        <span className="resume-stage-meta resume-stage-meta--top" aria-hidden="true">
                            <span>Preview</span>
                            <span>A4</span>
                        </span>

                        <span className="resume-paper">
                            <img
                                src={CV_PREVIEW}
                                alt="Preview of Rand Zana’s CV"
                                width="720"
                                height="1019"
                                loading="lazy"
                                decoding="async"
                            />
                            <span className="resume-paper-cta" aria-hidden="true">
                                <LuEye />
                                View full CV
                            </span>
                        </span>

                        <span className="resume-stage-meta resume-stage-meta--bottom" aria-hidden="true">
                            <span>Rand Zana</span>
                            <span>1 / 2</span>
                        </span>
                    </a>

                    <div className="resume-body">
                        <div className="resume-file">
                            <span className="resume-file-icon" aria-hidden="true">
                                <LuFileText />
                            </span>
                            <span className="resume-file-text">
                                <strong>{CV_FILENAME}</strong>
                                <small>PDF · A4 · 2 pages</small>
                            </span>
                        </div>

                        <h3 className="resume-title">Full-Stack Software Engineer</h3>
                        <p className="resume-summary">
                            Final-year Software Engineering student at Koya University building full-stack
                            web apps with React, Next.js, Laravel and PostgreSQL — including a café
                            management system that’s live in production.
                        </p>

                        <div className="resume-contents">
                            <h4 className="resume-contents-label" id="resume-contents-label">
                                What’s inside
                            </h4>
                            <ul className="resume-contents-list" aria-labelledby="resume-contents-label">
                                {CONTENTS.map((item, i) => {
                                    const { Icon, label } = item;
                                    return (
                                        <li key={label} className="resume-contents-item">
                                            <span className="resume-contents-index" aria-hidden="true">
                                                {pad(i + 1)}
                                            </span>
                                            <Icon className="resume-contents-icon" aria-hidden="true" />
                                            <span>{label}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="resume-actions">
                            <a href={CV_FILE} download={CV_FILENAME} className="btn btn-primary resume-download">
                                Download CV
                                <span className="btn-arrow" aria-hidden="true">
                                    <LuDownload />
                                </span>
                            </a>
                            <a href={CV_FILE} target="_blank" rel="noreferrer" className="btn btn-secondary resume-view">
                                View Online
                                <LuArrowUpRight className="resume-view-icon" aria-hidden="true" />
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
