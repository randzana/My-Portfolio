import Reveal from './Reveal';

/* Editorial section header shared by every section:

     01  // ABOUT  ─────────────────────────────────────
     Turning vision into reality            short description

   `title` may contain <em className="serif">…</em> for the accent word. */
export default function SectionHeader({ index, label, title, desc }) {
    return (
        <header className="section-head">
            <Reveal className="section-head__meta" blur={false} y={12}>
                <span className="section-head__index">{index}</span>
                <span className="eyebrow">{label}</span>
                <span className="section-head__rule" aria-hidden="true" />
            </Reveal>
            <div className="section-head__main">
                <Reveal as="h2" className="section-head__title" delay={0.05}>
                    {title}
                </Reveal>
                {desc && (
                    <Reveal as="p" className="section-head__desc" delay={0.15}>
                        {desc}
                    </Reveal>
                )}
            </div>
        </header>
    );
}
