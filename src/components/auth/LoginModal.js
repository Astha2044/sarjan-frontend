
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import styles from "../../styles/Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Script from "next/script";

const LoginModal = ({ open, onClose, onOpenRegister, onOpenForgotPassword }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  /* ================= NORMAL LOGIN ================= */
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data?.data));

      toast.success("Login successful 🚀");

      reset();
      onClose();
      router.push("/studio");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  /* ================= BODY SCROLL ================= */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* ================= GOOGLE LOGIN ================= */
  useEffect(() => {
    if (open && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google/verify`,
              { idToken: response.credential }
            );

            if (res.data?.status === "success") {
              localStorage.setItem("user", JSON.stringify(res.data?.data));
              toast.success("Google Login successful 🚀");
              onClose();
              router.push("/studio");
            }
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "Google Login failed"
            );
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn"),
        {
          theme: "outline",
          size: "large",
          width: 360,
          shape: "rectangular", // ✅ Match Design corners
        }
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* ✅ Google Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      <div className={styles.overlay}>
        <div className={styles.modal}>
          {/* Logo */}
          <div className={styles.logoWrapper}>
            <img
              src="/images/sarjan.png"
              alt="Sarjan AI"
              className={styles.logo}
            />
          </div>

          <h2 className={styles.title}>Welcome Back</h2>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className={styles.field}>
              <input
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className={styles.field} style={{ position: "relative" }}>
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            {/* Forgot Password */}
            <div className={styles.forgotPassword}>
              <button
                type="button"
                onClick={() => {
                  if (typeof onOpenForgotPassword === "function") {
                    onClose();
                    onOpenForgotPassword();
                  } else {
                    // Fallback for standalone pages or missing props
                    router.push("/auth/forgot-password").catch(() => {
                      toast.info("Forgot password feature coming soon!");
                    });
                  }
                }}
              >
                Forgot Password?
              </button>
            </div>

            <button disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          {/* ✅ Google Button */}
          {/* ✅ Custom Google Button with Invisible Overlay */}
          <div className={styles.googleBtnContainer}>
            <div className={styles.customGoogleBtn}>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48px' height='48px'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C40.796,35.33,44,30.026,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E"
                className={styles.googleIcon}
                alt="Google"
              />
              <span className={styles.googleText}>Sign in with Google</span>
            </div>
            <div id="googleLoginBtn" className={styles.hiddenGoogleBtn}></div>
          </div>

          {/* Switch */}
          <div className={styles.switchAuth}>
            <span>Don’t have an account?</span>
            <button
              type="button"
              onClick={() => {
                if (typeof onOpenRegister === "function") {
                  onClose();
                  onOpenRegister();
                } else {
                  // Fallback: Redirect to register page if no modal callback provided
                  router.push("/auth/register");
                }
              }}
            >
              Register
            </button>
          </div>

          {/* Close */}
          <button className={styles.closeBtn} onClick={handleClose}>
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
