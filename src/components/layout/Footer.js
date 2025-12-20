// Footer.js
import React, { useState } from 'react';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  const [hoveredChar, setHoveredChar] = useState(null);
  const year = new Date().getFullYear();

  const footerLinks = {
    Product: ['Features', 'Pricing', 'API Docs', 'Integrations'],
    Company: ['About Us', 'Careers', 'Press Kit', 'Partners'],
    Legal: ['Privacy', 'Terms', 'Security', 'Compliance'],
    Resources: ['Blog', 'Guides', 'Support', 'Community']
  };

  return (
    <footer className={styles.footer}>
      {/* Animated Background Grid */}
      <div className={styles.backgroundGrid} />

      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className={styles.orbsContainer}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* Top Border Gradient */}
      <div className={styles.topBorder} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoContainer}>
                <img
                  src="/Sarjan_Logo.png"
                  alt="Sarjan AI"
                  className={styles.logoImage}
                />
                <div className={styles.logoGlow} />
                <span className={styles.logoText}>SARJAN AI</span>
              </div>
            </div>

            <p className={styles.brandTagline}>
              Where ideas think together. Empowering innovation through intelligent collaboration.
            </p>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((social) => (
                <button key={social} className={styles.socialButton}>
                  <div className={styles.socialGradient} />
                  <span className={styles.socialIcon}>{social[0]}</span>
                  <div className={styles.socialGlow} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className={styles.linksGrid}>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className={styles.linkColumn}>
                <h4 className={styles.linkHeading}>{category}</h4>
                <ul className={styles.linkList}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className={styles.link}>
                        <span className={styles.linkText}>{link}</span>
                        <span className={styles.linkUnderline} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterText}>
              Get the latest AI insights delivered to your inbox
            </p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="your@email.com"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>Subscribe</button>
            </div>
          </div>
        </div> */}

        {/* Signature SARJAN */}
        <div className={styles.signatureSection}>
          <div className={styles.signatureText}>
            {['S', 'A', 'R', 'J', 'A', 'N'].map((char, i) => (
              <span
                key={i}
                className={`${styles.signatureChar} ${hoveredChar === i ? styles.signatureCharHovered : ''}`}
                onMouseEnter={() => setHoveredChar(i)}
                onMouseLeave={() => setHoveredChar(null)}
              >
                {char}
                <span className={styles.signatureCharGlow} />
              </span>
            ))}
          </div>

          {/* <div className={styles.signatureLinks}>
            {['About', 'Work', 'Careers', 'Contact', 'Privacy'].map((link) => (
              <a key={link} href="#" className={styles.signatureLink}>
                {link}
                <span className={styles.signatureLinkUnderline} />
              </a>
            ))}
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© {year} Sarjan AI. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <a href="#" className={styles.bottomLink}>Privacy Policy</a>
              <span className={styles.separator}>•</span>
              <a href="#" className={styles.bottomLink}>Terms of Service</a>
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