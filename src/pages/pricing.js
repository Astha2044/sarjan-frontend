// src/pages/pricing.js
import styles from "../styles/PricingPage.module.css";

export default function Pricing() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <span className={styles.label}>PRICING</span>
          <h1>Choose Your Plan</h1>
          <p>Select the best setup for your needs. Start free, upgrade anytime.</p>
        </header>

        {/* 2 Plan Cards — exactly from your PricingModal */}
        <div className={styles.cardsRow}>

          {/* FREE CARD */}
          <div className={styles.card}>
            <div className={styles.cardGlow} />
            <div className={styles.planName}>Free</div>
            <div className={styles.price}>
              ₹0 <span>/month</span>
            </div>
            <ul className={styles.features}>
              <li><span className={styles.check}>✓</span> 10 messages per day</li>
              <li><span className={styles.check}>✓</span> Text responses</li>
              <li><span className={styles.cross}>✗</span> Image generation</li>
              <li><span className={styles.cross}>✗</span> Priority responses</li>
            </ul>
            <a href="/" className={styles.btnFree}>
              Get Started Free
            </a>
          </div>

          {/* PRO CARD */}
          <div className={`${styles.card} ${styles.proCard}`}>
            <div className={styles.cardGlow} />
            <div className={styles.badge}>RECOMMENDED</div>
            <div className={styles.planName}>Pro</div>
            <div className={styles.price}>
              Free <span>for now</span>
            </div>
            <ul className={styles.features}>
              <li><span className={styles.check}>✓</span> Unlimited messages</li>
              <li><span className={styles.check}>✓</span> Text responses</li>
              <li><span className={styles.check}>✓</span> Image generation</li>
              <li><span className={styles.check}>✓</span> Priority responses</li>
            </ul>
            <a href="/" className={styles.btnPro}>
              Upgrade to Pro
            </a>
          </div>

        </div>

        {/* Note */}
        <p className={styles.note}>
          No credit card required. Upgrade or cancel anytime.
        </p>

        {/* Back */}
        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>

      </div>
    </main>
  );
}