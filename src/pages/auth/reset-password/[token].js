import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../styles/Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reset-password/${token}`,
                {
                    password: data.password,
                }
            );

            toast.success("Password reset successful! You can now log in. 🚀");
            router.push("/");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Reset failed. Token might be invalid or expired.");
        }
    };

    if (!token) {
        return <div className={styles.overlay}><div className={styles.modal}><h2>Invalid Token</h2></div></div>;
    }

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
                <h2 className={styles.title}>New Password</h2>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                    Please enter your new password below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Password */}
                    <div className={styles.field} style={{ position: "relative" }}>
                        <input
                            placeholder="New Password"
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
                            placeholder="Confirm New Password"
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
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
