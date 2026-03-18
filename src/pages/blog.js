// pages/blog.js
import styles from "../styles/BlogPage.module.css";

const posts = [
  {
    tag: "Product",
    date: "March 10, 2025",
    title: "Introducing Multi-Agent Collaboration in Sarjan AI",
    excerpt:
      "We're excited to announce a major upgrade to how Sarjan AI thinks. Instead of a single model handling everything, specialized agents now collaborate to produce better, faster, and more creative results.",
    readTime: "5 min read",
  },
  {
    tag: "AI Insights",
    date: "February 28, 2025",
    title: "Why Reasoned Creativity Is the Future of AI",
    excerpt:
      "Pure generation without evaluation leads to mediocre outputs. We explore why combining reasoning with creativity produces results that are actually useful in the real world.",
    readTime: "7 min read",
  },
  {
    tag: "Tutorial",
    date: "February 14, 2025",
    title: "Getting Started with the Sarjan AI API",
    excerpt:
      "A step-by-step guide to integrating Sarjan AI into your product. From authentication to your first multi-agent call — everything you need to get up and running in under 30 minutes.",
    readTime: "10 min read",
  },
  {
    tag: "Company",
    date: "January 30, 2025",
    title: "Our Mission: Making Serious Creativity Accessible",
    excerpt:
      "We started Sarjan AI because we believed intelligent creativity shouldn't require a team of engineers. Here's the story behind the platform and where we're headed.",
    readTime: "4 min read",
  },
  {
    tag: "AI Insights",
    date: "January 15, 2025",
    title: "The Problem with Single-Model AI Workflows",
    excerpt:
      "Most AI tools rely on one model doing everything. We break down why this approach has fundamental limitations — and how multi-agent systems solve them.",
    readTime: "6 min read",
  },
  {
    tag: "Product",
    date: "January 5, 2025",
    title: "Sarjan AI 1.0 — What We Built and Why",
    excerpt:
      "A deep dive into the architecture, decisions, and tradeoffs that shaped the first version of Sarjan AI. From prompt design to agent orchestration.",
    readTime: "8 min read",
  },
];

const tagColors = {
  Product: styles.tagProduct,
  "AI Insights": styles.tagAI,
  Tutorial: styles.tagTutorial,
  Company: styles.tagCompany,
};

export default function Blog() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>BLOG</span>
          <h1>Thoughts, Insights & Updates</h1>
          <p>
            Product updates, AI research, tutorials, and stories from the
            Sarjan AI team.
          </p>
        </header>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.cardGlow} />
              <div className={styles.cardTop}>
                <span className={`${styles.tag} ${tagColors[post.tag] || ""}`}>
                  {post.tag}
                </span>
                <span className={styles.date}>{post.date}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className={styles.cardFooter}>
                <span className={styles.readTime}>{post.readTime}</span>
                <a href="#" className={styles.readMore}>
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>
      </div>
    </main>
  );
}