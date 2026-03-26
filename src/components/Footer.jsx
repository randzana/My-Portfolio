import { motion } from 'framer-motion';
import './Footer.css';

const socials = [
    { icon: 'fa-brands fa-github', href: 'https://github.com/randzana', label: 'GitHub' },
    { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/rand-zana-5b78522b5', label: 'LinkedIn' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/rand.vision/', label: 'Instagram' },
    { icon: 'fa-solid fa-envelope', href: 'mailto:randzana1920@gmail.com', label: 'Email' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

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
