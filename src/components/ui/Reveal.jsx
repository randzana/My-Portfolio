import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '../../lib/motion';

/* Fades, lifts and un-blurs its children the first time they scroll into
   view. `filter` is cleared once the animation ends: a lingering
   `blur(0px)` would turn this element into the containing block for any
   position: fixed descendant. Don't wrap modals in it all the same. */
export default function Reveal({
    as = 'div',
    delay = 0,
    y = 24,
    blur = true,
    amount = 0.2,
    className,
    children,
    ...rest
}) {
    const reduceMotion = useReducedMotion();
    const Tag = motion[as];

    const hidden = reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' };
    const shown = reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } };

    return (
        <Tag
            className={className}
            initial={hidden}
            whileInView={shown}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
