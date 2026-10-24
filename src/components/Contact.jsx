import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import {
    LuArrowRight,
    LuCheck,
    LuCircleAlert,
    LuCopy,
    LuMail,
    LuMailCheck,
    LuPencil,
    LuRotateCcw,
    LuSend,
} from 'react-icons/lu';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { EASE_OUT } from '../lib/motion';
import { pad } from '../lib/format';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../lib/profile';
import './Contact.css';

const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split('@');

const CONTACT_LINKS = [
    {
        icon: LuMail,
        label: 'Email',
        value: EMAIL,
        href: `mailto:${EMAIL}`,
    },
    {
        icon: FaLinkedinIn,
        label: 'LinkedIn',
        value: '/in/randzana',
        href: LINKEDIN_URL,
        external: true,
    },
    {
        icon: FaGithub,
        label: 'GitHub',
        value: '@randzana',
        href: GITHUB_URL,
        external: true,
    },
    {
        icon: FaInstagram,
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
        errors.email = 'Enter a valid email address';
    }
    if (!data.subject.trim()) errors.subject = 'Subject is required';
    if (!data.message.trim()) errors.message = 'Message is required';
    return errors;
}

// Read by the assertive live region: "2 fields need attention. Name is required. …"
function errorSummary(messages) {
    const count = messages.length;
    return `${count} ${count === 1 ? 'field needs' : 'fields need'} attention. ${messages.join('. ')}.`;
}

const messageBody = data => `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;

const mailtoHref = data =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(messageBody(data))}`;

// What "Copy your message" puts on the clipboard: enough to paste into any webmail.
const draftText = data => `To: ${EMAIL}\nSubject: ${data.subject}\n\n${messageBody(data)}`;

/* Clipboard API first; the textarea fallback covers older Safari and pages
   served over plain http, where navigator.clipboard is missing. select()
   pulls focus into the temporary textarea, so focus is handed back after. */
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const previous = document.activeElement;
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.setAttribute('aria-hidden', 'true');
        area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;font-size:16px';
        document.body.appendChild(area);
        area.select();
        area.setSelectionRange(0, text.length);
        let ok = false;
        try {
            ok = document.execCommand('copy');
        } catch {
            ok = false;
        }
        area.remove();
        if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
        return ok;
    }
}

// When copying fails, select the text instead so the visitor can copy it.
function selectContents(node) {
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
}

const isApple = () =>
    /mac|iphone|ipad|ipod/i.test(navigator.userAgentData?.platform || navigator.platform || navigator.userAgent);

// Touch-only devices have no copy shortcut to suggest.
const hasKeyboardPointer = () => window.matchMedia('(any-pointer: fine)').matches;

function copyFailureHint() {
    if (!hasKeyboardPointer()) {
        return { shown: 'Address selected', spoken: 'Couldn’t copy automatically. The address is selected, copy it from the menu.' };
    }
    const apple = isApple();
    return {
        shown: `Press ${apple ? '⌘C' : 'Ctrl+C'}`,
        spoken: `Couldn’t copy automatically. The address is selected, press ${apple ? 'Command' : 'Control'} C to copy it.`,
    };
}

