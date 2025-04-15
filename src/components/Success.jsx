import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Success = () => {
  const { username, amount } = useParams();
  const token = localStorage.getItem("token");
  const Payment = localStorage.getItem("Payment");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false); // Prevents double execution

  useEffect(() => {
    if (hasRun.current) return; // Exit if already run
    hasRun.current = true; // Set flag after first run

    if (Payment !== "Success") {
      alert("❌ Unauthorized access! Redirecting...");
      navigate("/");
      return;
    }

    const updateWallet = async () => {
      try {
        const response = await fetch(`${url}/update-wallet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(`✅ Wallet updated successfully with $${amount}`);
        } else {
          alert(`❌ Error: ${data.msg}`);
        }
      } catch (error) {
        console.error("Error updating wallet:", error);
        alert("Failed to update wallet. Please try again.");
      }
    };

    const setReward = async () => {
      try {
        const response = await fetch(`${url}/getReward`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, username }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(`✅ Reward updated successfully`);
        } else {
          alert(`❌ Error: ${data.msg}`);
        }
      } catch (error) {
        console.error("Error updating reward:", error);
        alert("Failed to update reward. Please try again.");
      }
    };

    const processTransaction = async () => {
      await Promise.all([updateWallet(), setReward()]);
      setLoading(false);
      localStorage.removeItem("Payment");
    };

    processTransaction();
  }, [amount, token, navigate, url, username]);

  return (
    <div className="flex justify-center items-center min-h-screen text-white text-xl">
      {loading ? "Processing payment..." : `✅ $${amount} deposited to ${username}'s wallet`}
    </div>
  );
};

export default Success;
