// pages/contact.js
import { useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
} from "react-icons/hi2";
import styles from "../styles/ContactPage.module.css";

const contactInfo = [
  {
    icon: HiOutlineEnvelope,
    title: "Email Us",
    value: "hello@sarjanai.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Live Chat",
    value: "Available in the app",
    sub: "Mon–Fri, 9am–6pm IST",
  },
  {
    icon: HiOutlineMapPin,
    title: "Based In",
    value: "India",
    sub: "Remote-first team",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to your backend or email service (e.g. EmailJS, Formspree)
    setSubmitted(true);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.label}>CONTACT</span>
          <h1>Let's Talk</h1>
          <p>
            Whether you have a question, want to explore Enterprise, or just
            want to say hello — we'd love to hear from you.
          </p>
        </header>

        <div className={styles.layout}>

          {/* LEFT — contact info */}
          <div className={styles.infoCol}>
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={styles.infoCard}>
                  <div className={styles.cardGlow} />
                  <div className={styles.infoIcon}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className={styles.infoTitle}>{item.title}</div>
                    <div className={styles.infoValue}>{item.value}</div>
                    <div className={styles.infoSub}>{item.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT — contact form */}
          <div className={styles.formCard}>
            <div className={styles.cardGlow} />

            {submitted ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Send a Message</h2>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message →
                </button>
              </form>
            )}
          </div>

        </div>

        <div className={styles.backRow}>
          <a href="/" className={styles.backLink}>← Back to Home</a>
        </div>
      </div>
    </main>
  );
}