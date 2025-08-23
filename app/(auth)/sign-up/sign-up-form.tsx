"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react"; // Added for useEffect

export default function SignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpStep, setOtpStep] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.currentTarget;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    }, []);

    async function handleSendOtp() {
        setError("");
        setOtpLoading(true);
        try {
            const response = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });
            const data = await response.json();
            if (response.ok) {
                setOtpStep(true);
                setResendCooldown(30); // 30s cooldown
            } else {
                setError(data.message || "Failed to send OTP.");
            }
        } catch {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setOtpLoading(false);
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setOtpLoading(true);
        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp }),
            });
            const data = await response.json();
            if (response.ok) {
                setOtpVerified(true);
            } else {
                setError(data.message || "Invalid OTP.");
            }
        } catch {
            setError("OTP verification failed. Try again.");
        } finally {
            setOtpLoading(false);
        }
    }

    // Resend cooldown timer
    React.useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!otpVerified) {
            setError("Please verify OTP before signing up.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const { firstName, lastName, email, password } = formData;
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                router.push(`/${data.user?.userName}`);
            } else {
                setError(data.message || "Register failed. Please try again.");
            }
        } catch {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 space-y-6 lg:space-y-0">
                <div className="w-full">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                    </label>
                    <div className="mt-1">
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={otpStep}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                    </label>
                    <div className="mt-1">
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={otpStep}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={otpStep}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        disabled={otpStep}
                    />
                </div>
            </div>

            {/* OTP Step */}
            {otpStep && !otpVerified && (
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        Enter OTP sent to your email
                    </label>
                    <div className="mt-1 flex gap-2">
                        <Input
                            id="otp"
                            name="otp"
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            maxLength={6}
                            required
                        />
                        <Button type="button" onClick={handleVerifyOtp} disabled={otpLoading || otp.length !== 6}>
                            {otpLoading ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </div>
                    <div className="mt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={resendCooldown > 0}
                            onClick={() => {
                                setOtp("");
                                setOtpVerified(false);
                                setOtpStep(false);
                                setTimeout(() => setOtpStep(true), 100); // re-trigger send OTP
                            }}
                        >
                            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
                        </Button>
                    </div>
                </div>
            )}
            {otpStep && otpVerified && (
                <div className="text-green-600 text-sm">OTP verified! You can now sign up.</div>
            )}
            <div>
                {!otpStep ? (
                    <Button
                        type="button"
                        disabled={loading || otpStep}
                        className="w-full"
                        onClick={handleSendOtp}
                    >
                        {otpLoading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                ) : (
                    <Button type="submit" disabled={loading || (otpStep && !otpVerified)} className="w-full">
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                {otpStep ? "Signing Up..." : "Sending OTP..."}
                            </>
                        ) : (
                            otpStep ? "Sign Up" : "Send OTP"
                        )}
                    </Button>
                )}
            </div>
        </form>
    );
}


