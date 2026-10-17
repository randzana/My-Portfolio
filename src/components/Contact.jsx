import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { EASE_OUT } from '../lib/motion';
import './Contact.css';

const EMAIL = 'randzana1920@gmail.com';

const CONTACT_LINKS = [
    {
        icon: 'fa-solid fa-envelope',
        label: 'Email',
        value: EMAIL,
        href: `mailto:${EMAIL}`,
    },
    {
        icon: 'fa-brands fa-linkedin-in',
        label: 'LinkedIn',
        value: '/in/randzana',
        href: 'https://www.linkedin.com/in/rand-zana-5b78522b5',
        external: true,
    },
    {
        icon: 'fa-brands fa-github',
        label: 'GitHub',
        value: '@randzana',
        href: 'https://github.com/randzana',
        external: true,
    },
    {
        icon: 'fa-brands fa-instagram',
        label: 'Instagram',
        value: '@randvision.tech',
        href: 'https://www.instagram.com/randvision.tech/',
        external: true,
    },
];

const FIELDS = [
    { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name', half: true },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com', half: true },
    { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'What is it about?' },
    { name: 'message', label: 'Message', multiline: true, placeholder: 'Tell me about your project…' },
];

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function validate(data) {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email address';
    }
    if (!data.subject.trim()) errors.subject = 'Subject is required';
    if (!data.message.trim()) errors.message = 'Message is required';
    return errors;
}

// Clipboard API first; the textarea fallback covers older Safari and
// pages served over plain http, where navigator.clipboard is missing.
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
        document.body.appendChild(area);
        area.select();
        let ok = false;
        try {
            ok = document.execCommand('copy');
        } catch {
            ok = false;
        }
        area.remove();
        return ok;
    }
}

function CopyEmail() {
    const [state, setState] = useState('idle'); // idle | copied | failed

    useEffect(() => {
        if (state === 'idle') return undefined;
        const id = setTimeout(() => setState('idle'), 2400);
        return () => clearTimeout(id);
    }, [state]);

    const onCopy = async () => {
        setState((await copyText(EMAIL)) ? 'copied' : 'failed');
    };

    const message = state === 'copied' ? 'Copied' : state === 'failed' ? 'Press Ctrl+C' : '';

    return (
        <div className="contact-copy" data-state={state}>
            <button
                type="button"
                className="icon-btn contact-copy__btn"
                onClick={onCopy}
                aria-label="Copy email address"
                title="Copy email address"
            >
                <i
                    className={state === 'copied' ? 'fa-solid fa-check' : 'fa-regular fa-copy'}
                    aria-hidden="true"
                />
            </button>
            <span className="contact-copy__status" aria-live="polite">
                {message}
                {state === 'copied' && <span className="sr-only"> email address to clipboard</span>}
            </span>
        </div>
    );
}

