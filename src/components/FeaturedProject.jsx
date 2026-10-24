import { FaDocker, FaFlutter, FaGithub, FaLaravel, FaPython, FaReact } from 'react-icons/fa6';
import {
    LuArrowDown,
    LuArrowRight,
    LuAward,
    LuBot,
    LuCalculator,
    LuChartLine,
    LuChartPie,
    LuCodeXml,
    LuDatabase,
    LuGlobe,
    LuKeyRound,
    LuLanguages,
    LuMap,
    LuMapPinned,
    LuReceiptText,
    LuScale,
    LuScanEye,
    LuShieldCheck,
    LuShieldHalf,
    LuSmartphone,
    LuSprout,
    LuStar,
    LuTabletSmartphone,
    LuTrophy,
    LuVideo,
    LuWandSparkles,
    LuWind,
    LuZap,
} from 'react-icons/lu';
import Reveal from './ui/Reveal';
import { trackSpotlight } from '../lib/spotlight';
import { goToSection } from '../lib/scroll';
import { pad } from '../lib/format';
import './FeaturedProject.css';

/* `focus` is the image's object-position. The square marketing shots are
   cropped by `object-fit: cover`, which only ever trims one axis: the x
   value applies beside the text (panel slightly taller than wide), the y
   value to the 4:3 panel of the stacked layout. Each is chosen so the crop
   lands in a margin or a gap between UI rows, never through text. */
const featuredProjects = [
    {
        id: 'school-management',
        hue: '#6366f1',
        ribbonBadge: 'Featured Project',
        ribbonSubtitle: 'Full-Stack Enterprise',
        status: 'Production Ready',
        focus: '46% 38%',
        imageAlt: 'School Administration & Financial Management System — Dashboard Preview',
        // No-break space keeps "Administration &" together when the title wraps.
        title: 'School Administration & Financial Management System',
        desc: 'A production-grade, full-stack school administration and financial management system with secure role-based access, comprehensive student profile tracking, dynamic tuition & meal-balance calculators with overpayment protection, an operational ledger, and automated analytical reports with PDF/CSV export.',
        features: [
            { icon: LuShieldCheck, label: 'RBAC Security' },
            { icon: LuCalculator, label: 'Tuition Tracking' },
            { icon: LuReceiptText, label: 'Financial Audits' },
            { icon: LuScale, label: 'Disbursements & Payroll' },
            { icon: LuChartPie, label: 'Analytical Reports' },
        ],
        techStack: [
            { icon: FaReact, label: 'Next.js 15' },
            { icon: FaReact, label: 'React 19' },
            { icon: FaLaravel, label: 'Laravel 11' },
            { icon: LuDatabase, label: 'PostgreSQL 16' },
            { icon: LuWind, label: 'Tailwind CSS' },
            { icon: LuCodeXml, label: 'TypeScript' },
        ],
        actions: [
            { href: 'https://github.com/randzana/schoolMangment.git', icon: FaGithub, label: 'Source Code', type: 'primary' },
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
        hue: '#f59e0b',
        ribbonBadge: 'Featured Project',
        ribbonSubtitle: 'Full-Stack Enterprise',
        status: 'Live in Production',
        focus: '85% 27%',
        imageAlt: 'Nali Cafe Management System — Kiosk & Dashboard Preview',
        title: 'Cafe Management System',
        desc: 'A high-performance, dual-portal platform powering Nali Cafe’s operations — from self-service mobile ordering with real-time kitchen sync to a comprehensive admin dashboard with live analytics, financial reporting, and multi-currency/bilingual support.',
        features: [
            { icon: LuTabletSmartphone, label: 'Smart Kiosk' },
            { icon: LuChartLine, label: 'Analytics' },
            { icon: LuZap, label: 'Real-Time Orders' },
            { icon: LuLanguages, label: 'Kurdish / English' },
            { icon: LuShieldHalf, label: 'JWT Auth' },
        ],
        techStack: [
            { icon: FaReact, label: 'React 19' },
            { icon: LuZap, label: 'Vite' },
            { icon: FaLaravel, label: 'Laravel' },
            { icon: LuDatabase, label: 'PostgreSQL' },
            { icon: FaDocker, label: 'Docker' },
            { icon: LuWandSparkles, label: 'Framer Motion' },
        ],
        actions: [
            { href: 'https://cafemanagement.randvision.tech/', icon: LuGlobe, label: 'View Live Demo', type: 'primary' },
            { href: 'https://github.com/randzana/Cafe-Management-System.git', icon: FaGithub, label: 'Source Code', type: 'secondary' },
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
        hue: '#22c55e',
        // The status pill already says it, so no ribbon chip on this card.
        status: 'Zanko Award (2nd Place)',
        focus: '55% 9%',
        imageAlt: 'Zanko GreenLegacy — Smart Campus Eco-System with Interactive Map & AI Verification',
        title: 'Zanko GreenLegacy',
        desc: 'A gamified, AI-powered mobile ecosystem that incentivizes environmental sustainability at Koya University — featuring an interactive campus map, automated computer-vision task verification through image & video analysis, faculty leaderboards, and digital eco-badges.',
        features: [
            { icon: LuMapPinned, label: 'Campus Map' },
            { icon: LuBot, label: 'AI Verification' },
            { icon: LuTrophy, label: 'Gamification' },
            { icon: LuSprout, label: 'NDVI Tracking' },
            { icon: LuVideo, label: 'Video Analysis' },
        ],
        techStack: [
            { icon: FaFlutter, label: 'Flutter' },
            { icon: FaPython, label: 'Flask' },
            { icon: LuDatabase, label: 'PostgreSQL' },
            { icon: LuScanEye, label: 'Pillow CV' },
            { icon: LuMap, label: 'OpenStreetMap' },
            { icon: LuKeyRound, label: 'PyJWT' },
        ],
        actions: [
            { href: 'https://github.com/randzana/Zanko-GreenLegacy.git', icon: FaGithub, label: 'Source Code', type: 'primary' },
            { href: '#certificates', certificate: 'Zanko Award (2nd Place)', icon: LuAward, label: 'View Certificate', type: 'secondary' },
        ],
        stats: [
            { value: 'AI', label: 'Vision Engine' },
            { value: 'OSM', label: 'Live Map' },
            { value: 'Faculty', label: 'Leaderboards' },
            { value: 'Eco', label: 'Badges' },
        ],
    },
];

// Beside the text the panel is at most ~660px wide and a little taller;
// stacked it spans the card.
const IMAGE_SIZES = '(min-width: 1200px) 700px, calc(100vw - 56px)';

/* Jumps to Certificates, then asks it to open this certificate in its
   lightbox. Two frames' wait: in app mode goToSection first switches the
   dock page and starts the scroll on the next frame. */
function openCertificate(event, title) {
    if (!goToSection(event, 'certificates')) return;
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            window.dispatchEvent(new CustomEvent('certs:open', { detail: { title } }));
        })
    );
}

