import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GamepadIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ReferralCode = () => {
  const location = useLocation();
  const code=location.state?.username;
  const [referralCode, setReferralCode] = useState(code);
  const navigate = useNavigate();
  const user = localStorage.getItem("username") || "";
  const url = "http://localhost:3000"; // Define URL
  const createTeam = async () => {
    if (!user) {  
      alert("User data is missing!");
      return;
    }

    try {
      const respose=await fetch(`${url}/create-team`, {
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
        method: "POST", // Change to POST
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
      alert("Error collecting your rewards");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
            <img src="icon-03.png" className="h-13.5 w-15.5 mr-0 " />
            </div>
          </div>
          <span className="ml-3 text-3xl font-bold text-white">
            TradeFlyHub
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Enter Referral Code
          </h2>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="referralCode"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Referral Code
              </label>
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your referral code"
              />
            </div>

            <motion.button
              onClick={() => handleReferral()} // Fix onClick
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

          
          </form>
          <p className="text-center text-gray-400 text-sm">
              Don't have a referral code?{" "}
              <button
                onClick={() => createTeam()}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Skip to Login
              </button>
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralCode;