function CopyEmail({ textRef }) {
    const [state, setState] = useState({ kind: 'idle' }); // idle | copied | failed

    useEffect(() => {
        if (state.kind === 'idle') return undefined;
        const id = setTimeout(() => setState({ kind: 'idle' }), state.kind === 'failed' ? 4000 : 2400);
        return () => clearTimeout(id);
    }, [state]);

    const onCopy = async () => {
        if (await copyText(EMAIL)) {
            setState({ kind: 'copied', shown: 'Copied', spoken: 'Email address copied to clipboard.' });
            return;
        }
        selectContents(textRef.current);
        setState({ kind: 'failed', ...copyFailureHint() });
    };

    return (
        <div className="contact-copy" data-state={state.kind}>
            <button
                type="button"
                className="icon-btn contact-copy__btn"
                onClick={onCopy}
                aria-label="Copy email address"
                title="Copy email address"
            >
                {state.kind === 'copied' ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
            </button>
            <span className="contact-copy__status" aria-hidden="true">
                {state.shown}
            </span>
            <span className="sr-only" role="status">
                {state.spoken}
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
                        key={errorId}
                        id={errorId}
                        className="contact-field__error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                        <LuCircleAlert aria-hidden="true" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* Shown once the message has been handed to the visitor's mail app. There
   is no backend, so it can't claim the message was sent: it says what
   should have happened and offers a way out if the mail app never opened. */
function HandOff({ draft, titleRef, onEdit, onStartOver }) {
    const [copy, setCopy] = useState('idle'); // idle | copied | failed
    const draftRef = useRef(null);

    useEffect(() => {
        if (copy !== 'copied') return undefined;
        const id = setTimeout(() => setCopy('idle'), 2400);
        return () => clearTimeout(id);
    }, [copy]);

    // Copy failed: show the message itself, selected, ready to copy by hand.
    useEffect(() => {
        if (copy !== 'failed') return;
        draftRef.current?.focus({ preventScroll: true });
        draftRef.current?.select();
    }, [copy]);

    const onCopy = async () => setCopy((await copyText(draft)) ? 'copied' : 'failed');

    const apple = isApple();
    const spoken =
        copy === 'copied'
            ? 'Your message is copied to the clipboard.'
            : copy === 'failed'
              ? hasKeyboardPointer()
                  ? `Couldn’t copy automatically. Your message is selected below, press ${apple ? 'Command' : 'Control'} C to copy it.`
                  : 'Couldn’t copy automatically. Your message is selected below, copy it from the menu.'
              : '';

    return (
        <motion.div
            className="contact-sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_OUT } }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
        >
            <span className="contact-sent__icon" aria-hidden="true">
                <LuMailCheck />
            </span>
            <h3 className="contact-sent__title" ref={titleRef} tabIndex={-1}>
                Your email app should open now
            </h3>
            <p className="contact-sent__text">
                Your message is ready in a new email. Press send there and I&rsquo;ll get back to you as soon
                as I can.
            </p>

            <div className="contact-sent__fallback">
                <p className="contact-sent__label">Didn&rsquo;t open?</p>
                <button
                    type="button"
                    className="btn btn-secondary contact-sent__copy"
                    data-state={copy}
                    onClick={onCopy}
                >
                    {copy === 'copied' ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
                    {copy === 'copied' ? 'Message copied' : 'Copy your message'}
                </button>
                <p className="contact-sent__hint">
                    and paste it into an email to <span className="contact-sent__addr">{EMAIL}</span>
                </p>
                {copy === 'failed' && (
                    <>
                        <textarea
                            ref={draftRef}
                            className="contact-sent__draft"
                            value={draft}
                            rows={6}
                            readOnly
                            aria-label="Your message"
                        />
                        <p className="contact-sent__manual" aria-hidden="true">
                            {hasKeyboardPointer()
                                ? `Selected. Press ${apple ? '⌘C' : 'Ctrl+C'} to copy it.`
                                : 'Selected. Copy it from the menu.'}
                        </p>
                    </>
                )}
                <p className="sr-only" role="status">
                    {spoken}
                </p>
            </div>

            <div className="contact-sent__actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={onEdit}>
                    <LuPencil aria-hidden="true" />
                    Edit message
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={onStartOver}>
                    <LuRotateCcw aria-hidden="true" />
                    Start over
                </button>
            </div>
        </motion.div>
    );
}

export default function Contact() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    // `attempt` re-keys the alert so an identical summary is read out again.
    const [alert, setAlert] = useState({ attempt: 0, text: '' });
    const [status, setStatus] = useState('idle'); // idle | handed-off
    const fieldRefs = useRef({});
    const sentTitleRef = useRef(null);
    const emailTextRef = useRef(null);
    const focusOnReturn = useRef(null);

    // Move focus with the swap: onto the confirmation, then back to the
    // field the visitor chose to continue from.
    useEffect(() => {
        if (status === 'handed-off') {
            sentTitleRef.current?.focus();
            return;
        }
        const name = focusOnReturn.current;
        focusOnReturn.current = null;
        if (name) fieldRefs.current[name]?.focus();
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
        const invalid = FIELDS.filter(f => found[f.name]);

        if (invalid.length) {
            // Commit aria-invalid and aria-describedby before focus moves, so
            // the field is announced together with its error.
            flushSync(() => {
                setErrors(found);
                setAlert(prev => ({
                    attempt: prev.attempt + 1,
                    text: errorSummary(invalid.map(f => found[f.name])),
                }));
            });
            fieldRefs.current[invalid[0].name]?.focus();
            return;
        }

        setErrors({});
        setAlert(prev => ({ ...prev, text: '' }));
        // No backend: hand the message to the visitor's mail app. Same-tab
        // navigation, because a mailto in a new tab leaves a blank tab behind.
        window.location.href = mailtoHref(formData);
        // The text stays until the visitor starts over, so they can retry or copy it.
        setStatus('handed-off');
    };

    const editMessage = () => {
        focusOnReturn.current = 'message';
        setStatus('idle');
    };

    const startOver = () => {
        setFormData(EMPTY_FORM);
        setErrors({});
        focusOnReturn.current = 'name';
        setStatus('idle');
    };

    const handedOff = status === 'handed-off';

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
                    desc="Have a project in mind? I’d love to hear about it. Let’s create something amazing."
                />

                <div className="contact-grid">
                    {/* ----- Direct line + channels ----- */}
                    <div className="contact-info">
                        <Reveal className="contact-direct">
                            <div className="contact-group">
                                <h3 className="eyebrow contact-group__title">Get in touch</h3>
                                <span className="contact-group__rule" aria-hidden="true" />
                            </div>
                            <div className="contact-email-row">
                                <a className="contact-email" href={`mailto:${EMAIL}`}>
                                    <span className="contact-email__text" ref={emailTextRef}>
                                        {EMAIL_USER}
                                        <wbr />@{EMAIL_DOMAIN}
                                    </span>
                                </a>
                                <CopyEmail textRef={emailTextRef} />
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
                            <Reveal className="contact-group" delay={0.06} blur={false} y={12}>
                                <h3 className="eyebrow contact-group__title">Contact information</h3>
                                <span className="contact-group__rule" aria-hidden="true" />
                                <span className="contact-group__count">
                                    {pad(CONTACT_LINKS.length)}
                                    <span className="sr-only"> channels</span>
                                </span>
                            </Reveal>
                            <ul className="contact-list">
                                {CONTACT_LINKS.map((link, i) => {
                                    const Icon = link.icon;
                                    return (
                                        <Reveal as="li" key={link.label} delay={0.1 + i * 0.06} y={16}>
                                            <a
                                                className="contact-row"
                                                href={link.href}
                                                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                            >
                                                <span className="contact-row__icon" aria-hidden="true">
                                                    <Icon />
                                                </span>
                                                <span className="contact-row__text">
                                                    <span className="contact-row__label">{link.label}</span>
                                                    <span className="contact-row__value">{link.value}</span>
                                                </span>
                                                <span className="contact-row__arrow" aria-hidden="true">
                                                    <LuArrowRight />
                                                </span>
                                                {link.external && <span className="sr-only"> (opens in a new tab)</span>}
                                            </a>
                                        </Reveal>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* ----- Form ----- */}
                    <Reveal className="contact-card card" delay={0.1}>
                        <form
                            className={`contact-form ${handedOff ? 'is-hidden' : ''}`}
                            onSubmit={handleSubmit}
                            inert={handedOff}
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

                            {/* Re-keyed on every failed submit, so the summary is read again. */}
                            <div className="sr-only" role="alert">
                                {alert.text && <p key={alert.attempt}>{alert.text}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg contact-submit">
                                Send message
                                <span className="btn-arrow" aria-hidden="true">
                                    <LuSend />
                                </span>
                            </button>
                            <p className="contact-form__foot">
                                Opens your email app with the message ready to send.
                            </p>
                        </form>

                        <AnimatePresence>
                            {handedOff && (
                                <HandOff
                                    key="contact-handoff"
                                    draft={draftText(formData)}
                                    titleRef={sentTitleRef}
                                    onEdit={editMessage}
                                    onStartOver={startOver}
                                />
                            )}
                        </AnimatePresence>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
