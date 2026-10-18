import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PILL_SPRING } from '../../lib/motion';
import { pad } from '../../lib/format';
import './FilterTabs.css';

/* Segmented filter control shared by Skills and Certificates.
   items: [{ id, label, count? }]. On narrow screens the control scrolls
   sideways inside itself; the chosen or keyboard-focused tab is brought to
   the middle so it's never left half off-screen. */
export default function FilterTabs({ items, value, onChange, label, layoutId, className }) {
    const reduceMotion = useReducedMotion();
    const scrollerRef = useRef(null);

    const centerTab = tab => {
        const scroller = scrollerRef.current;
        if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
        const box = scroller.getBoundingClientRect();
        const rect = tab.getBoundingClientRect();
        scroller.scrollBy({
            left: rect.left + rect.width / 2 - (box.left + box.width / 2),
            behavior: reduceMotion ? 'auto' : 'smooth',
        });
    };

    return (
        // layoutScroll: lets the pill's layout animation account for this scroller.
        <motion.div
            className={['filter-tabs-scroll', className].filter(Boolean).join(' ')}
            ref={scrollerRef}
            layoutScroll
        >
            <div className="filter-tabs" role="group" aria-label={label}>
                {items.map(item => {
                    const active = value === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`filter-tabs__btn${active ? ' is-active' : ''}`}
                            data-id={item.id}
                            aria-pressed={active}
                            onClick={event => {
                                onChange(item.id);
                                centerTab(event.currentTarget);
                            }}
                            onFocus={event => centerTab(event.currentTarget)}
                        >
                            {active && (
                                <motion.span
                                    className="filter-tabs__pill"
                                    layoutId={layoutId}
                                    transition={PILL_SPRING}
                                    aria-hidden="true"
                                />
                            )}
                            <span className="filter-tabs__label">{item.label}</span>
                            {item.count != null && (
                                <span className="filter-tabs__count" aria-hidden="true">{pad(item.count)}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
