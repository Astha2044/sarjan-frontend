// pages/pricing.js
import { HiOutlineCheckCircle } from "react-icons/hi2";
import styles from "../styles/PricingPage.module.css";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for individuals exploring AI-powered creativity.",
    features: [
      "50 AI generations per month",
      "Single-agent mode",
      "Standard output quality",
      "Community support",
      "API access (limited)",
    ],
    cta: "Get Started Free",
    href: "/",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    desc: "For creators and professionals who need more power.",
    features: [
      "Unlimited AI generations",
      "Multi-agent collaboration",
      "Polished, production-ready outputs",
      "Priority support",
      "Full API access",
      "Real-time analytics",
      "Custom templates",
    ],
    cta: "Start Pro Trial",
    href: "/",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams and organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Dedicated AI infrastructure",
      "Custom model fine-tuning",
      "SSO & team management",
      "SLA guarantee",
      "Dedicated account manager",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>PRICING</span>
          <h1>Simple, Transparent Pricing</h1>
          <p>
            Start free, scale as you grow. No hidden fees, no surprises — just
            powerful AI at every level.
          </p>
        </header>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${styles.card} ${plan.highlight ? styles.cardHighlight : ""}`}
            >
              <div className={styles.cardGlow} />
              {plan.highlight && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <p className={styles.planDesc}>{plan.desc}</p>
              <ul className={styles.featureList}>
                {plan.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}>
                    <HiOutlineCheckCircle size={18} className={styles.check} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`${styles.cta} ${plan.highlight ? styles.ctaHighlight : ""}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          All plans include a 14-day free trial. No credit card required.
        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>
      </div>
    </main>
  );
}