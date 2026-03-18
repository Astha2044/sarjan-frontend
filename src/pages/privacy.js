// pages/privacy.js
import styles from "../styles/LegalPage.module.css";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, and usage data generated while interacting with Sarjan AI.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to operate, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.",
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist us in operating our platform, subject to confidentiality agreements.",
  },
  {
    title: "Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date at the top of this document.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at privacy@sarjanai.com. We are committed to resolving any complaints about your privacy and our collection or use of your personal information.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className={styles.wrapper}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.label}>LEGAL</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: January 1, 2025</p>
          <p className={styles.intro}>
            At Sarjan AI, your privacy is our priority. This policy explains
            how we collect, use, and protect your personal information.
          </p>
        </header>

        {/* Sections */}
        <div className={styles.sections}>
          {sections.map((sec, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardGlow} />
              <div className={styles.cardNumber}>0{i + 1}</div>
              <h2>{sec.title}</h2>
              <p>{sec.content}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}