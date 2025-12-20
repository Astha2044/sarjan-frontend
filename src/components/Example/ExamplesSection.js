"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/Examples.module.css";

const demoMessages = [
    { role: "user", text: "I want to design a modern landing page for my startup." },
    { role: "ai", typing: true },
    {
        role: "ai",
        text:
            "Great! I’ll help you create a clean, modern landing page with strong visuals, smooth animations, and a conversion-focused layout.",
    },
    { role: "user", text: "Can you suggest a color theme?" },
    { role: "ai", typing: true },
    {
        role: "ai",
        text:
            "I recommend a dark tech theme with soft gradients, glassmorphism, and accent colors like teal or violet for a premium feel.",
    },
];

export default function ChatbotDemo() {
    const [messages, setMessages] = useState([]);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step >= demoMessages.length) return;

        const timeout = setTimeout(() => {
            setMessages((prev) => [...prev, demoMessages[step]]);
            setStep((prev) => prev + 1);
        }, demoMessages[step].typing ? 1200 : 900);

        return () => clearTimeout(timeout);
    }, [step]);

    return (
        <section className={styles.demoSection}>
            <div className={styles.container}>
                {/* Left Explanation */}
                <div className={styles.info}>
                    <span className={styles.badge}>Chatbot Flow</span>
                    <h2>
                        How our <span>AI Chat</span> works
                    </h2>
                    <p>
                        This is a simple demonstration of how users interact with our AI.
                        Messages are processed, analyzed, and answered intelligently in
                        real-time.
                    </p>

                    <ul className={styles.steps}>
                        <li>User sends a message</li>
                        <li>AI analyzes intent & context</li>
                        <li>Smart response is generated</li>
                    </ul>
                </div>

                {/* Chat UI */}
                <div className={styles.chatWrapper}>
                    <div className={styles.chatHeader}>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <p>AI Studio – Demo</p>
                    </div>

                    <div className={styles.chatBody}>
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`${styles.message} ${msg.role === "user" ? styles.user : styles.ai
                                    }`}
                            >
                                {msg.typing ? (
                                    <span className={styles.typing}>
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.chatInput}>
                        <input disabled placeholder="User types here..." />
                        <button disabled>Send</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
