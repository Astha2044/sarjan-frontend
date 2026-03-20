/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/Register.module.css";

const ForgotPasswordModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`,
        {
          email: data.email,
        }
      );

      toast.success("Password reset link sent to your email 📧");
      reset();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reset link");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.logoWrapper}>
          <img
            src="/images/sarjan.png"
            alt="Sarjan AI"
            className={styles.logo}
          />
        </div>
        <h2 className={styles.title}>Reset Password</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

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

          <button disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button className={styles.closeBtn} onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
