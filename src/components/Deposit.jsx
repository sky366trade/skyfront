import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpCircle, CreditCard, History, AlertCircle, DollarSign, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [user, setUSer] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch("https://tradeflyhub.com/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Authentication failed');
        return res.json();
      })
      .then((data) => {
        setUSer(data.username);
        setWalletBalance(data.wallet);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Profile Error:', error);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token, walletBalance]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const order = await fetch("https://tradeflyhub.com/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      
      const data = await order.json();
      console.log("Order response:", data);

      const options = {
        key: "rzp_test_LMV41rb8aScSBr",
        amount: data.amount,
        currency: "USD",
        order_id: data.id,
        name: "BaaTrade",
        description: "Test Transaction",
        handler: async (response) => {
          console.log(response);
          const verify = await fetch(
            "https://tradeflyhub.com/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyResponse = await verify.json();
          if(verifyResponse.success) {
            async function updateWallet() {
              try {
                if (!token) {
                  console.error("Token is missing. Cannot update wallet.");
                  return;
                }
          
                if (!amount || isNaN(amount)) {
                  console.error("Invalid amount. Wallet update aborted.");
                  return;
                }
          
                const res = await fetch("https://tradeflyhub.com/update-wallet", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({ amount: Number(amount) })
                });
          
                const data = await res.json();
          
                if (res.ok) {
                  setWalletBalance(data.wallet);
                  console.log("✅ Wallet updated successfully:", data);
                } else {
                  console.error("❌ Failed to update wallet:", data.msg || data.error);
                }
              } catch (error) {
                console.error("❌ Error updating wallet:", error);
              }
            }
          
            updateWallet();
          }
          alert(verifyResponse.success);
        },
        prefill: {
          name: {user},
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error", err);
      alert("Payment Failed");
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate('/profile')}
            className="mb-6 flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </motion.button>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <ArrowUpCircle className="h-16 w-16 text-blue-500 mx-auto" />
            </motion.div>
            <h1 className="mt-4 text-3xl font-bold text-white">Deposit Funds</h1>
            <p className="mt-2 text-gray-400">Add money to your BeTrade wallet securely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Current Balance</h2>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold text-white">${walletBalance}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter Amount (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        onClick={() => setAmount(quickAmount.toString())}
                        className="py-2 px-4 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-xl text-white transition-colors"
                      >
                        ${quickAmount}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed via RazorPay</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    Minimum deposit amount: $100
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    Maximum deposit amount: $50,000
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    Funds will be credited instantly
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;