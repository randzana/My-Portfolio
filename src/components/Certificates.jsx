import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import './Certificates.css';

const certificates = [
    {
        title: 'Getting Started with Cisco Packet Tracer',
        issuer: 'Cisco Networking Academy',
        date: '01 March, 2026',
        image: '/certificates/cisco-packet-tracer.png',
        color: '#049fd9',
        category: 'networking',
    },
    {
        title: 'Web Development',
        issuer: 'Sololearn',
        date: '02 January, 2026',
        image: '/certificates/sololearn-web-dev.png',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'Generative AI in Practice',
        issuer: 'Sololearn',
        date: '29 December, 2024',
        image: '/certificates/sololearn-gen-ai.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Write with AI',
        issuer: 'Sololearn',
        date: '29 December, 2024',
        image: '/certificates/sololearn-write-ai.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Brainstorm with AI',
        issuer: 'Sololearn',
        date: '31 December, 2024',
        image: '/certificates/sololearn-brainstorm.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'AI-Powered A/B Testing',
        issuer: 'Sololearn',
        date: '30 December, 2024',
        image: '/certificates/sololearn-ab-testing.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Think Creatively with AI',
        issuer: 'Sololearn',
        date: '23 December, 2024',
        image: '/certificates/sololearn-think-creatively.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'AI in Data Analysis',
        issuer: 'Sololearn',
        date: '23 December, 2024',
        image: '/certificates/sololearn-ai-data-analysis.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Prompt Engineering',
        issuer: 'Sololearn',
        date: '22 December, 2024',
        image: '/certificates/sololearn-prompt-eng.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Introduction to LLMs',
        issuer: 'Sololearn',
        date: '22 December, 2024',
        image: '/certificates/sololearn-intro-llms.png',
        color: '#e8573a',
        category: 'ai',
    },
    {
        title: 'Social Media Marketing with AI',
        issuer: 'Sololearn',
        date: '22 December, 2024',
        image: '/certificates/sololearn-social-media-marketing.png',
        color: '#e8573a',
        category: 'networking',
    },
    {
        title: 'Java Intermediate',
        issuer: 'Sololearn',
        date: '25 October, 2024',
        image: '/certificates/sololearn-java-intermediate.png',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'SQL Intermediate',
        issuer: 'Sololearn',
        date: '11 September, 2024',
        image: '/certificates/sololearn-sql.png',
        color: '#e8573a',
        category: 'database',
    },
    {
        title: 'Introduction to SQL',
        issuer: 'Sololearn',
        date: '30 August, 2024',
        image: '/certificates/sololearn-intro-sql.png',
        color: '#e8573a',
        category: 'database',
    },
    {
        title: 'Introduction to C#',
        issuer: 'Sololearn',
        date: 'August 2024',
        image: '/certificates/sololearn-csharp.png',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'Intro to Machine Learning',
        issuer: 'Kaggle',
        date: 'April 2024',
        image: '/certificates/kaggle-ml.png',
        color: '#20beff',
        category: 'ai',
    },
    {
        title: 'Tech for Everyone',
        issuer: 'Sololearn',
        date: '30 March, 2024',
        image: '/certificates/sololearn-tech.png',
        color: '#e8573a',
        category: 'networking',
    },
    {
        title: 'Introduction to Java',
        issuer: 'Sololearn',
        date: 'March 2024',
        image: '/certificates/sololearn-java.png',
        color: '#e8573a',
        category: 'coding',
    },
    {
        title: 'Intro to Programming',
        issuer: 'Kaggle',
        date: 'February 2024',
        image: '/certificates/kaggle-programming.png',
        color: '#20beff',
        category: 'coding',
    },
];

const categories = [
    { id: 'all', label: 'All Achievements' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'coding', label: 'Software Eng.' },
    { id: 'database', label: 'Databases & SQL' },
    { id: 'networking', label: 'Net & Marketing' }
];

