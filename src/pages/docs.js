// src/pages/docs.js
import { useState } from "react";
import {
  HiOutlineRocketLaunch,
  HiOutlineKey,
  HiOutlineCommandLine,
  HiOutlineCpuChip,
  HiOutlineBeaker,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineCodeBracket,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import styles from "../styles/DocsPage.module.css";

const sections = [
  {
    icon: HiOutlineRocketLaunch,
    title: "Getting Started",
    desc: "Authenticate and start your first creative reasoning session in seconds.",
    tag: "Beginner",
    topics: ["Authentication Flow", "The Studio Workspace", "Your First Prompt", "Response Types"],
  },
  {
    icon: HiOutlineKey,
    title: "Authentication",
    desc: "Using Google Identity Services and JWT for secure, decentralized access.",
    tag: "Beginner",
    topics: ["Google One Tap", "JWT Sessions", "Token Persistence", "Secure Routes"],
  },
  {
    icon: HiOutlineCpuChip,
    title: "6-Step Reasoning Flow",
    desc: "The core architecture that transforms intent into intelligent output.",
    tag: "Core",
    topics: ["Input Signal", "Context Analysis", "Idea Expansion", "Reasoning Layer", "Refinement Loop", "Final Output"],
  },
  {
    icon: HiOutlineCommandLine,
    title: "API Reference",
    desc: "Direct access to the Sarjan AI reasoning and generation endpoints.",
    tag: "Reference",
    topics: ["POST /api/chat/message", "GET /api/chat/history", "GET /api/auth/verify"],
  },
  {
    icon: HiOutlineBeaker,
    title: "Multi-Agent Collaboration",
    desc: "How specialized agents work together to refine and critique every idea.",
    tag: "Core",
    topics: ["Agent Orchestration", "Critique Loops", "Output Polishing", "Custom Pipelines"],
  },
  {
    icon: HiOutlineChartBar,
    title: "Studio Analytics",
    desc: "Monitor your creative generation cycles and historical conversation trends.",
    tag: "Guide",
    topics: ["History Tracking", "Usage Metadata", "Token Consumption", "Exporting Chats"],
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Security & Privacy",
    desc: "How we protect your creative intent and ensure data integrity.",
    tag: "Enterprise",
    topics: ["JWT Encryption", "Google Auth Security", "Data Persistence", "Audit Trails"],
  },
  {
    icon: HiOutlineCodeBracket,
    title: "Developer Tools",
    desc: "Resources for building on top of the Sarjan AI reasoning engine.",
    tag: "Developer",
    topics: ["Direct API Access", "Webhook Integration", "Prompt Versioning", "Metadata Tags"],
  },
];

const codeExample = `// Direct API Call Example
const response = await fetch('/api/chat/message', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "I want to design a modern landing page.",
    conversationId: "optional_id"
  })
});

const result = await response.json();
console.log(result.data.messages);`;

const tagColors = {
  Beginner:   styles.tagBeginner,
  Reference:  styles.tagReference,
  Core:       styles.tagCore,
  Guide:      styles.tagGuide,
  Enterprise: styles.tagEnterprise,
  Developer:  styles.tagDeveloper,
};

export default function Docs() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.gridBg} />

      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <span className={styles.label}>DOCUMENTATION</span>
          <h1>Build with Sarjan AI</h1>
          <p>
            Everything you need to integrate, extend, and get the most out of
            the Sarjan AI platform.
          </p>
        </header>

        {/* Quick start code block */}
        <div className={styles.codeCard}>
          <div className={styles.cardGlow} />
          <div className={styles.codeHeader}>
            <div className={styles.codeTitle}>
              <HiOutlineRocketLaunch size={16} />
              Quick Start
            </div>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <pre className={styles.codeBlock}>
            <code>{codeExample}</code>
          </pre>
        </div>

        {/* Sections grid */}
        <div className={styles.grid}>
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div key={i} className={styles.card}>
                <div className={styles.cardGlow} />
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon}>
                    <Icon size={22} />
                  </div>
                  <span className={`${styles.tag} ${tagColors[sec.tag] || ""}`}>
                    {sec.tag}
                  </span>
                </div>
                <h3>{sec.title}</h3>
                <p>{sec.desc}</p>
                <ul className={styles.topicList}>
                  {sec.topics.map((t, j) => (
                    <li key={j} className={styles.topicItem}>
                      <HiOutlineArrowRight size={12} className={styles.topicArrow} />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={styles.readMore}>
                  Read docs →
                </a>
              </div>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className={styles.helpCta}>
          <div className={styles.cardGlow} />
          <HiOutlineBookOpen size={28} className={styles.helpIcon} />
          <h3>Can't find what you're looking for?</h3>
          <p>Our team is happy to help. Reach out and we'll get you sorted.</p>
          <a href="/contact" className={styles.helpBtn}>Contact Support →</a>
        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>

      </div>
    </main>
  );
}