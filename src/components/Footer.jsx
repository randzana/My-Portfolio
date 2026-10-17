import Reveal from './ui/Reveal';
import { goToSection, scrollBehavior } from '../lib/scroll';
import './Footer.css';

const EMAIL = 'randzana1920@gmail.com';

const sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
];

const socials = [
    { icon: 'fa-brands fa-github', href: 'https://github.com/randzana', label: 'GitHub' },
    { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/rand-zana-5b78522b5', label: 'LinkedIn' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/rand.vision/', label: 'Instagram' },
    { icon: 'fa-solid fa-envelope', href: 'mailto:randzana1920@gmail.com', label: 'Email' },
];

export default function Footer() {
    const backToTop = () => window.scrollTo({ top: 0, behavior: scrollBehavior() });

    return (
        <footer className="footer">
            <div className="container">
                {/* ----- Closing call to action ----- */}
                <div className="footer-cta">
                    <Reveal as="h2" className="footer-cta__title">
                        Have a project in <em className="serif">mind?</em>
                    </Reveal>
                    <Reveal className="footer-cta__action" delay={0.08}>
                        <a
                            href="#contact"
                            className="btn btn-primary btn-lg"
                            onClick={e => goToSection(e, 'contact')}
                        >
                            Let&rsquo;s talk
                            <span className="btn-arrow" aria-hidden="true">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                        </a>
                    </Reveal>
                </div>

                {/* ----- Link columns ----- */}
                <div className="footer-cols">
                    <nav className="footer-col footer-col--nav" aria-labelledby="footer-nav-title">
                        <h3 id="footer-nav-title" className="footer-col__title">Navigation</h3>
                        <ol className="footer-links footer-links--nav">
                            {sections.map((s, i) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="footer-link"
                                        onClick={e => goToSection(e, s.id)}
                                    >
                                        <span className="footer-link__index" aria-hidden="true">
                                            {String(i + 1).padStart(2, '0')}
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
                            {socials.map(s => {
                                const external = s.href.startsWith('http');
                                return (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            className="footer-link"
                                            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                        >
                                            <i className={`footer-link__icon ${s.icon}`} aria-hidden="true" />
                                            <span className="footer-link__label">{s.label}</span>
                                            {external && (
                                                <>
                                                    <i
                                                        className="footer-link__ext fa-solid fa-arrow-up-right"
                                                        aria-hidden="true"
                                                    />
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
                                <a href="/cv/Rand-Zana-CV.pdf" className="footer-link" download>
                                    <span className="footer-link__label">Download CV</span>
                                    <span className="footer-link__meta" aria-hidden="true">PDF</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col footer-col--top">
                        <button
                            type="button"
                            className="footer-top"
                            onClick={backToTop}
                        >
                            <span className="footer-top__label">Back to top</span>
                            <span className="icon-btn footer-top__icon" aria-hidden="true">
                                <i className="fa-solid fa-arrow-up" />
                            </span>
                        </button>
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
                        © 2026 Rand Zana. Crafted with{' '}
                        <span className="footer-heart" aria-hidden="true">♥</span>
                        <span className="sr-only">love</span> and a lot of{' '}
                        <span aria-hidden="true">☕</span>
                        <span className="sr-only">coffee</span>
                    </p>
                    <p className="footer-loc">
                        <i className="fa-solid fa-location-dot" aria-hidden="true" />
                        Koya, Kurdistan
                    </p>
                </div>
            </div>
        </footer>
    );
}
