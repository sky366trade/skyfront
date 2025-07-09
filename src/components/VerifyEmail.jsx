import { useState, useEffect } from "react";
import { Mail, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  // Mock data for demo purposes
  const formData = { email: "user@example.com" };
  const username = "john_doe";

  useEffect(() => {
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
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: "Please check your email for the verification code",
        confirmButtonColor: "#3B82F6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send OTP. Please try again.",
        confirmButtonColor: "#EF4444",
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
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Swal.fire({
        icon: "success",
        title: "Verified!",
        text: "Your email has been verified successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      // Mock navigation
      console.log("Navigating to referral code page with username:", username);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Please try again",
        confirmButtonColor: "#EF4444",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-20 -left-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-80 h-80 top-20 right-20 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-72 h-72 bottom-20 left-20 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl space-y-8 transform hover:scale-105 transition-transform duration-300">
            {/* Header with animated icon */}
            <div className="text-center relative">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="mt-8 text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Verify Your Email
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We've sent a verification code <br />
               
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-16 text-center text-2xl font-bold bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white hover:border-gray-300 shadow-sm"
                />
              ))}
            </div>

            {/* Timer and Resend */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">
                  Time remaining: <span className="text-blue-600 font-bold">{formatTime(timeLeft)}</span>
                </span>
              </div>
              <button
                onClick={sendOTP}
                disabled={loading || timeLeft > 0}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium group"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""} group-hover:rotate-180 transition-transform duration-300`}
                />
                Resend OTP
              </button>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={loading || otp.some((digit) => !digit)}
              className="group relative w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <CheckCircle className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
              </span>
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
              <ArrowRight className="ml-2 h-5 w-5 text-blue-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
              <p>Didn't receive the code? Check your spam folder or</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                refresh the page
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;