function Field({ field, value, error, onChange, inputRef }) {
    const id = `contact-${field.name}`;
    const errorId = `${id}-error`;
    const Control = field.multiline ? 'textarea' : 'input';

    return (
        <div className={`contact-field ${field.half ? 'is-half' : ''} ${error ? 'has-error' : ''}`}>
            <label htmlFor={id} className="contact-field__label">
                {field.label}
            </label>
            <Control
                ref={inputRef}
                id={id}
                name={field.name}
                className="contact-field__control"
                type={field.multiline ? undefined : field.type}
                rows={field.multiline ? 6 : undefined}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={value}
                onChange={onChange}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                required
            />
            <AnimatePresence initial={false}>
                {error && (
                    <motion.p
                        id={errorId}
                        className="contact-field__error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                        <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Contact() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | success
    const fieldRefs = useRef({});
    const successRef = useRef(null);
    const refocusForm = useRef(false);

    // Move focus with the swap so keyboard and screen-reader users land on
    // the confirmation, and back on the first field for another message.
    useEffect(() => {
        if (status === 'success') {
            successRef.current?.focus();
        } else if (refocusForm.current) {
            refocusForm.current = false;
            fieldRefs.current.name?.focus();
        }
    }, [status]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear the field's error as soon as the visitor edits it.
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const found = validate(formData);
        setErrors(found);
        const firstInvalid = FIELDS.find(f => found[f.name]);
        if (firstInvalid) {
            fieldRefs.current[firstInvalid.name]?.focus();
            return;
        }

        // No backend: hand the message to the visitor's mail app.
        const mailtoSubject = encodeURIComponent(formData.subject);
        const mailtoBody = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );
        // Same-tab navigation: a mailto opened in a new tab leaves a blank tab behind.
        window.location.href = `mailto:${EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

        setStatus('success');
        setFormData(EMPTY_FORM);
    };

    const startOver = () => {
        refocusForm.current = true;
        setStatus('idle');
    };

    const isSuccess = status === 'success';

    return (
        <section id="contact" className="contact">
            <div className="container">
                <SectionHeader
                    index="07"
                    label="Contact"
                    title={
                        <>
                            Let&rsquo;s work <em className="serif">together</em>
                        </>
                    }
                    desc="Have a project in mind? I'd love to hear about it. Let's create something amazing."
                />

                <div className="contact-grid">
                    {/* ----- Direct line + channels ----- */}
                    <div className="contact-info">
                        <Reveal className="contact-direct">
                            <p className="contact-kicker">Get in touch</p>
                            <div className="contact-email-row">
                                <a className="contact-email" href={`mailto:${EMAIL}`}>
                                    <span className="contact-email__text">
                                        randzana1920<wbr />@gmail.com
                                    </span>
                                </a>
                                <CopyEmail />
                            </div>
                            <p className="contact-response">
                                <span className="status-dot" aria-hidden="true" />
                                I usually respond within 24 hours
                            </p>
                            <p className="contact-blurb">
                                Feel free to reach out through the form or any of the channels below.
                                I&rsquo;m always open to discussing new projects, collaborations, and
                                opportunities.
                            </p>
                        </Reveal>

                        <div className="contact-channels">
                            <Reveal as="h3" className="contact-channels__title" delay={0.06} blur={false} y={12}>
                                <span>Contact information</span>
                                <span className="contact-channels__count" aria-hidden="true">
                                    {String(CONTACT_LINKS.length).padStart(2, '0')}
                                </span>
                            </Reveal>
                            <ul className="contact-list">
                                {CONTACT_LINKS.map((link, i) => (
                                    <Reveal as="li" key={link.label} delay={0.1 + i * 0.06} y={16}>
                                        <a
                                            className="contact-row"
                                            href={link.href}
                                            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                        >
                                            <span className="contact-row__icon" aria-hidden="true">
                                                <i className={link.icon} />
                                            </span>
                                            <span className="contact-row__text">
                                                <span className="contact-row__label">{link.label}</span>
                                                <span className="contact-row__value">{link.value}</span>
                                            </span>
                                            <span className="contact-row__arrow" aria-hidden="true">
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                            {link.external && <span className="sr-only"> (opens in a new tab)</span>}
                                        </a>
                                    </Reveal>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ----- Form ----- */}
                    <Reveal className="contact-card card" delay={0.1}>
                        <form
                            className={`contact-form ${isSuccess ? 'is-hidden' : ''}`}
                            onSubmit={handleSubmit}
                            inert={isSuccess}
                            noValidate
                        >
                            <header className="contact-form__head">
                                <h3 className="contact-form__title">Send a message</h3>
                                <p className="contact-form__note">All fields are required</p>
                            </header>

                            <div className="contact-form__grid">
                                {FIELDS.map(field => (
                                    <Field
                                        key={field.name}
                                        field={field}
                                        value={formData[field.name]}
                                        error={errors[field.name]}
                                        onChange={handleChange}
                                        inputRef={el => {
                                            fieldRefs.current[field.name] = el;
                                        }}
                                    />
                                ))}
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg contact-submit">
                                Send message
                                <span className="btn-arrow" aria-hidden="true">
                                    <i className="fa-solid fa-paper-plane" />
                                </span>
                            </button>
                            <p className="contact-form__foot">
                                Opens your email app with the message ready to send.
                            </p>
                        </form>

                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    className="contact-success"
                                    role="status"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.45, ease: EASE_OUT }}
                                >
                                    <span className="contact-success__icon" aria-hidden="true">
                                        <i className="fa-solid fa-check" />
                                    </span>
                                    <h3 className="contact-success__title" ref={successRef} tabIndex={-1}>
                                        Message Sent Successfully!
                                    </h3>
                                    <p className="contact-success__text">
                                        Thank you for reaching out. I&rsquo;ll get back to you as soon as possible.
                                    </p>
                                    <button type="button" className="btn btn-secondary" onClick={startOver}>
                                        <i className="fa-solid fa-rotate-left" aria-hidden="true" />
                                        Send another message
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
