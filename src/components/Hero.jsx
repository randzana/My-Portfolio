import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleField from './ParticleField';
import './Hero.css';

function Counter({ target, suffix = '+' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let current = 0;
                    const step = target / 120;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(current));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <span ref={ref} className="stat-number">
            {count}{suffix}
        </span>
    );
}

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-bg" />
            <div className="hero-overlay" />
            <div className="hero-gradient-1" />
            <div className="hero-gradient-2" />
            <ParticleField count={45} />

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <span className="badge-dot" />
                    <span>Available for opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                >
                    I Build{' '}
                    <span className="hero-gradient-text">Digital Experiences</span>
                    <br />That Matter
                </motion.h1>

                <motion.p
                    className="hero-desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Software Engineer, Videographer & Content Creator crafting elegant digital
                    experiences. Passionate about clean code, cinematic storytelling, and building
                    brands that stand out.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    <a href="#projects" className="btn btn-primary" onClick={e => {
                        e.preventDefault();
                        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <i className="fas fa-rocket" /> View My Work
                    </a>
                    <a href="#contact" className="btn btn-outline" onClick={e => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <i className="fas fa-paper-plane" /> Get in Touch
                    </a>
                </motion.div>

                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <div className="stat">
                        <Counter target={3} />
                        <div className="stat-label">Years Exp.</div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <Counter target={4} />
                        <div className="stat-label">Projects</div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <Counter target={8} />
                        <div className="stat-label">Technologies</div>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat">
                        <Counter target={100} suffix="%" />
                        <div className="stat-label">Passion</div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span>Scroll down</span>
                <div className="scroll-line">
                    <div className="scroll-dot" />
                </div>
            </motion.div>
        </section>
    );
}
