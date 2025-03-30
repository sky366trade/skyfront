import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!formData) {
      navigate("/register");
      return;
    }

    // Send OTP when component mounts
    sendOTP();

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: "Please check your email for the verification code",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send OTP. Please try again.",
      });
      console.error("Send OTP Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please enter all 6 digits",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          otp: otpString,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      Swal.fire({
        icon: "success",
        title: "Verified!",
        text: "Your email has been verified successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      localStorage.setItem("username", formData.username);

      navigate("/referralCode");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.message || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute w-96 h-96 -bottom-10 -right-10 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl space-y-8">
            <div className="text-center relative">
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">
                Verify Your Email
              </h2>
              <p className="mt-2 text-gray-300">
                We've sent a verification code to {formData.email}
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Time remaining: {formatTime(timeLeft)}</span>
              <button
                onClick={sendOTP}
                disabled={loading || timeLeft > 0}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Resend OTP
              </button>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.some((digit) => !digit)}
              className="group relative w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <CheckCircle className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              {loading ? "Verifying..." : "Verify Email"}
              <ArrowRight className="ml-2 h-5 w-5 text-blue-300 group-hover:text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
