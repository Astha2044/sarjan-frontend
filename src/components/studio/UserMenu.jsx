import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Sidebar.module.css";
import PricingModal from "./PricingModal";

export default function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [currentPlan, setCurrentPlan] = useState(user?.plan || "free");

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } },
      );
    } finally {
      localStorage.clear();
      router.push("/");
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/plan/invoice`,
        { 
          headers: { Authorization: `Bearer ${user?.token}` },
          responseType: 'blob'
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `SarjanAI_Invoice_${user?._id || 'pro'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Invoice download failed:", err);
    }
  };

  if (!user) return null;

  return (
    <div className={styles.user}>
      <div className={styles.userInfo} onClick={() => setOpen(!open)}>
        <div className={styles.avatarCircle}>
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        <div className={styles.userText}>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
          <span className={styles.planBadge}>
            {currentPlan === "pro" ? "⭐ Pro" : "🔒 Free"}
          </span>
        </div>
      </div>

      {open && (
        <div className={styles.menu}>
          {currentPlan === "free" ? (
            <button
              className={styles.upgradeBtn}
              onClick={() => setShowPricing(true)}
            >
              Upgrade to Pro
            </button>
          ) : (
            <>
              <button
                className={styles.upgradeBtn}
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                onClick={() => setShowPricing(true)}
              >
                Manage Plan
              </button>
              <button 
                className={styles.upgradeBtn}
                style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', marginTop: '4px' }}
                onClick={handleDownloadInvoice}
              >
                Download Bill
              </button>
            </>
          )}
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {showPricing && (
        <PricingModal
          currentPlan={currentPlan}
          onClose={() => setShowPricing(false)}
          onPlanChangeSuccess={(newPlan) => setCurrentPlan(newPlan)}
        />
      )}
    </div>
  );
}
