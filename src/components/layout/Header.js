import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Header.module.css";

import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef} className={`${styles.header} ${scrolled ? styles["header-scrolled"] : ""
        }`}
    >
      {/* Glass Background */}
      <div className={styles["glass-background"]}>
        <div
          className={`${styles["liquid-blob"]} ${styles["liquid-blob-1"]}`}
        />
        <div
          className={`${styles["liquid-blob"]} ${styles["liquid-blob-2"]}`}
        />
        <div
          className={`${styles["liquid-blob"]} ${styles["liquid-blob-3"]}`}
        />
        <div
          className={`${styles["liquid-blob"]} ${styles["liquid-blob-4"]}`}
        />
        <div className={styles["mesh-gradient"]} />
      </div>

      <div className={styles["gradient-border"]} />

      <div className={styles["header-container"]}>
        {/* Logo */}
        <a href="/" className={styles["logo-link"]}>
          <div className={styles["logo-wrapper"]}>
            <img
              src="/images/sarjan.png"
              alt="Sarjan AI"
              className={styles.logoImage}
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={`${styles.nav} ${styles["desktop-nav"]}`}>
          {["Home", "Our Flow", "About", "Example"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveNav(item)}
              className={`${styles["nav-link"]} ${activeNav === item ? styles["nav-link-active"] : ""
                }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className={`${styles.actions} ${styles["desktop-actions"]}`}>
          <button className={styles["login-btn"]} onClick={() => setOpenLogin(true)}>Login</button>
          <button
            className={styles["cta-btn"]}
            onClick={() => setOpenRegister(true)}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles["mobile-menu-btn"]}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div
            className={`${styles.hamburger} ${mobileMenuOpen ? styles["hamburger-open"] : ""
              }`}
          >
            <span className={styles["hamburger-line"]} />
            <span className={styles["hamburger-line"]} />
            <span className={styles["hamburger-line"]} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`${styles["mobile-menu"]} ${mobileMenuOpen ? styles["mobile-menu-open"] : ""
          }`}
      >
        <nav className={styles["mobile-nav"]}>
          {["Features", "Agents", "Demo"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={styles["mobile-nav-link"]}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className={styles["mobile-actions"]}>
          <button className={styles["mobile-login-btn"]}>Login</button>
          <button className={styles["mobile-cta-btn"]}>Get Started</button>
        </div>
      </div>

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />
    </header>
  );
};

export default Header;
