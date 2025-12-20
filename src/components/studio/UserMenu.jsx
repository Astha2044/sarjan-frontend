import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Sidebar.module.css";

export default function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
    } finally {
      localStorage.clear();
      router.push("/");
    }
  };

  if (!user) return null;

  return (
    <div className={styles.user}>
      <div
        className={styles.userInfo}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.avatarCircle}>
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        <div className={styles.userText}>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
        </div>
      </div>

      {open && (
        <div className={styles.menu}>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

