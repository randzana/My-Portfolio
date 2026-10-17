// Feeds the cursor position to the `.spotlight` glow (see index.css).
// Usage: <div className="card spotlight" onPointerMove={trackSpotlight}>
export function trackSpotlight(event) {
    if (event.pointerType !== 'mouse') return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
