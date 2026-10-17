import { useEffect, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { trackSpotlight } from '../lib/spotlight';
import './About.css';

const TRAITS = [
    'Problem Solver',
    'Fast Learner',
    'Team Player',
    'Creative Thinker',
    'Clean Code',
    'Videographer',
    'Marketing',
    'Content Creator',
    'Curiosity',
    'Understanding Context',
    'Technical Mindset',
    'Data Strategy',
];

// Notes are lifted from the intro copy, so the list adds no new claims.
const DISCIPLINES = [
    { name: 'Software Engineering', note: 'Complex systems, clean code' },
    { name: 'Videography', note: 'Cinematic content' },
    { name: 'Marketing & Brand', note: 'Campaigns & brand strategy' },
    { name: 'Content Creation', note: 'Engaging, detail-first content' },
];

// `level` drives the little meter (out of LEVEL_STEPS); the word is what's read.
const LEVEL_STEPS = 5;
const LANGUAGES = [
    { name: 'Kurdish Sorani', label: 'Native', level: 5 },
    { name: 'English', label: 'Good', level: 3 },
];

const RECOGNITION = [
    { title: 'Zanko Award, 2nd place', org: 'Koya University', year: '2026' },
    { title: 'Leader of the SOFTSPACE Group', org: 'Koya University', year: '2025–2026' },
];

// B.Sc. 2023 – 2027: four academic years, the last one is the current one.
const DEGREE_YEARS = 4;

const TIME_ZONE = 'Asia/Baghdad';
const clockFormat = (() => {
    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone: TIME_ZONE,
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        });
    } catch {
        return null;
    }
})();

function koyaTime(date) {
    if (clockFormat) {
        const parts = clockFormat.formatToParts(date);
        const hh = parts.find(p => p.type === 'hour')?.value ?? '00';
        const mm = parts.find(p => p.type === 'minute')?.value ?? '00';
        return { hour: Number(hh), text: `${hh}:${mm}` };
    }
    // No time-zone support: Iraq has stayed on UTC+3 all year since 2008.
    const shifted = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    const hh = String(shifted.getUTCHours()).padStart(2, '0');
    const mm = String(shifted.getUTCMinutes()).padStart(2, '0');
    return { hour: shifted.getUTCHours(), text: `${hh}:${mm}` };
}

/* Current time in Koya, refreshed every 30s and as soon as a backgrounded
   tab comes back (browsers throttle timers in hidden tabs). */
function useKoyaClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const tick = () => setNow(new Date());
        const id = setInterval(tick, 30_000);
        const onVisible = () => {
            if (!document.hidden) tick();
        };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            clearInterval(id);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);

    return koyaTime(now);
}

function BentoCard({ area, label, labelAs = 'h3', aside, index, children }) {
    const Label = labelAs;
    return (
        <Reveal
            as="article"
            delay={index * 0.06}
            className={`about-card about-card--${area} card card-hover spotlight`}
            onPointerMove={trackSpotlight}
        >
            <header className="about-card__head">
                <Label className="about-card__label eyebrow">{label}</Label>
                {aside}
            </header>
            {children}
        </Reveal>
    );
}

function IconTile({ icon }) {
    return (
        <span className="about-icon" aria-hidden="true">
            <i className={icon} />
        </span>
    );
}

