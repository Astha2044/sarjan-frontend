import React from "react";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Background */}
      <div className={styles["footer-glass-background"]}>
        <div className={`${styles["footer-liquid-blob"]} ${styles["footer-liquid-blob-1"]}`} />
        <div className={`${styles["footer-liquid-blob"]} ${styles["footer-liquid-blob-2"]}`} />
        <div className={`${styles["footer-liquid-blob"]} ${styles["footer-liquid-blob-3"]}`} />
        <div className={`${styles["footer-liquid-blob"]} ${styles["footer-liquid-blob-4"]}`} />
        <div className={styles["footer-mesh-gradient"]} />
      </div>

      <div className={styles["footer-gradient-border"]} />

      <div className={styles["footer-container"]}>
        {/* Brand */}
        <div className={styles["footer-brand"]}>
          <div className={styles["footer-logo-wrapper"]}>
            <span className={styles["footer-logo-text"]}>
              <span className={styles["logo-sarjan"]}>SARJAN</span>
              <span className={styles["logo-ai"]}> Ai</span>
            </span>
          </div>

          <p className={styles["footer-tagline"]}>
            Where ideas think together.
          </p>
        </div>

        {/* Links */}
        <div className={styles["footer-links-container"]}>
          {["Product", "Company", "Legal", "Resources"].map((title) => (
            <div key={title} className={styles["footer-link-column"]}>
              <h4 className={styles["footer-link-heading"]}>{title}</h4>
              <a className={styles["footer-link"]}>Link 1</a>
              <a className={styles["footer-link"]}>Link 2</a>
              <a className={styles["footer-link"]}>Link 3</a>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className={styles["footer-bottom-bar"]}>
        <div className={styles["footer-bottom-content"]}>
          <p className={styles["footer-copyright"]}>
            © {year} Sarjan AI
          </p>
          <p className={styles["footer-made-with"]}>
            Made with <span className={styles["footer-heart"]}>♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
