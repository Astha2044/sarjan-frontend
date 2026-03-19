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
    desc: "Install, authenticate, and make your first API call in under 5 minutes.",
    tag: "Beginner",
    topics: ["Quick Start Guide", "Installation", "Your First Request", "Response Format"],
  },
  {
    icon: HiOutlineKey,
    title: "Authentication",
    desc: "Manage API keys, set permissions, and keep your credentials secure.",
    tag: "Beginner",
    topics: ["API Keys", "OAuth 2.0", "Key Rotation", "Rate Limits"],
  },
  {
    icon: HiOutlineCommandLine,
    title: "API Reference",
    desc: "Full reference for every endpoint, parameter, and response object.",
    tag: "Reference",
    topics: ["POST /generate", "GET /status", "POST /agents", "Webhooks"],
  },
  {
    icon: HiOutlineCpuChip,
    title: "Multi-Agent System",
    desc: "Learn how specialized agents collaborate to produce better outputs.",
    tag: "Core",
    topics: ["Agent Architecture", "Agent Types", "Orchestration", "Custom Agents"],
  },
  {
    icon: HiOutlineBeaker,
    title: "Prompt Engineering",
    desc: "Write better prompts to get more accurate, creative, and consistent results.",
    tag: "Guide",
    topics: ["Prompt Structure", "System Prompts", "Few-Shot Examples", "Chain of Thought"],
  },
  {
    icon: HiOutlineChartBar,
    title: "Analytics & Usage",
    desc: "Track your usage, monitor costs, and analyse output quality over time.",
    tag: "Guide",
    topics: ["Usage Dashboard", "Cost Tracking", "Output Quality Metrics", "Exports"],
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Security & Compliance",
    desc: "Data handling, privacy controls, and enterprise compliance information.",
    tag: "Enterprise",
    topics: ["Data Retention", "Encryption", "GDPR Compliance", "Audit Logs"],
  },
  {
    icon: HiOutlineCodeBracket,
    title: "SDKs & Libraries",
    desc: "Native libraries for JavaScript, Python, and more — coming soon.",
    tag: "Developer",
    topics: ["JavaScript SDK", "Python SDK", "REST Client", "Code Examples"],
  },
];

const codeExample = `// Install via npm
npm install @sarjanai/sdk

// Initialize the client
import SarjanAI from '@sarjanai/sdk';

const client = new SarjanAI({
  apiKey: process.env.SARJAN_API_KEY,
});

// Make your first request
const result = await client.generate({
  prompt: "Write a product description for...",
  agents: ["writer", "editor"],
  mode: "polished",
});

console.log(result.output);`;

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