import { motion } from 'framer-motion';
import './Footer.css';

const socials = [
    { icon: 'fab fa-github', href: 'https://github.com/randzana', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/rand-zana-5b78522b5', label: 'LinkedIn' },
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/rand.vision/', label: 'Instagram' },
    { icon: 'fas fa-envelope', href: 'mailto:randzana1920@gmail.com', label: 'Email' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <motion.div
                    className="footer-socials"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -20px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    {socials.map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                            <i className={s.icon} />
                        </a>
                    ))}
                </motion.div>
                <motion.div
                    className="footer-divider"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    © 2026 Rand Zana. Crafted with <span className="heart">♥</span> and a lot of ☕
                </motion.p>
            </div>
        </footer>
    );
}
