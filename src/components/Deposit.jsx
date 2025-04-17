import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet, DollarSign, Bitcoin, AlertCircle } from "lucide-react";

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cryptoPaymentData, setCryptoPaymentData] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${url}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Authentication failed');
        return res.json();
      })
      .then((data) => {
        setUser(data.username);
        setWalletBalance(data.wallet);
      })
      .catch((error) => {
        console.error('Profile Error:', error);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token]);  // ✅ Removed `walletBalance` from dependency list

  const handleCryptoPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/create-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user,
          amount: parseFloat(amount),
          order_id: `ORDER-${Date.now()}`
        }),
      });

      const data = await response.json();
      localStorage.setItem("Payment","Success");
      if (response.ok) {
        setCryptoPaymentData(data);
        window.location.href=data.invoice_url;
      } else {
        alert(`❌ Error: ${data.error || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error('Error creating crypto payment:', error);
      alert('Failed to create crypto payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
              <Bitcoin className="h-16 w-16 text-blue-500 mx-auto" />
            </motion.div>
            <h1 className="mt-4 text-3xl font-bold text-white">Deposit Funds</h1>
            <p className="mt-2 text-gray-400">Add money to your TradeFlyHub wallet securely</p>
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
                  <span className="text-2xl font-bold text-white">{parseFloat(walletBalance).toFixed(2)} 
                  </span>
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
                  onClick={handleCryptoPayment}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Bitcoin className="h-5 w-5" />
                      <span>Pay with Crypto</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                Important Notes
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>Minimum deposit amount: $100</li>
                <li>Maximum deposit amount: $50,000</li>
                <li>Payments require network confirmation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
