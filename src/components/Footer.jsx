import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { LuArrowRight, LuArrowUp, LuArrowUpRight, LuMail } from 'react-icons/lu';
import Reveal from './ui/Reveal';
import { pad } from '../lib/format';
import { goToSection, scrollBehavior } from '../lib/scroll';
import { CV_FILE, CV_FILENAME, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../lib/profile';
import './Footer.css';

const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@');

const SECTIONS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
];

const SOCIALS = [
    { icon: FaGithub, href: GITHUB_URL, label: 'GitHub', external: true },
    { icon: FaLinkedinIn, href: LINKEDIN_URL, label: 'LinkedIn', external: true },
    { icon: FaInstagram, href: 'https://www.instagram.com/rand.vision/', label: 'Instagram', external: true },
    { icon: LuMail, href: `mailto:${EMAIL}`, label: 'Email' },
];

export default function Footer() {
    const backToTop = () => window.scrollTo({ top: 0, behavior: scrollBehavior() });

    return (
        <footer className="footer">
            <div className="container">
                {/* ----- Sign-off: where Rand is, and the one address to write to ----- */}
                <div className="footer-signoff">
                    <Reveal as="h2" className="footer-signoff__status" blur={false} y={12}>
                        <span className="footer-signoff__avail">
                            <span className="status-dot" aria-hidden="true" />
                            Available for opportunities
                        </span>
                        <span className="footer-signoff__sep" aria-hidden="true">
                            ·
                        </span>
                        <span className="sr-only">. </span>
                        <span className="footer-signoff__place">Based in Koya, Kurdistan</span>
                    </Reveal>
                    <Reveal className="footer-signoff__mail" delay={0.06}>
                        <a href={`mailto:${EMAIL}`} className="footer-signoff__email">
                            <span className="footer-signoff__text">
                                {EMAIL_USER}
                                <wbr />@{EMAIL_DOMAIN}
                            </span>
                            <span className="footer-signoff__chip" aria-hidden="true">
                                <LuArrowRight />
                            </span>
                        </a>
                    </Reveal>
                </div>

                {/* ----- Link columns ----- */}
                <div className="footer-cols">
                    {/* Hidden in app mode, where the dock does this job. */}
                    <nav className="footer-col footer-col--nav" aria-labelledby="footer-nav-title">
                        <h3 id="footer-nav-title" className="footer-col__title">Navigation</h3>
                        <ol className="footer-links footer-links--nav">
                            {SECTIONS.map((s, i) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="footer-link"
                                        onClick={e => goToSection(e, s.id)}
                                    >
                                        <span className="footer-link__index" aria-hidden="true">
                                            {pad(i + 1)}
                                        </span>
                                        <span className="footer-link__label">{s.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="footer-col">
                        <h3 className="footer-col__title">Socials</h3>
                        <ul className="footer-links footer-links--socials">
                            {SOCIALS.map(s => {
                                const Icon = s.icon;
                                return (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            className="footer-link"
                                            {...(s.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                        >
                                            <Icon className="footer-link__icon" aria-hidden="true" />
                                            <span className="footer-link__label">{s.label}</span>
                                            {s.external && (
                                                <>
                                                    <LuArrowUpRight className="footer-link__ext" aria-hidden="true" />
                                                    <span className="sr-only"> (opens in a new tab)</span>
                                                </>
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3 className="footer-col__title">Contact</h3>
                        <ul className="footer-links">
                            <li>
                                <a href={`mailto:${EMAIL}`} className="footer-link footer-link--email">
                                    <span className="footer-link__label">{EMAIL}</span>
                                </a>
                            </li>
                            <li>
                                <a href={CV_FILE} className="footer-link" download={CV_FILENAME}>
                                    <span className="footer-link__label">Download CV</span>
                                    <span className="footer-link__meta" aria-hidden="true">PDF</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ----- Wordmark ----- */}
                <div className="footer-wordmark" aria-hidden="true">
                    <span className="footer-wordmark__text">
                        Rand <em className="serif">Zana</em>
                        <span className="footer-wordmark__dot" />
                    </span>
                </div>

                {/* ----- Bottom bar ----- */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        © 2026 Rand Zana.{' '}
                        {/* Wraps as one piece on narrow phones. */}
                        <span className="footer-copy__craft">
                            Crafted with{' '}
                            {/* U+FE0E keeps the heart a text glyph, so it takes the accent colour. */}
                            <span className="footer-heart" aria-hidden="true">
                                {'\u2665\uFE0E'}
                            </span>
                            <span className="sr-only">love</span> and a lot of{' '}
                            <span aria-hidden="true">☕</span>
                            <span className="sr-only">coffee</span>
                        </span>
                    </p>
                    <button type="button" className="footer-top" onClick={backToTop}>
                        <span className="footer-top__label">Back to top</span>
                        <span className="footer-top__icon" aria-hidden="true">
                            <LuArrowUp />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
