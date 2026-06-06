import { motion } from 'framer-motion';
import './FeaturedProject.css';

const featuredProjects = [
    {
        id: 'nali-cafe',
        theme: 'amber',
        ribbonBadge: 'Featured Project',
        ribbonSubtitle: 'Full-Stack Enterprise',
        status: 'Live in Production',
        image: '/nali-cafe-preview.png',
        imageAlt: 'Nali Cafe Management System — Kiosk & Dashboard Preview',
        title: 'Cafe Management System',
        desc: 'A high-performance, dual-portal platform powering Nali Cafe\'s operations — from self-service Mobile ordering with real-time kitchen sync to a comprehensive admin dashboard with live analytics, financial reporting, and multi-currency/bilingual support.',
        features: [
            { icon: 'fa-solid fa-tablet-screen-button', label: 'Smart Kiosk', cls: 'fp-feature--kiosk' },
            { icon: 'fa-solid fa-chart-line', label: 'Analytics', cls: 'fp-feature--analytics' },
            { icon: 'fa-solid fa-bolt', label: 'Real-Time Orders', cls: 'fp-feature--realtime' },
            { icon: 'fa-solid fa-globe', label: 'Kurdish / English', cls: 'fp-feature--locale' },
            { icon: 'fa-solid fa-shield-halved', label: 'JWT Auth', cls: 'fp-feature--security' },
        ],
        techStack: [
            { icon: 'fa-brands fa-react', label: 'React 19', cls: 'fp-tech--react' },
            { icon: 'fa-solid fa-bolt-lightning', label: 'Vite', cls: 'fp-tech--vite' },
            { icon: 'fa-brands fa-laravel', label: 'Laravel', cls: 'fp-tech--laravel' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL', cls: 'fp-tech--postgres' },
            { icon: 'fa-brands fa-docker', label: 'Docker', cls: 'fp-tech--docker' },
            { icon: 'fa-solid fa-wand-magic-sparkles', label: 'Framer Motion', cls: 'fp-tech--framer' },
        ],
        actions: [
            { href: 'https://cafemanagement.randvision.tech/', icon: 'fa-solid fa-rocket', label: 'View Live Demo', type: 'primary' },
            { href: 'https://github.com/randzana/LIive-Menu-For-Diwaxani-Nali.git', icon: 'fa-brands fa-github', label: 'Source Code', type: 'secondary' },
        ],
        stats: [
            { value: '2', label: 'Portals' },
            { value: 'IQD/USD', label: 'Multi-Currency' },
            { value: 'KU/EN', label: 'Bilingual' },
            { value: 'JWT', label: 'Sanctum Auth' },
        ],
    },
    {
        id: 'zanko-greenlegacy',
        theme: 'green',
        ribbonBadge: 'Featured Project',
        ribbonSubtitle: 'IoT & Mobile Eco-System',
        status: 'University Project',
        image: '/greenlegacy-preview.png',
        imageAlt: 'Zanko GreenLegacy — Smart Campus Eco-System with Interactive Map & AI Verification',
        title: 'Zanko GreenLegacy',
        desc: 'A gamified, AI-powered mobile eco-system that incentivizes environmental sustainability at Koya University — featuring an interactive campus map, automated Computer Vision task verification through image & video analysis, faculty leaderboards, and digital eco-badges.',
        features: [
            { icon: 'fa-solid fa-map-location-dot', label: 'Campus Map', cls: 'fp-feature--map' },
            { icon: 'fa-solid fa-robot', label: 'AI Verification', cls: 'fp-feature--ai' },
            { icon: 'fa-solid fa-trophy', label: 'Gamification', cls: 'fp-feature--gamify' },
            { icon: 'fa-solid fa-seedling', label: 'NDVI Tracking', cls: 'fp-feature--ndvi' },
            { icon: 'fa-solid fa-video', label: 'Video Analysis', cls: 'fp-feature--video' },
        ],
        techStack: [
            { icon: 'fa-solid fa-mobile-screen-button', label: 'Flutter', cls: 'fp-tech--flutter' },
            { icon: 'fa-brands fa-python', label: 'Flask', cls: 'fp-tech--flask' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL', cls: 'fp-tech--postgres' },
            { icon: 'fa-solid fa-eye', label: 'Pillow CV', cls: 'fp-tech--pillow' },
            { icon: 'fa-solid fa-map', label: 'OpenStreetMap', cls: 'fp-tech--osm' },
            { icon: 'fa-solid fa-key', label: 'PyJWT', cls: 'fp-tech--jwt' },
        ],
        actions: [
            { href: 'https://github.com/randzana', icon: 'fa-brands fa-github', label: 'Source Code', type: 'primary' },
        ],
        stats: [
            { value: 'AI', label: 'Vision Engine' },
            { value: '🗺️', label: 'Live Map' },
            { value: '🏆', label: 'Leaderboards' },
            { value: '🌱', label: 'Eco Badges' },
        ],
    },
];

function FeaturedProjectCard({ project }) {
    const orbClasses = {
        amber: ['fp-ambient-orb--amber', 'fp-ambient-orb--violet', 'fp-ambient-orb--rose'],
        green: ['fp-ambient-orb--emerald', 'fp-ambient-orb--teal', 'fp-ambient-orb--lime'],
    };

    const orbs = orbClasses[project.theme] || orbClasses.amber;

    return (
        <motion.div
            className={`featured-project fp-theme--${project.theme}`}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Ambient background glow */}
            <div className="fp-ambient">
                {orbs.map((cls) => (
                    <div key={cls} className={`fp-ambient-orb ${cls}`} />
                ))}
            </div>

            <div className="fp-card">
                {/* Top Ribbon */}
                <div className="fp-ribbon">
                    <div className="fp-ribbon-left">
                        <span className="fp-ribbon-badge">
                            <i className="fa-solid fa-star" />
                            {project.ribbonBadge}
                        </span>
                        <span className="fp-subtitle">{project.ribbonSubtitle}</span>
                    </div>
                    <div className="fp-ribbon-status">
                        <span className="fp-status-dot" />
                        {project.status}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="fp-content">
                    {/* Preview Image */}
                    <div className="fp-preview">
                        <img
                            className="fp-preview-image"
                            src={project.image}
                            alt={project.imageAlt}
                            loading="eager"
                        />
                        <div className="fp-preview-overlay" />
                        <div className="fp-preview-grain" />
                    </div>

                    {/* Info Panel */}
                    <div className="fp-info">
                        <div className="fp-title-row">
                            <h3 className="fp-title">{project.title}</h3>
                        </div>

                        <p className="fp-desc">{project.desc}</p>

                        {/* Feature Pills */}
                        <div className="fp-features">
                            {project.features.map((f) => (
                                <span key={f.label} className={`fp-feature ${f.cls}`}>
                                    <i className={f.icon} />
                                    {f.label}
                                </span>
                            ))}
                        </div>

                        {/* Tech Stack */}
                        <div className="fp-tech-stack">
                            {project.techStack.map((t) => (
                                <span key={t.label} className={`fp-tech ${t.cls}`}>
                                    <i className={t.icon} />
                                    {t.label}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="fp-actions">
                            {project.actions.map((a) => (
                                <a
                                    key={a.label}
                                    href={a.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`fp-action fp-action--${a.type}`}
                                >
                                    <i className={a.icon} />
                                    {a.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="fp-stats-bar">
                    {project.stats.map((s) => (
                        <div key={s.label} className="fp-stat">
                            <span className="fp-stat-value">{s.value}</span>
                            <span className="fp-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function FeaturedProject() {
    return (
        <>
            {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
            ))}
        </>
    );
}
