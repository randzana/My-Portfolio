import { useMemo } from 'react';
import './ParticleField.css';

export default function ParticleField({ count = 40 }) {
    const particles = useMemo(() =>
        Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            duration: `${Math.random() * 20 + 12}s`,
            delay: `${Math.random() * 15}s`,
            size: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.4 + 0.1,
        })),
        [count]
    );

    return (
        <div className="particle-field">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    );
}
