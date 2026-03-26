import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const contactLinks = [
    {
        Icon: FaEnvelope,
        label: 'Email',
        value: 'randzana1920@gmail.com',
        href: 'mailto:randzana1920@gmail.com',
        color: '#a78bfa',
    },
    {
        Icon: FaLinkedin,
        label: 'LinkedIn',
        value: '/in/randzana',
        href: 'https://www.linkedin.com/in/rand-zana-5b78522b5',
        color: '#0a66c2',
    },
    {
        Icon: FaGithub,
        label: 'GitHub',
        value: '@randzana',
        href: 'https://github.com/randzana',
        color: '#e6edf3',
    },
    {
        Icon: FaInstagram,
        label: 'Instagram',
        value: '@randvision.tech',
        href: 'https://www.instagram.com/randvision.tech/',
        color: '#e4405f',
    },
];

export default function Contact() {

    return (
        <section id="contact">
            <div className="gradient-orb gradient-orb-2" />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">Get In Touch</div>
                    <h2 className="section-title">Let's Work Together</h2>
                    <p className="section-desc">
                        Have a project in mind? I'd love to hear about it. Let's create something amazing.
                    </p>
                </motion.div>

                <div className="contact-wrapper">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <h3>Contact Information</h3>
                        <p>
                            Feel free to reach out through any of the channels below. I'm always open to
                            discussing new projects and opportunities.
                        </p>
                        <div className="contact-links">
                            {contactLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-link"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                                >
                                    <div className="contact-link-icon" style={{ background: `${link.color}18`, color: link.color }}>
                                        <link.Icon />
                                    </div>
                                    <div>
                                        <strong>{link.label}</strong>
                                        <small>{link.value}</small>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
