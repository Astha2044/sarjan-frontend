import React, { useState, useEffect, useRef } from 'react';

const SarjanAIHero = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = () => {
        if (inputValue.trim()) {
            setIsGenerating(true);
            setTimeout(() => {
                setIsGenerating(false);
                alert('AI Response: ' + inputValue);
            }, 1500);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit();
        }
    };

    const handleTagClick = (tagText) => {
        const text = tagText.split(' ').slice(1).join(' ');
        setInputValue(text + ': ');
    };

    return (
        <div style={styles.hero}>
            {/* Background Gradient */}
            <div style={styles.bgGradient} />

            {/* Grid Overlay */}
            <div style={styles.gridOverlay} />

            {/* Parallax Layer */}
            <div
                ref={parallaxRef}
                style={{
                    ...styles.parallaxLayer,
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}
            >
                <div style={{ ...styles.floatingElement, ...styles.element1 }} />
                <div style={{ ...styles.floatingElement, ...styles.element2 }} />
                <div style={{ ...styles.floatingElement, ...styles.element3 }} />
            </div>

            {/* Main Content */}
            <div style={styles.heroContent}>
                <div style={styles.brand}>
                    <h1 style={styles.brandTitle}>
                        <span style={styles.brandSarjan}>SARJAN</span>
                        <span style={styles.brandAi}> Ai</span>
                    </h1>
                    <div style={styles.brandSubtitle}>Creative Intelligence</div>
                </div>

                <p style={styles.headline}>
                    Your <strong style={styles.strong}>creative companion</strong> that transforms ideas into reality.
                    Experience AI that understands context, creativity, and <strong style={styles.strong}>your vision</strong>.
                </p>

                {/* AI Input Container */}
                <div style={styles.aiInputContainer}>
                    <div
                        style={{
                            ...styles.inputWrapper,
                            ...(isFocused ? styles.inputWrapperFocused : {})
                        }}
                    >
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your vision, ask anything, or start a creative journey..."
                            style={styles.textarea}
                            rows={4}
                        />
                        <div style={styles.inputActions}>
                            <div style={styles.inputInfo}>
                                <span style={styles.infoItem}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    AI-Powered
                                </span>
                                <span style={styles.infoItem}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Secure
                                </span>
                            </div>
                            <button
                                onClick={handleSubmit}
                                style={{
                                    ...styles.submitBtn,
                                    ...(isGenerating ? styles.submitBtnGenerating : {})
                                }}
                            >
                                {isGenerating ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Feature Tags */}
                <div style={styles.featureTags}>
                    {['🎨 Creative Generation', '💡 Smart Insights', '⚡ Lightning Fast', '🔒 Private & Secure'].map((tag, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleTagClick(tag)}
                            style={styles.tag}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div style={styles.scrollIndicator}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
        </div>
    );
};

const styles = {
    hero: {
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        paddingTop: '120px',
        overflow: 'hidden',
        background: '#2c3e50',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    },
    bgGradient: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
        zIndex: 0,
    },
    gridOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 1,
    },
    parallaxLayer: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        transition: 'transform 0.3s ease-out',
    },
    floatingElement: {
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.3,
        animation: 'float 20s ease-in-out infinite',
    },
    element1: {
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
        top: '10%',
        left: '10%',
        animationDelay: '0s',
    },
    element2: {
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)',
        bottom: '20%',
        right: '15%',
        animationDelay: '-5s',
    },
    element3: {
        width: '250px',
        height: '250px',
        background: 'linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)',
        top: '50%',
        right: '10%',
        animationDelay: '-10s',
    },
    heroContent: {
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        width: '100%',
        textAlign: 'center',
    },
    brand: {
        display: 'inline-block',
        marginBottom: '2rem',
        opacity: 1,
        animation: 'fadeInUp 1s ease forwards',
    },
    brandTitle: {
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        marginBottom: '0.5rem',
        margin: 0,
    },
    brandSarjan: {
        color: '#fff',
    },
    brandAi: {
        color: '#5eead4',
    },
    brandSubtitle: {
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: '#94a3b8',
        fontWeight: 300,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    headline: {
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        lineHeight: 1.4,
        margin: '3rem auto',
        maxWidth: '900px',
        fontWeight: 300,
        color: '#e2e8f0',
        opacity: 1,
        animation: 'fadeInUp 1s ease 0.3s forwards',
    },
    strong: {
        fontWeight: 600,
        background: 'linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    aiInputContainer: {
        maxWidth: '800px',
        margin: '4rem auto 2rem',
        opacity: 1,
        animation: 'fadeInUp 1s ease 0.6s forwards',
    },
    inputWrapper: {
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '1.5rem',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    inputWrapperFocused: {
        background: 'rgba(255, 255, 255, 0.06)',
        borderColor: '#5eead4',
        boxShadow: '0 20px 80px rgba(94, 234, 212, 0.3), 0 0 0 1px rgba(94, 234, 212, 0.3) inset',
    },
    textarea: {
        width: '100%',
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '1.125rem',
        fontFamily: 'inherit',
        resize: 'none',
        outline: 'none',
        minHeight: '120px',
        lineHeight: 1.6,
    },
    inputActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    inputInfo: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.4)',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    submitBtn: {
        background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
        color: '#1e293b',
        border: 'none',
        padding: '0.875rem 2.5rem',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(94, 234, 212, 0.3)',
    },
    submitBtnGenerating: {
        background: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)',
    },
    featureTags: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        marginTop: '2rem',
        opacity: 1,
        animation: 'fadeInUp 1s ease 0.9s forwards',
    },
    tag: {
        padding: '0.5rem 1.25rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50px',
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.7)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.4)',
        opacity: 1,
        animation: 'fadeInUp 1s ease 1.2s forwards, bounce 2s ease-in-out 2s infinite',
    },
};

export default SarjanAIHero;