import { motion } from 'framer-motion';
import './FeaturedProject.css';

export default function FeaturedProject() {
    return (
        <motion.div
            className="featured-project"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Ambient background glow */}
            <div className="fp-ambient">
                <div className="fp-ambient-orb fp-ambient-orb--amber" />
                <div className="fp-ambient-orb fp-ambient-orb--violet" />
                <div className="fp-ambient-orb fp-ambient-orb--rose" />
            </div>

            <div className="fp-card">
                {/* Top Ribbon */}
                <div className="fp-ribbon">
                    <div className="fp-ribbon-left">
                        <span className="fp-ribbon-badge">
                            <i className="fa-solid fa-star" />
                            Featured Project
                        </span>
                        <span className="fp-subtitle">Full-Stack Enterprise</span>
                    </div>
                    <div className="fp-ribbon-status">
                        <span className="fp-status-dot" />
                        Live in Production
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="fp-content">
                    {/* Preview Image */}
                    <div className="fp-preview">
                        <img
                            className="fp-preview-image"
                            src="/nali-cafe-preview.png"
                            alt="Nali Cafe Management System — Kiosk & Dashboard Preview"
                            loading="eager"
                        />
                        <div className="fp-preview-overlay" />
                        <div className="fp-preview-grain" />
                    </div>

                    {/* Info Panel */}
                    <div className="fp-info">
                        <div className="fp-title-row">
                            <h3 className="fp-title">
                                Cafe Management System
                            </h3>
                        </div>

                        <p className="fp-desc">
                            A high-performance, dual-portal platform powering Nali Cafe's operations — from self-service tablet kiosk ordering with real-time kitchen sync to a comprehensive admin dashboard with live analytics, financial reporting, and multi-currency/bilingual support.
                        </p>

                        {/* Feature Pills */}
                        <div className="fp-features">
                            <span className="fp-feature fp-feature--kiosk">
                                <i className="fa-solid fa-tablet-screen-button" />
                                Smart Kiosk
                            </span>
                            <span className="fp-feature fp-feature--analytics">
                                <i className="fa-solid fa-chart-line" />
                                Analytics
                            </span>
                            <span className="fp-feature fp-feature--realtime">
                                <i className="fa-solid fa-bolt" />
                                Real-Time Orders
                            </span>
                            <span className="fp-feature fp-feature--locale">
                                <i className="fa-solid fa-globe" />
                                Kurdish / English
                            </span>
                            <span className="fp-feature fp-feature--security">
                                <i className="fa-solid fa-shield-halved" />
                                JWT Auth
                            </span>
                        </div>

                        {/* Tech Stack */}
                        <div className="fp-tech-stack">
                            <span className="fp-tech fp-tech--react">
                                <i className="fa-brands fa-react" />
                                React 19
                            </span>
                            <span className="fp-tech fp-tech--vite">
                                <i className="fa-solid fa-bolt-lightning" />
                                Vite
                            </span>
                            <span className="fp-tech fp-tech--laravel">
                                <i className="fa-brands fa-laravel" />
                                Laravel
                            </span>
                            <span className="fp-tech fp-tech--postgres">
                                <i className="fa-solid fa-database" />
                                PostgreSQL
                            </span>
                            <span className="fp-tech fp-tech--docker">
                                <i className="fa-brands fa-docker" />
                                Docker
                            </span>
                            <span className="fp-tech fp-tech--framer">
                                <i className="fa-solid fa-wand-magic-sparkles" />
                                Framer Motion
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="fp-actions">
                            <a
                                href="https://cafemanagement.randvision.tech/"
                                target="_blank"
                                rel="noreferrer"
                                className="fp-action fp-action--primary"
                            >
                                <i className="fa-solid fa-rocket" />
                                View Live Demo
                            </a>
                            <a
                                href="https://github.com/randzana/LIive-Menu-For-Diwaxani-Nali.git"
                                target="_blank"
                                rel="noreferrer"
                                className="fp-action fp-action--secondary"
                            >
                                <i className="fa-brands fa-github" />
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="fp-stats-bar">
                    <div className="fp-stat">
                        <span className="fp-stat-value">2</span>
                        <span className="fp-stat-label">Portals</span>
                    </div>
                    <div className="fp-stat">
                        <span className="fp-stat-value">IQD/USD</span>
                        <span className="fp-stat-label">Multi-Currency</span>
                    </div>
                    <div className="fp-stat">
                        <span className="fp-stat-value">KU/EN</span>
                        <span className="fp-stat-label">Bilingual</span>
                    </div>
                    <div className="fp-stat">
                        <span className="fp-stat-value">JWT</span>
                        <span className="fp-stat-label">Sanctum Auth</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
