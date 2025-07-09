import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ReferralCode = () => {
  const location = useLocation();
  const code = location.state?.username;
  const [referralCode, setReferralCode] = useState(code);
  const navigate = useNavigate();
  const user = localStorage.getItem("username") || "";
  const url = import.meta.env.VITE_BACKEND_URL;

  const createTeam = async () => {
    if (!user) {
      alert("User data is missing!");
      return;
    }

    try {
      const response = await fetch(`${url}/create-team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReferral = async () => {
    try {
      const res = await fetch(`${url}/setParent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          user: referralCode,
        }),
      });
      const data = await res.json();
      alert(data.msg);
      localStorage.removeItem("username");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2025')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute top-20 left-1/4"
        >
          <Heart className="w-6 h-6 text-pink-300" />
        </motion.div>
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute top-32 right-1/3"
        >
          <Sparkles className="w-8 h-8 text-rose-300" />
        </motion.div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            LoveConnect
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-pink-200 shadow-2xl shadow-pink-100/50"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Join with Love
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your referral code to connect with your special someone
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="referralCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Referral Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="referralCode"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-pink-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter your love code"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Sparkles className="w-5 h-5 text-pink-300" />
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => handleReferral()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Continue with Love</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have a referral code?{" "}
              <button
                onClick={() => createTeam()}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors underline decoration-pink-300 hover:decoration-pink-500"
              >
                Start Your Journey
              </button>
            </p>
          </div>

          {/* Decorative bottom element */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
            <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
          </div>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-gray-500 text-sm max-w-md"
        >
          "Love is not just about finding the right person, but connecting hearts across the world"
        </motion.p>
      </div>
    </div>
  );
};

export default ReferralCode;