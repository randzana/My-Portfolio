import Reveal from './ui/Reveal';
import { trackSpotlight } from '../lib/spotlight';
import { goToSection } from '../lib/scroll';
import './FeaturedProject.css';

const featuredProjects = [
    {
        id: 'school-management',
        theme: 'indigo',
        ribbonBadge: 'Featured Project',
        ribbonSubtitle: 'Full-Stack Enterprise',
        status: 'Production Ready',
        image: '/school-preview.png',
        imageTrim: 0.09,
        imageAlt: 'School Administration & Financial Management System — Dashboard Preview',
        title: 'School Administration & Financial Management System',
        desc: 'A production-grade, full-stack school administration and financial management system with secure role-based access, comprehensive student profile tracking, dynamic tuition & meal-balance calculators with overpayment protection, an operational ledger, and automated analytical reports with PDF/CSV export.',
        features: [
            { icon: 'fa-solid fa-user-shield', label: 'RBAC Security' },
            { icon: 'fa-solid fa-calculator', label: 'Tuition Tracking' },
            { icon: 'fa-solid fa-file-invoice-dollar', label: 'Financial Audits' },
            { icon: 'fa-solid fa-scale-balanced', label: 'Disbursements & Payroll' },
            { icon: 'fa-solid fa-chart-pie', label: 'Analytical Reports' },
        ],
        techStack: [
            { icon: 'fa-brands fa-react', label: 'Next.js 15' },
            { icon: 'fa-brands fa-react', label: 'React 19' },
            { icon: 'fa-brands fa-laravel', label: 'Laravel 11' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL 16' },
            { icon: 'fa-solid fa-wind', label: 'Tailwind CSS' },
            { icon: 'fa-solid fa-code', label: 'TypeScript' },
        ],
        actions: [
            { href: 'https://github.com/randzana/schoolMangment.git', icon: 'fa-brands fa-github', label: 'Source Code', type: 'primary' },
        ],
        stats: [
            { value: 'Laravel 11', label: 'Backend API' },
            { value: 'Next.js 15', label: 'Frontend App' },
            { value: 'PGSQL 16', label: 'Database' },
            { value: 'Sanctum', label: 'Token Auth' },
        ],
    },
    {
        id: 'nali-cafe',
        theme: 'amber',
        ribbonBadge: 'Featured Project',
        ribbonSubtitle: 'Full-Stack Enterprise',
        status: 'Live in Production',
        image: '/nali-cafe-preview.png',
        imageTrim: 0.07,
        imageAlt: 'Nali Cafe Management System — Kiosk & Dashboard Preview',
        title: 'Cafe Management System',
        desc: 'A high-performance, dual-portal platform powering Nali Cafe\'s operations — from self-service mobile ordering with real-time kitchen sync to a comprehensive admin dashboard with live analytics, financial reporting, and multi-currency/bilingual support.',
        features: [
            { icon: 'fa-solid fa-tablet-screen-button', label: 'Smart Kiosk' },
            { icon: 'fa-solid fa-chart-line', label: 'Analytics' },
            { icon: 'fa-solid fa-bolt', label: 'Real-Time Orders' },
            { icon: 'fa-solid fa-globe', label: 'Kurdish / English' },
            { icon: 'fa-solid fa-shield-halved', label: 'JWT Auth' },
        ],
        techStack: [
            { icon: 'fa-brands fa-react', label: 'React 19' },
            { icon: 'fa-solid fa-bolt-lightning', label: 'Vite' },
            { icon: 'fa-brands fa-laravel', label: 'Laravel' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL' },
            { icon: 'fa-brands fa-docker', label: 'Docker' },
            { icon: 'fa-solid fa-wand-magic-sparkles', label: 'Framer Motion' },
        ],
        actions: [
            { href: 'https://cafemanagement.randvision.tech/', icon: 'fa-solid fa-rocket', label: 'View Live Demo', type: 'primary' },
            { href: 'https://github.com/randzana/Cafe-Management-System.git', icon: 'fa-brands fa-github', label: 'Source Code', type: 'secondary' },
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
        ribbonBadge: 'Award Winner',
        ribbonSubtitle: 'Zanko Award (2nd Place)',
        status: 'Zanko Award (2nd Place)',
        image: '/greenlegacy-preview.png',
        imageTrim: 0.04,
        imageAlt: 'Zanko GreenLegacy — Smart Campus Eco-System with Interactive Map & AI Verification',
        title: 'Zanko GreenLegacy',
        desc: 'A gamified, AI-powered mobile ecosystem that incentivizes environmental sustainability at Koya University — featuring an interactive campus map, automated computer-vision task verification through image & video analysis, faculty leaderboards, and digital eco-badges.',
        features: [
            { icon: 'fa-solid fa-map-location-dot', label: 'Campus Map' },
            { icon: 'fa-solid fa-robot', label: 'AI Verification' },
            { icon: 'fa-solid fa-trophy', label: 'Gamification' },
            { icon: 'fa-solid fa-seedling', label: 'NDVI Tracking' },
            { icon: 'fa-solid fa-video', label: 'Video Analysis' },
        ],
        techStack: [
            { icon: 'fa-solid fa-mobile-screen-button', label: 'Flutter' },
            { icon: 'fa-brands fa-python', label: 'Flask' },
            { icon: 'fa-solid fa-database', label: 'PostgreSQL' },
            { icon: 'fa-solid fa-eye', label: 'Pillow CV' },
            { icon: 'fa-solid fa-map', label: 'OpenStreetMap' },
            { icon: 'fa-solid fa-key', label: 'PyJWT' },
        ],
        actions: [
            { href: 'https://github.com/randzana/Zanko-GreenLegacy.git', icon: 'fa-brands fa-github', label: 'Source Code', type: 'primary' },
            { href: '#certificates', icon: 'fa-solid fa-award', label: 'View Certificate', type: 'secondary' },
        ],
        // Icon values replace the old decorative emoji (map, trophy, seedling).
        stats: [
            { value: 'AI', label: 'Vision Engine' },
            { icon: 'fa-solid fa-map-location-dot', label: 'Live Map' },
            { icon: 'fa-solid fa-trophy', label: 'Leaderboards' },
            { icon: 'fa-solid fa-seedling', label: 'Eco Badges' },
        ],
    },
];

// Label for the faux browser bar: the live host when there is one, else the project slug.
function frameLabel(project) {
    const live = project.actions.find(a => a.href.startsWith('http') && !a.href.includes('github.com'));
    return live ? new URL(live.href).host : project.id;
}

const pad = n => String(n).padStart(2, '0');

function ActionLink({ action }) {
    const internal = action.href.startsWith('#');
    const primary = action.type === 'primary';
    const linkProps = internal
        ? { onClick: e => goToSection(e, action.href) }
        : { target: '_blank', rel: 'noreferrer' };

    return (
        <a href={action.href} className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`} {...linkProps}>
            <i className={action.icon} aria-hidden="true" />
            {action.label}
            {!internal && <span className="sr-only"> (opens in a new tab)</span>}
            {primary && (
                <span className="btn-arrow" aria-hidden="true">
                    <i className={internal ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-right'} />
                </span>
            )}
        </a>
    );
}

function FeaturedProjectCard({ project, index, total }) {
    const isAward = /award/i.test(project.status);
    const titleId = `fp-title-${project.id}`;

    return (
        <article
            className={`fp-card fp-card--${project.theme} card card-hover spotlight ${index % 2 ? 'fp-card--flip' : ''}`}
            style={{ '--fp-trim': project.imageTrim ?? 0 }}
            aria-labelledby={titleId}
            onPointerMove={trackSpotlight}
        >
            <div className="fp-body">
                <figure className="fp-media">
                    <div className="fp-window">
                        <div className="fp-window-bar" aria-hidden="true">
                            <span className="fp-window-dots">
                                <span />
                                <span />
                                <span />
                            </span>
                            <span className="fp-window-label">{frameLabel(project)}</span>
                        </div>
                        <div className="fp-shot">
                            <img
                                src={project.image}
                                alt={project.imageAlt}
                                width="1024"
                                height="1024"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </figure>

                <div className="fp-content">
                    <div className="fp-intro">
                        <div className="fp-top">
                            <span className="fp-index">
                                <span className="fp-index-current">{pad(index + 1)}</span> / {pad(total)}
                            </span>
                            <span className={`chip fp-status ${isAward ? 'chip-accent' : ''}`}>
                                {isAward ? (
                                    <i className="fa-solid fa-trophy" aria-hidden="true" />
                                ) : (
                                    <span className="status-dot" aria-hidden="true" />
                                )}
                                {project.status}
                            </span>
                        </div>

                        <p className="chip chip-mono fp-ribbon">
                            <span className="fp-ribbon-badge">
                                <i className="fa-solid fa-star" aria-hidden="true" />
                                {project.ribbonBadge}
                            </span>
                            {/* GreenLegacy's subtitle repeats its status chip word for word. */}
                            {project.ribbonSubtitle !== project.status && (
                                <>
                                    <span className="fp-ribbon-sep" aria-hidden="true" />
                                    <span className="sr-only">, </span>
                                    {project.ribbonSubtitle}
                                </>
                            )}
                        </p>

                        <h3 className="fp-title" id={titleId}>{project.title}</h3>
                        <p className="fp-desc">{project.desc}</p>

                        <div className="fp-actions">
                            {project.actions.map(a => (
                                <ActionLink key={a.label} action={a} />
                            ))}
                        </div>
                    </div>

                    <div className="fp-specs">
                        <div className="fp-block">
                            <span className="fp-label">Highlights</span>
                            <ul className="fp-features">
                                {project.features.map(f => (
                                    <li key={f.label} className="fp-feature">
                                        <span className="fp-feature-icon" aria-hidden="true">
                                            <i className={f.icon} />
                                        </span>
                                        {f.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="fp-block">
                            <span className="fp-label">Stack</span>
                            <ul className="fp-tech">
                                {project.techStack.map(t => (
                                    <li key={t.label} className="chip">
                                        <i className={t.icon} aria-hidden="true" />
                                        {t.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <dl className="fp-stats">
                {project.stats.map(s => (
                    <div key={s.label} className="fp-stat">
                        <dt>{s.label}</dt>
                        <dd>{s.icon ? <i className={s.icon} aria-hidden="true" /> : s.value}</dd>
                    </div>
                ))}
            </dl>
        </article>
    );
}

export default function FeaturedProject() {
    return (
        <div className="fp-list">
            {featuredProjects.map((project, i) => (
                <Reveal key={project.id} amount={0.1}>
                    <FeaturedProjectCard project={project} index={i} total={featuredProjects.length} />
                </Reveal>
            ))}
        </div>
    );
}
