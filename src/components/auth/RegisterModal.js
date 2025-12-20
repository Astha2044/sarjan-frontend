/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/incompatible-library */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";

const RegisterModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );


      // ✅ SAME AS LOGIN
      localStorage.setItem("user", JSON.stringify(res.data?.data));

      toast.success("Registration successful 🚀");

      reset(); // clear form
      onClose(); // close modal

      // ✅ Redirect to Studio
      router.push("/studio");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  const handleClose = () => {
    reset(); // 🔥 close button par pan reset
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
        <h2 className={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className={styles.field}>
            <input
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

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

          {/* Confirm Password */}
          <div className={styles.field} style={{ position: "relative" }}>
            <input
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <button disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <button className={styles.closeBtn} onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
