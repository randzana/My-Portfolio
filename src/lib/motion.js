// Shared framer-motion settings (EASE_OUT matches --ease-out in index.css).
export const EASE_OUT = [0.22, 1, 0.36, 1];

// Active-tab pill in segmented controls.
export const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 };

// Cards re-flowing when a filter changes.
export const LAYOUT_SPRING = { type: 'spring', stiffness: 360, damping: 36, mass: 0.9 };

/* Variants for cards in filterable grids: `shown` takes a stagger delay as
   its custom value. The blur is cleared at the end so it can't trap fixed
   descendants (see Reveal). */
export function cardVariants(reduceMotion) {
    return {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(8px)' },
        shown: delay => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.7, ease: EASE_OUT, delay },
            transitionEnd: { filter: 'none' },
        }),
        gone: reduceMotion
            ? { opacity: 0, transition: { duration: 0.15 } }
            : { opacity: 0, scale: 0.96, transition: { duration: 0.22, ease: EASE_OUT } },
    };
}