function BasedInCard({ index }) {
    const { hour, text } = useKoyaClock();
    const isDay = hour >= 6 && hour < 18;

    return (
        <BentoCard
            area="place"
            label="Based in"
            index={index}
            aside={<IconTile icon={isDay ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />}
        >
            <div className="about-card__body about-place">
                <p className="about-card__title">
                    Koya, Erbil
                    <span className="about-card__sub">Kurdistan Region, Iraq</span>
                </p>
                <p className="about-clock">
                    <span className="about-clock__label">Local time</span>
                    <span className="about-clock__row">
                        <time className="about-clock__time" dateTime={text}>
                            {text}
                        </time>
                        <span className="about-clock__zone">GMT+3</span>
                    </span>
                </p>
            </div>
        </BentoCard>
    );
}

export default function About() {
    return (
        <section id="about" className="about">
            <div className="container">
                <SectionHeader
                    index="01"
                    label="About"
                    title={
                        <>
                            Turning vision into <em className="serif">reality</em>
                        </>
                    }
                    desc="A passionate engineer who loves transforming ideas into impactful software solutions."
                />

                <div className="about-bento">
                    <BentoCard area="intro" label="Intro" labelAs="p" index={0}>
                        <div className="about-intro__grid bg-grid" aria-hidden="true" />
                        <div className="about-card__body about-intro__copy">
                            <h3 className="about-intro__title">
                                Hello, I&rsquo;m <em className="serif">Rand Zana</em>
                            </h3>
                            <p className="about-intro__lede">
                                I bridge the gap between tech and creativity. As a software engineer,
                                photographer, and brand strategist, I do everything from architecting
                                complex systems to crafting marketing campaigns and cinematic content.
                            </p>
                            <p className="about-intro__text">
                                From clean code to engaging content, I&rsquo;m obsessed with the details. I
                                apply the same high standards to every project, whether it&rsquo;s technical
                                or creative.
                            </p>
                        </div>
                    </BentoCard>

                    <BentoCard
                        area="now"
                        label="Currently"
                        index={1}
                        aside={<IconTile icon="fa-solid fa-graduation-cap" />}
                    >
                        <div className="about-card__body">
                            <p className="about-card__title">
                                Final-year Software Engineering student
                                <span className="about-card__sub">Koya University, Faculty of Engineering</span>
                            </p>
                            <div className="about-degree">
                                <span className="about-degree__bar" aria-hidden="true">
                                    {Array.from({ length: DEGREE_YEARS }, (_, i) => (
                                        <span
                                            key={i}
                                            className={i === DEGREE_YEARS - 1 ? 'is-current' : 'is-done'}
                                        />
                                    ))}
                                </span>
                                <span className="about-degree__years">
                                    <span>2023</span>
                                    <span className="sr-only"> – </span>
                                    <span>2027 (expected)</span>
                                </span>
                            </div>
                        </div>
                    </BentoCard>

                    <BasedInCard index={2} />

                    <BentoCard area="do" label="What I do" index={3}>
                        <ol className="about-card__body about-do">
                            {DISCIPLINES.map((item, i) => (
                                <li key={item.name} className="about-do__item">
                                    <span className="about-do__num" aria-hidden="true">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="about-do__text">
                                        <span className="about-do__name">{item.name}</span>
                                        <span className="about-do__note">{item.note}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </BentoCard>

                    <BentoCard area="lang" label="Languages" index={4}>
                        <ul className="about-card__body about-lang">
                            {LANGUAGES.map(lang => (
                                <li key={lang.name} className="about-lang__item">
                                    <span className="about-lang__name">{lang.name}</span>
                                    <span className="about-lang__level">{lang.label}</span>
                                    <span className="about-lang__meter" aria-hidden="true">
                                        {Array.from({ length: LEVEL_STEPS }, (_, i) => (
                                            <span key={i} className={i < lang.level ? 'is-on' : undefined} />
                                        ))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </BentoCard>

                    <BentoCard
                        area="traits"
                        label="Traits"
                        index={5}
                        aside={<span className="about-card__count">{String(TRAITS.length).padStart(2, '0')}</span>}
                    >
                        <ul className="about-card__body about-traits">
                            {TRAITS.map(trait => (
                                <li key={trait} className="chip about-traits__chip">
                                    {trait}
                                </li>
                            ))}
                        </ul>
                    </BentoCard>

                    <BentoCard
                        area="award"
                        label="Recognition"
                        index={6}
                        aside={<IconTile icon="fa-solid fa-trophy" />}
                    >
                        <ul className="about-card__body about-awards">
                            {RECOGNITION.map(item => (
                                <li key={item.title} className="about-awards__item">
                                    <span className="about-awards__title">{item.title}</span>
                                    <span className="about-awards__meta">
                                        <span>{item.org}</span>
                                        <span className="about-awards__year">{item.year}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
}