export default function Certificates() {
    const [selected, setSelected] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter and search certificates
    const filteredCerts = useMemo(() => {
        return certificates.filter(cert => {
            const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
            const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Find current index inside lightbox
    const selectedIndex = useMemo(() => {
        if (!selected) return -1;
        return filteredCerts.findIndex(c => c.title === selected.title);
    }, [selected, filteredCerts]);

    // Lightbox Controls
    const handleNext = () => {
        if (filteredCerts.length === 0) return;
        const nextIndex = (selectedIndex + 1) % filteredCerts.length;
        setSelected(filteredCerts[nextIndex]);
    };

    const handlePrev = () => {
        if (filteredCerts.length === 0) return;
        const prevIndex = (selectedIndex - 1 + filteredCerts.length) % filteredCerts.length;
        setSelected(filteredCerts[prevIndex]);
    };

    // Keyboard support for Lightbox
    useEffect(() => {
        if (!selected) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'Escape') {
                setSelected(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selected, selectedIndex, filteredCerts]);

    return (
        <section id="certificates">
            <div className="gradient-orb gradient-orb-3" />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 15, transformPerspective: 1000 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="section-tag">Achievements</div>
                    <h2 className="section-title">Certificates & Courses</h2>
                    <p className="section-desc">
                        Continuous learning through industry-recognized platforms and certifications.
                    </p>
                </motion.div>

                {/* Filter and Search Bar Controls */}
                <div className="certificates-controls">
                    <div className="filter-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.label}
                                {selectedCategory === cat.id && (
                                    <motion.span 
                                        className="tab-pill-indicator" 
                                        layoutId="activeCertTab"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search certificates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </div>

                {/* Certificates Grid */}
                <motion.div 
                    className="certificates-grid"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCerts.map((cert, i) => (
                            <motion.div
                                key={cert.title}
                                className="cert-card"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                onClick={() => setSelected(cert)}
                            >
                                <div className="cert-preview">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/600x450/111122/a78bfa?text=Certificate+Image+Pending';
                                        }}
                                    />
                                    <div className="cert-overlay" />
                                    <div className="cert-badge" style={{ color: cert.color, borderColor: `${cert.color}40`, background: `${cert.color}15` }}>
                                        {cert.issuer}
                                    </div>
                                </div>
                                <div className="cert-info">
                                    <h3>{cert.title}</h3>
                                    <p>
                                        <FaCalendarAlt /> {cert.date}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredCerts.length === 0 && (
                    <motion.div 
                        className="certs-empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p>No certificates found matching your criteria.</p>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selected && (
                    <div className="lightbox-backdrop" onClick={() => setSelected(null)}>
                        {/* Slide Left Arrow */}
                        {filteredCerts.length > 1 && (
                            <button 
                                className="lightbox-nav-btn prev-btn" 
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                aria-label="Previous certificate"
                            >
                                <FaChevronLeft />
                            </button>
                        )}

                        <motion.div
                            className="lightbox-content"
                            initial={{ opacity: 0, scale: 0.93, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.93, y: 15 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lightbox-close" onClick={() => setSelected(null)}>
                                <FaTimes />
                            </button>
                            <div className="lightbox-img-wrapper">
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    className="lightbox-img"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/800x600/111122/a78bfa?text=Certificate+Image+Pending';
                                    }}
                                />
                            </div>
                            <div className="lightbox-info">
                                <h3>{selected.title}</h3>
                                <p>{selected.issuer} · {selected.date}</p>
                                {filteredCerts.length > 1 && (
                                    <span className="lightbox-counter">
                                        {selectedIndex + 1} of {filteredCerts.length}
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Slide Right Arrow */}
                        {filteredCerts.length > 1 && (
                            <button 
                                className="lightbox-nav-btn next-btn" 
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                aria-label="Next certificate"
                            >
                                <FaChevronRight />
                            </button>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
