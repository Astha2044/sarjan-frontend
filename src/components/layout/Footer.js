// Footer.js
import React, { useState } from "react";
import styles from "../../styles/Footer.module.css";
import { FaTelegramPlane, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  const [hoveredChar, setHoveredChar] = useState(null);
  const year = new Date().getFullYear();

  const mainLinks = [
    "Product",
    "Pricing",
    "About Us",
    "Contact",
  ];

  return (
    <footer className={styles.footer}>
      {/* Backgrounds */}
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
            <div className={styles.logoWrapper}>
              <div className={styles.logoContainer}>

                <div className={styles.logoGlow} />
                <span className={styles.logoText}>SARJAN AI</span>
              </div>
            </div>

            <p className={styles.brandTagline}>
              Where ideas think together. Empowering innovation through
              intelligent collaboration.
            </p>

            {/* <div className={styles.socialLinks}>
              <a href="#" className={styles.socialButton} aria-label="Telegram">
                <div className={styles.socialGradient} />
                <FaTelegramPlane className={styles.socialIcon} />
                <div className={styles.socialGlow} />
              </a>

              <a href="#" className={styles.socialButton} aria-label="Instagram">
                <div className={styles.socialGradient} />
                <FaInstagram className={styles.socialIcon} />
                <div className={styles.socialGlow} />
              </a>

              <a href="#" className={styles.socialButton} aria-label="Twitter">
                <div className={styles.socialGradient} />
                <FaTwitter className={styles.socialIcon} />
                <div className={styles.socialGlow} />
              </a>

              <a href="#" className={styles.socialButton} aria-label="GitHub">
                <div className={styles.socialGradient} />
                <FaGithub className={styles.socialIcon} />
                <div className={styles.socialGlow} />
              </a>

              <a href="#" className={styles.socialButton} aria-label="LinkedIn">
                <div className={styles.socialGradient} />
                <FaLinkedin className={styles.socialIcon} />
                <div className={styles.socialGlow} />
              </a>
            </div> */}
          </div>

          {/* RIGHT — SIMPLE LINKS */}
          <div className={styles.simpleLinks}>
            <h4 className={styles.simpleHeading}>Explore</h4>

            <ul className={styles.simpleList}>
              {mainLinks.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.simpleLink}>
                    {link}
                    <span className={styles.linkUnderline} />
                  </a>
                </li>
              ))}
            </ul>
            {/* 
            <p className={styles.linksNote}>
              A privacy-first AI platform designed for modern teams and
              intelligent workflows.
            </p> */}
          </div>
        </div>

        {/* SIGNATURE */}
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
              <a href="#" className={styles.bottomLink}>
                Privacy Policy
              </a>
              <span className={styles.separator}>•</span>
              <a href="#" className={styles.bottomLink}>
                Terms of Service
              </a>
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
