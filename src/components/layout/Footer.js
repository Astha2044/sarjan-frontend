// Footer.js
import React, { useState } from "react";
import styles from "../../styles/Footer.module.css";
import Link from "next/link";
import {
  FaTelegramPlane,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const [hoveredChar, setHoveredChar] = useState(null);
  const year = new Date().getFullYear();


  const productLinks = [
    { label: "Features", href: "/features", badge: null },
    { label: "Pricing", href: "/pricing", badge: null },
    // { label: "Changelog", href: "/changelog", badge: "NEW" },
    { label: "Roadmap", href: "/roadmap", badge: null },
    { label: "Docs", href: "/docs", badge: null },
  ];


  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  // ─────────────────────────────────────────────────────────
  // SOCIAL LINKS
  // → Replace the href values with your actual profile URLs
  // ─────────────────────────────────────────────────────────
  const socialLinks = [
    { label: "Telegram", href: "https://t.me/yourhandle", icon: FaTelegramPlane, cls: styles.telegram },
    { label: "Twitter", href: "https://twitter.com/yourhandle", icon: FaTwitter, cls: styles.twitter },
    { label: "Instagram", href: "https://instagram.com/yourhandle", icon: FaInstagram, cls: styles.instagram },
    { label: "GitHub", href: "https://github.com/yourhandle", icon: FaGithub, cls: styles.github },
    { label: "LinkedIn", href: "https://linkedin.com/company/yourhandle", icon: FaLinkedin, cls: styles.linkedin },
  ];

  return (
    <footer className={styles.footer}>

      {/* Backgrounds — UNCHANGED */}
      <div className={styles.backgroundGrid} />
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.orbsContainer}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>
      <div className={styles.topBorder} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>

          {/* LEFT — BRAND */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoWrapper}>
              <div className={styles.logoContainer}>
                <div className={styles.logoGlow} />
                <span className={styles.logoText}>SARJAN AI</span>
              </div>
            </Link>

            <p className={styles.brandTagline}>
              Where ideas think together. Empowering innovation through
              intelligent collaboration.
            </p>

            {/* SOCIAL ICONS — opens each in a new tab */}
            <div className={styles.socialLinks}>
              {socialLinks.map(({ label, href, icon: Icon, cls }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialButton} ${cls}`}
                  aria-label={label}
                >
                  <div className={styles.socialGradient} />
                  <Icon className={styles.socialIcon} />
                  <div className={styles.socialGlow} />
                </a>
              ))}
            </div>
          </div>

          {/* MIDDLE — PRODUCT LINKS */}
          <div className={styles.linkColumn}>
            <h4 className={styles.linkHeading}>Product</h4>
            <ul className={styles.linkList}>
              {productLinks.map(({ label, href, badge }) => (
                <li key={label}>
                  <Link href={href} className={styles.link}>
                    {label}
                    {badge && (
                      <span className={styles.linkBadge}>{badge}</span>
                    )}
                    <span className={styles.linkUnderline} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — COMPANY LINKS */}
          <div className={styles.linkColumn}>
            <h4 className={styles.linkHeading}>Company</h4>
            <ul className={styles.linkList}>
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={styles.link}>
                    {label}
                    <span className={styles.linkUnderline} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* SIGNATURE — UNCHANGED */}
        <div className={styles.signatureSection}>
          <div className={styles.signatureText}>
            {["S", "A", "R", "J", "A", "N"].map((char, i) => (
              <span
                key={i}
                className={`${styles.signatureChar} ${hoveredChar === i ? styles.signatureCharHovered : ""
                  }`}
                onMouseEnter={() => setHoveredChar(i)}
                onMouseLeave={() => setHoveredChar(null)}
              >
                {char}
                <span className={styles.signatureCharGlow} />
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>

            <p className={styles.copyright}>
              © {year} Sarjan AI. All rights reserved.
            </p>

            <div className={styles.bottomLinks}>
              {/* ✅ Clickable → create pages/privacy.js to activate */}
              <Link href="/privacy" className={styles.bottomLink}>
                Privacy Policy
              </Link>
              <span className={styles.separator}>•</span>
              {/* ✅ Clickable → create pages/terms.js to activate */}
              <Link href="/terms" className={styles.bottomLink}>
                Terms of Service
              </Link>
            </div>

            <p className={styles.madeWith}>
              Made with <span className={styles.heart}>♥</span> by Sarjan AI Team
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;