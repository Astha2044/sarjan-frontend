import { useState } from "react";
import axios from "axios";
import styles from "../../styles/PricingModal.module.css";

export default function PricingModal({ onClose, onPlanChangeSuccess, currentPlan }) {
  const [loading, setLoading] = useState(false);

  const handleChangePlan = async (newPlan) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plan/change`,
        { plan: newPlan },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      
      // Update localStorage
      const updatedUser = { ...user, plan: newPlan };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      onPlanChangeSuccess(newPlan);
      onClose();
    } catch (err) {
      console.error("Plan change failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Choose Your Plan</h2>
        <p className={styles.subtitle}>Select the best setup for your needs</p>

        <div className={styles.cardsRow}>
          {/* Free Card */}
          <div className={styles.card}>
            <div className={styles.planName}>Free</div>
            <div className={styles.price}>₹0 <span>/month</span></div>
            <ul className={styles.features}>
              <li>✓ 10 messages per day</li>
              <li>✓ Text responses</li>
              <li>✗ Image generation</li>
              <li>✗ Priority responses</li>
            </ul>
            {currentPlan === "free" ? (
              <button className={styles.currentBtn} disabled>
                Current Plan
              </button>
            ) : currentPlan === "pro" ? (
              <button
                className={styles.upgradeBtn}
                disabled
                style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#64748b', cursor: 'not-allowed' }}
              >
                Downgrade Restricted
              </button>
            ) : (
              <button
                className={styles.upgradeBtn}
                onClick={() => handleChangePlan("free")}
                disabled={loading}
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
              >
                {loading ? "Switching..." : "Downgrade to Free"}
              </button>
            )}
          </div>

          {/* Pro Card */}
          <div className={`${styles.card} ${styles.proCard}`}>
            <div className={styles.badge}>RECOMMENDED</div>
            <div className={styles.planName}>Pro</div>
            <div className={styles.price}>Free <span>for now</span></div>
            <ul className={styles.features}>
              <li>✓ Unlimited messages</li>
              <li>✓ Text responses</li>
              <li>✓ Image generation</li>
              <li>✓ Priority responses</li>
            </ul>
             {currentPlan === "pro" ? (
              <button className={styles.currentBtn} disabled style={{background: 'rgba(94, 234, 212, 0.2)', color: '#5eead4', border: '1px solid #5eead4'}}>
                Current Plan
              </button>
            ) : (
              <button
                className={styles.upgradeBtn}
                onClick={() => handleChangePlan("pro")}
                disabled={loading}
              >
                {loading ? "Upgrading..." : "Upgrade to Pro"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}