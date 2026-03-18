// pages/careers.js
import { HiOutlineMapPin, HiOutlineBriefcase, HiOutlineClock } from "react-icons/hi2";
import styles from "../styles/CareersPage.module.css";

const values = [
  { title: "Build What Matters", desc: "Work on technology that genuinely changes how people create and think." },
  { title: "Move Fast, Think Deep", desc: "We ship quickly but we don't cut corners on reasoning or quality." },
  { title: "Radical Transparency", desc: "Everyone knows the company goals, the numbers, and the roadmap." },
  { title: "Remote-First Culture", desc: "Work from anywhere. We care about output, not office hours." },
];

const openRoles = [
  {
    title: "Senior AI/ML Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    desc: "Build and scale our multi-agent AI pipeline. Deep experience with LLMs, prompt engineering, and distributed systems required.",
  },
  {
    title: "Full Stack Developer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    desc: "Develop and maintain the Sarjan AI platform. Strong skills in Next.js, Node.js, and modern frontend architecture.",
  },
  {
    title: "Product Designer",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    desc: "Shape the experience of Sarjan AI from end to end. You'll own design from research through to pixel-perfect implementation.",
  },
  {
    title: "Developer Advocate",
    dept: "Growth",
    location: "Remote",
    type: "Full-time",
    desc: "Help developers fall in love with the Sarjan AI API. Write tutorials, build demos, and represent us at events.",
  },
  {
    title: "Content & AI Writer",
    dept: "Marketing",
    location: "Remote",
    type: "Part-time",
    desc: "Create compelling content about AI, creativity, and product updates. Deep curiosity about how AI works is a must.",
  },
];

export default function Careers() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.label}>CAREERS</span>
          <h1>Build the Future of Intelligent Creativity</h1>
          <p>
            We're a small team with big ambitions. If you're excited about AI,
            creativity, and shipping real products — we'd love to meet you.
          </p>
        </header>

        {/* Values */}
        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Why Work at Sarjan AI</h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.cardGlow} />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section className={styles.rolesSection}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          <div className={styles.rolesList}>
            {openRoles.map((role, i) => (
              <div key={i} className={styles.roleCard}>
                <div className={styles.cardGlow} />
                <div className={styles.roleTop}>
                  <div>
                    <h3>{role.title}</h3>
                    <p className={styles.roleDesc}>{role.desc}</p>
                  </div>
                  <a href="/contact" className={styles.applyBtn}>Apply →</a>
                </div>
                <div className={styles.roleMeta}>
                  <span className={styles.metaItem}>
                    <HiOutlineBriefcase size={14} /> {role.dept}
                  </span>
                  <span className={styles.metaItem}>
                    <HiOutlineMapPin size={14} /> {role.location}
                  </span>
                  <span className={styles.metaItem}>
                    <HiOutlineClock size={14} /> {role.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* No role CTA */}
        <div className={styles.openApp}>
          <div className={styles.cardGlow} />
          <h3>Don't see a role that fits?</h3>
          <p>
            We're always open to hearing from exceptional people. Send us your
            story and what you'd love to build.
          </p>
          <a href="/contact" className={styles.openAppBtn}>Send Open Application →</a>
        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>
      </div>
    </main>
  );
}