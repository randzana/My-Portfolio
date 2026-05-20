import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [focusedField, setFocusedField] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errors, setErrors] = useState({});

    const handleFocus = (field) => setFocusedField(field);
    const handleBlur = () => setFocusedField(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error as user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            tempErrors.email = 'Invalid email address';
        }
        if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
        if (!formData.message.trim()) tempErrors.message = 'Message is required';
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('sending');
        
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1800);
    };

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

                <div className="contact-grid">
                    {/* Left Column: Glassmorphic Contact Form */}
                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div 
                                    className="contact-success-state"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="success-icon">
                                        <FaCheckCircle />
                                    </div>
                                    <h3>Message Sent Successfully!</h3>
                                    <p>Thank you for reaching out, Rand will get back to you as soon as possible.</p>
                                    <button 
                                        onClick={() => setStatus('idle')} 
                                        className="btn btn-primary"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    onSubmit={handleSubmit} 
                                    className="contact-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    noValidate
                                >
                                    <div className="form-title-wrapper">
                                        <h3>Send a Message</h3>
                                        <p>I usually respond within 24 hours.</p>
                                    </div>

                                    <div className="form-fields-grid">
                                        {/* Name Field */}
                                        <div className={`input-group ${focusedField === 'name' || formData.name ? 'float' : ''} ${errors.name ? 'has-error' : ''}`}>
                                            <label htmlFor="name">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus('name')}
                                                onBlur={handleBlur}
                                                disabled={status === 'sending'}
                                                required
                                            />
                                            {errors.name && <span className="error-text">{errors.name}</span>}
                                        </div>

                                        {/* Email Field */}
                                        <div className={`input-group ${focusedField === 'email' || formData.email ? 'float' : ''} ${errors.email ? 'has-error' : ''}`}>
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => handleFocus('email')}
                                                onBlur={handleBlur}
                                                disabled={status === 'sending'}
                                                required
                                            />
                                            {errors.email && <span className="error-text">{errors.email}</span>}
                                        </div>
                                    </div>

                                    {/* Subject Field */}
                                    <div className={`input-group ${focusedField === 'subject' || formData.subject ? 'float' : ''} ${errors.subject ? 'has-error' : ''}`}>
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('subject')}
                                            onBlur={handleBlur}
                                            disabled={status === 'sending'}
                                            required
                                        />
                                        {errors.subject && <span className="error-text">{errors.subject}</span>}
                                    </div>

                                    {/* Message Field */}
                                    <div className={`input-group ${focusedField === 'message' || formData.message ? 'float' : ''} ${errors.message ? 'has-error' : ''}`}>
                                        <label htmlFor="message">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('message')}
                                            onBlur={handleBlur}
                                            disabled={status === 'sending'}
                                            required
                                        />
                                        {errors.message && <span className="error-text">{errors.message}</span>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary submit-btn"
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <FaSpinner className="spinner" /> Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane /> Send Message
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Right Column: Contact Details & Links */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <div className="info-header">
                            <h3>Contact Information</h3>
                            <p>
                                Feel free to reach out through the form or any of the channels below. I'm always open to
                                discussing new projects, collaborations, and opportunities.
                            </p>
                        </div>
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
