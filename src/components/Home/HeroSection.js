/* HeroSection.js */
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css';

const HeroSection = () => {
    const [inputValue, setInputValue] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const canvasRef = useRef(null);
    const heroRef = useRef(null);

    // Smooth mouse tracking with interpolation
    const targetPosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            targetPosition.current = { x: e.clientX, y: e.clientY };
        };

        const smoothCursor = () => {
            currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.15;
            currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.15;

            setMousePosition({
                x: currentPosition.current.x,
                y: currentPosition.current.y
            });

            requestAnimationFrame(smoothCursor);
        };

        window.addEventListener('mousemove', handleMouseMove);
        smoothCursor();

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animated waves background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Handle resizing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Initial set
        handleResize();

        let animationFrameId;
        let time = 0;

        const waves = [
            { amplitude: 30, frequency: 0.02, speed: 0.015, offset: 0, color: 'rgba(94, 234, 212, 0.08)' },
            { amplitude: 40, frequency: 0.015, speed: 0.012, offset: 100, color: 'rgba(168, 85, 247, 0.06)' },
            { amplitude: 25, frequency: 0.025, speed: 0.018, offset: 200, color: 'rgba(59, 130, 246, 0.04)' }
        ];

        const drawWave = (wave, mouseInfluence) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            for (let x = 0; x < canvas.width; x += 5) {
                const distanceToMouse = Math.abs(mousePosition.x - x);
                const mouseEffect = Math.max(0, 1 - distanceToMouse / 400) * mouseInfluence;

                const y =
                    canvas.height / 2 +
                    wave.offset +
                    Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                    mouseEffect * 30;

                ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();

            ctx.fillStyle = wave.color;
            ctx.fill();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1;

            waves.forEach((wave, index) => {
                drawWave(wave, index * 0.2);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [mousePosition]); // Add dependency to ensure mouse interaction works

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        console.log('Sending:', inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <section ref={heroRef} className={styles.hero}>
            {/* Custom Cursor */}
            <div
                className={`${styles.customCursor} ${cursorVariant === 'hover' ? styles.hover : ''} ${cursorVariant === 'text' ? styles.text : ''}`}
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`
                }}
            />
            <div
                className={styles.cursorGlow}
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    opacity: cursorVariant === 'hover' ? 1 : 0.6
                }}
            />

            {/* Animated Wave Background */}
            <canvas ref={canvasRef} className={styles.waveCanvas} />

            {/* Gradient Background */}
            <div className={styles.gradientBg}>
                <div className={`${styles.gradientOrb} ${styles.gradientOrb1}`} />
                <div className={`${styles.gradientOrb} ${styles.gradientOrb2}`} />
                <div className={`${styles.gradientOrb} ${styles.gradientOrb3}`} />
            </div>

            {/* Main Content */}
            <div className={styles.container}>
                {/* Hero Text */}
                <div className={styles.heroContent}>
                    <h1 className={styles.mainHeading}>
                        <span className={styles.headingLine}>Welcome to</span>
                        <span className={styles.brandName}>
                            <span className={styles.sarjan}>SARJAN</span>
                            <span className={styles.ai}>AI</span>
                        </span>
                    </h1>
                    <p className={styles.subtitle}>
                        Your creative intelligence partner. Transform ideas into reality with the power of AI.
                    </p>
                </div>

                {/* Minimal Chat Input */}
                <div
                    className={`${styles.chatInput} ${isInputFocused ? styles.chatInputFocused : ''}`}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            placeholder="Ask me anything..."
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('hover')}
                        />

                        <button
                            className={`${styles.sendButton} ${inputValue.trim() ? styles.sendButtonActive : ''}`}
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <div className={styles.inputHint}>
                        Press <span className={styles.kbd}>Enter</span> to send • <span className={styles.kbd}>Shift + Enter</span> for new line
                    </div>
                </div>

                {/* Features */}
                <div className={styles.features}>
                    <div
                        className={styles.feature}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <span className={styles.featureIcon}>⚡</span>
                        <span>Lightning Fast</span>
                    </div>
                    <div
                        className={styles.feature}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <span className={styles.featureIcon}>🎯</span>
                        <span>Context Aware</span>
                    </div>
                    <div
                        className={styles.feature}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <span className={styles.featureIcon}>🔒</span>
                        <span>Secure & Private</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;