function ActionLink({ action }) {
    const internal = action.href.startsWith('#');
    const primary = action.type === 'primary';
    const Icon = action.icon;
    const linkProps = internal
        ? {
            onClick: e =>
                action.certificate ? openCertificate(e, action.certificate) : goToSection(e, action.href),
        }
        : { target: '_blank', rel: 'noreferrer' };

    return (
        <a href={action.href} className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`} {...linkProps}>
            <Icon aria-hidden="true" />
            {action.label}
            {!internal && <span className="sr-only"> (opens in a new tab)</span>}
            {primary && (
                <span className="btn-arrow" aria-hidden="true">
                    {internal ? <LuArrowDown /> : <LuArrowRight />}
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
            className={`fp-card card card-hover spotlight${index % 2 ? ' fp-card--flip' : ''}`}
            style={{ '--fp-hue': project.hue }}
            aria-labelledby={titleId}
            onPointerMove={trackSpotlight}
        >
            <figure className="fp-media">
                <img
                    src={`/projects/${project.id}.webp`}
                    srcSet={`/projects/${project.id}-640.webp 640w, /projects/${project.id}.webp 1024w`}
                    sizes={IMAGE_SIZES}
                    alt={project.imageAlt}
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{ objectPosition: project.focus }}
                />
            </figure>

            <div className="fp-content">
                <div className="fp-intro">
                    <div className="fp-top">
                        <span className="fp-index">
                            <span className="fp-index-current">{pad(index + 1)}</span> / {pad(total)}
                        </span>
                        <span className={`chip fp-status${isAward ? ' chip-accent' : ''}`}>
                            {isAward ? <LuTrophy aria-hidden="true" /> : <span className="status-dot" aria-hidden="true" />}
                            {project.status}
                        </span>
                    </div>

                    {project.ribbonBadge && (
                        <p className="chip chip-mono fp-ribbon">
                            <span className="fp-ribbon-badge">
                                <LuStar aria-hidden="true" />
                                {project.ribbonBadge}
                            </span>
                            <span className="fp-ribbon-sep" aria-hidden="true" />
                            <span className="sr-only">, </span>
                            {project.ribbonSubtitle}
                        </p>
                    )}

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
                                        <f.icon />
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
                                    <t.icon aria-hidden="true" />
                                    {t.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <dl className="fp-stats">
                {project.stats.map(s => (
                    <div key={s.label} className="fp-stat">
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
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
