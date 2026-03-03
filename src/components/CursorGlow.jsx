import { useState, useEffect } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        width: 700,
        height: 700,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 30%, transparent 60%)',
        transform: `translate(${pos.x - 350}px, ${pos.y - 350}px)`,
        transition: 'transform 0.08s linear',
      }}
    />
  );
}
