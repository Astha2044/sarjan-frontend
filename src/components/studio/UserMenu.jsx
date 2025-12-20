import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Sidebar.module.css";

export default function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // ✅ Lazy initialization (NO useEffect needed)
  const [user] = useState(() => {
      if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });
    console.log('user: ', user);

  const handleLogout = async () => {
    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } catch (err) {
      // ignore error
    } finally {
      // ✅ Force logout
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
        <div>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
        </div>
      </div>

      {open && (
        <div className={styles.menu}>
          <p className={styles.logout} onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
