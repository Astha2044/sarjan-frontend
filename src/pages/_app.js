import { useEffect, useState } from "react";
import "@/styles/globals.css";
import MainLayout from "@/components/layout/MainLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  // studio page ma header/footer hide
  const isStudio = router.pathname === "/studio";

  useEffect(() => {
    const verifyUser = async () => {
      if (typeof window === "undefined") return;

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setAuthChecked(true);
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user?.token) {
        localStorage.clear();
        router.push("/");
        return;
      }

      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // token valid
        setAuthChecked(true);
      } catch (error) {
        //  token invalid
        localStorage.clear();
        router.push("/");
      }
    };

    verifyUser();
  }, [router]);

  //  prevent UI flash before auth check
  if (!authChecked) return null;

  return isStudio ? (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  ) : (
    <MainLayout>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </MainLayout>
  );
}
