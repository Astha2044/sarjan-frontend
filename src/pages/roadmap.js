// src/pages/roadmap.js
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineRocketLaunch, HiOutlineSparkles, HiOutlineCpuChip, HiOutlineGlobeAlt, HiOutlineCommandLine, HiOutlineShieldCheck } from "react-icons/hi2";
import styles from "../styles/RoadmapPage.module.css";

const quarters = [
  {
    quarter: "Q1 2025",
    status: "completed",
    label: "Completed",
    items: [
      { icon: HiOutlineCheckCircle, title: "Multi-Agent Core Engine", desc: "Built the foundational multi-agent collaboration system powering the Sarjan reasoning pipeline." },
      { icon: HiOutlineCheckCircle, title: "Google Identity Integration", desc: "Secure authentication using Google One Tap and Identity Services for a seamless login experience." },
      { icon: HiOutlineCheckCircle, title: "Custom Styled UI", desc: "A premium, dark-mode interface with glassmorphism and perfectly centered, branded components." },
    ],
  },
  {
    quarter: "Q2 2025",
    status: "completed",
    label: "Completed",
    items: [
      { icon: HiOutlineCheckCircle, title: "6-Step Reasoning Flow", desc: "Implemented the 'How Sarjan Thinks' pipeline: Context Analysis, Idea Expansion, and Refinement." },
      { icon: HiOutlineCheckCircle, title: "Real-Time Message Persistence", desc: "Messages saved in the Studio automatically, allowing users to pick up exactly where they left off." },
      { icon: HiOutlineCheckCircle, title: "Studio Dashboard", desc: "A clean, functional workspace for managing multiple AI conversations and generation history." },
    ],
  },
  {
    quarter: "Q3 2025",
    status: "in-progress",
    label: "In Progress",
    items: [
      { icon: HiOutlineClock, title: "Advanced Model Fine-Tuning", desc: "Allow users to fine-tune the Sarjan reasoning engine on their specific creative data." },
      { icon: HiOutlineClock, title: "Collaborative Workspaces", desc: "Shared folders and real-time multiplayer editing for AI-generated projects." },
      { icon: HiOutlineClock, title: "Refined Output Pipeline", desc: "Deeper analysis layers to ensure zero-hallucination and high-precision results." },
    ],
  },
  {
    quarter: "Q4 2025",
    status: "upcoming",
    label: "Upcoming",
    items: [
      { icon: HiOutlineRocketLaunch, title: "Plugin Marketplace", desc: "Third-party integrations and plugins to extend Sarjan AI's capabilities for specific industries." },
      { icon: HiOutlineGlobeAlt, title: "Multilingual Support", desc: "Generate high-quality outputs in 20+ languages with native fluency and cultural context." },
      { icon: HiOutlineCpuChip, title: "Autonomous Agent Mode", desc: "Let agents run entire workflows autonomously — research, draft, evaluate, and deliver on their own." },
    ],
  },
  {
    quarter: "2026 & Beyond",
    status: "future",
    label: "Future",
    items: [
      { icon: HiOutlineSparkles, title: "On-Premise Deployment", desc: "Run Sarjan AI entirely within your own infrastructure for maximum privacy and control." },
      { icon: HiOutlineCommandLine, title: "Developer SDK", desc: "Native SDKs for Python, JavaScript, and Go — making integration feel like a first-class experience." },
      { icon: HiOutlineShieldCheck, title: "SOC 2 Type II Certification", desc: "Full security certification for enterprise-grade compliance requirements." },
    ],
  },
];

const statusConfig = {
  completed:   { color: styles.statusCompleted,  dot: styles.dotCompleted  },
  "in-progress": { color: styles.statusProgress, dot: styles.dotProgress   },
  upcoming:    { color: styles.statusUpcoming,   dot: styles.dotUpcoming   },
  future:      { color: styles.statusFuture,     dot: styles.dotFuture     },
};

export default function Roadmap() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.gridBg} />

      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <span className={styles.label}>ROADMAP</span>
          <h1>What We're Building Next</h1>
          <p>
            A transparent look at what we've shipped, what's in progress, and
            where Sarjan AI is headed. Updated every quarter.
          </p>
        </header>

        {/* Legend */}
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotCompleted}`} /> Completed</span>
          <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotProgress}`} /> In Progress</span>
          <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotUpcoming}`} /> Upcoming</span>
          <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotFuture}`} /> Future</span>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {quarters.map((q, qi) => {
            const cfg = statusConfig[q.status];
            return (
              <div key={qi} className={styles.timelineBlock}>

                {/* Quarter header */}
                <div className={styles.quarterRow}>
                  <span className={`${styles.dot} ${cfg.dot}`} />
                  <h2 className={styles.quarterTitle}>{q.quarter}</h2>
                  <span className={`${styles.statusBadge} ${cfg.color}`}>{q.label}</span>
                </div>

                {/* Cards */}
                <div className={styles.cardsRow}>
                  {q.items.map((item, ii) => {
                    const Icon = item.icon;
                    return (
                      <div key={ii} className={`${styles.card} ${q.status === "completed" ? styles.cardCompleted : ""}`}>
                        <div className={styles.cardGlow} />
                        <div className={styles.cardIcon}>
                          <Icon size={22} />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <div className={styles.cardGlow} />
          <h3>Have a feature request?</h3>
          <p>We build based on what our users need. Tell us what you'd love to see in Sarjan AI.</p>
          <a href="/contact" className={styles.ctaBtn}>Request a Feature →</a>
        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>

      </div>
    </main>
  );
}