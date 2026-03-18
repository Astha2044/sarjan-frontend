// pages/features.js
import {
  HiOutlineCpuChip,
  HiOutlineBeaker,
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlineCommandLine,
  HiOutlineChartBar,
  HiOutlineCube,
} from "react-icons/hi2";
import styles from "../styles/FeaturesPage.module.css";

const features = [
  {
    icon: HiOutlineCpuChip,
    title: "Multi-Agent Intelligence",
    desc: "Specialized AI agents collaborate like a creative team — not a single model doing everything alone.",
    tag: "Core",
  },
  {
    icon: HiOutlineBeaker,
    title: "Reasoned Creativity",
    desc: "Every idea is generated, evaluated, and refined with logical reasoning built into the pipeline.",
    tag: "Core",
  },
  {
    icon: HiOutlineBolt,
    title: "Lightning Fast Output",
    desc: "Complex creative workflows completed in seconds, not hours. Speed without sacrificing quality.",
    tag: "Performance",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Enterprise-Grade Reliability",
    desc: "Designed for accuracy, consistency, and production-level use from day one.",
    tag: "Security",
  },
  {
    icon: HiOutlineSparkles,
    title: "Polished Final Results",
    desc: "Outputs are clear, usable, and presentation-ready by default — no extra editing needed.",
    tag: "Quality",
  },
  {
    icon: HiOutlineArrowPath,
    title: "Adaptive Learning Engine",
    desc: "Continuously improves responses by understanding context, feedback, and intent over time.",
    tag: "AI",
  },
  {
    icon: HiOutlineCommandLine,
    title: "Developer-First API",
    desc: "Clean REST API with comprehensive documentation. Integrate Sarjan AI into any workflow.",
    tag: "Developer",
  },
  {
    icon: HiOutlineChartBar,
    title: "Real-Time Analytics",
    desc: "Track usage, performance, and output quality with a built-in analytics dashboard.",
    tag: "Insights",
  },
  {
    icon: HiOutlineCube,
    title: "Modular Architecture",
    desc: "Pick and combine only the capabilities you need. Build your own AI workflow, your way.",
    tag: "Flexible",
  },
];

export default function Features() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid_bg} />

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>CAPABILITIES</span>
          <h1>Everything You Need to Build with AI</h1>
          <p>
            Sarjan AI brings together speed, intelligence, and reliability in
            one platform — built for creators, developers, and enterprises.
          </p>
        </header>

        <div className={styles.grid}>
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={styles.card}>
                <div className={styles.cardGlow} />
                <div className={styles.cardTop}>
                  <div className={styles.icon}>
                    <Icon size={24} />
                  </div>
                  <span className={styles.tag}>{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <h2>Ready to get started?</h2>
          <p>Join thousands of teams already building with Sarjan AI.</p>
          <div className={styles.ctaButtons}>
            <a href="/pricing" className={styles.btnPrimary}>View Pricing →</a>
            <a href="/contact" className={styles.btnSecondary}>Talk to Sales</a>
          </div>
        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>
      </div>
    </main>
  );
}