import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpCircle, CreditCard, History, AlertCircle, DollarSign, ArrowLeft, Bitcoin, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'crypto'
  const [cryptoPaymentData, setCryptoPaymentData] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Profile Error:', error);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token, walletBalance]);

  useEffect(() => {
    if (paymentMethod === 'razorpay') {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [paymentMethod]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleCryptoPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          order_id: `ORDER-${Date.now()}`
        }),
      });

      const data = await response.json();
      setCryptoPaymentData(data);
      
      // Start polling for payment status
      const checkPaymentStatus = async () => {
        const statusResponse = await fetch(`${url}/payment-status/${data.payment_id}`);
        const statusData = await statusResponse.json();
        
        if (statusData.payment_status === 'finished') {
          await updateWallet();
          alert('Payment completed successfully!');
          setCryptoPaymentData(null);
        } else if (statusData.payment_status === 'failed') {
          alert('Payment failed. Please try again.');
          setCryptoPaymentData(null);
        }
      };

      const pollInterval = setInterval(checkPaymentStatus, 30000);
      
      setTimeout(() => {
        clearInterval(pollInterval);
        if (cryptoPaymentData) {
          alert('Payment session expired. Please try again.');
          setCryptoPaymentData(null);
        }
      }, 30 * 60 * 1000);

    } catch (error) {
      console.error('Error creating crypto payment:', error);
      alert('Failed to create crypto payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRazorPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const order = await fetch(`${url}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      
      const data = await order.json();

      const options = {
        key: import.meta.env.VITE_API_KEY,
        amount: data.amount,
        currency: "USD",
        order_id: data.id,
        name: "TradeFlyHub",
        description: "Test Transaction",
        handler: async (response) => {
          const verify = await fetch(
            `${url}/payment/verify-payment`,
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
            await updateWallet();
          }
          alert(verifyResponse.success);
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9876543210"
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error", err);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const updateWallet = async () => {
    try {
      if (!token || !amount || isNaN(amount)) {
        console.error("Invalid token or amount");
        return;
      }

      const res = await fetch(`${url}/update-wallet`, {
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
              <ArrowUpCircle className="h-16 w-16 text-blue-500 mx-auto" />
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

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-colors ${
                        paymentMethod === 'razorpay'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>RazorPay</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('crypto')}
                      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-colors ${
                        paymentMethod === 'crypto'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                    >
                      <Bitcoin className="h-5 w-5" />
                      <span>Crypto</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={paymentMethod === 'razorpay' ? handleRazorPayment : handleCryptoPayment}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <>
                      {paymentMethod === 'razorpay' ? (
                        <CreditCard className="h-5 w-5" />
                      ) : (
                        <Bitcoin className="h-5 w-5" />
                      )}
                      <span>
                        {paymentMethod === 'razorpay' ? 'Pay with RazorPay' : 'Pay with Crypto'}
                      </span>
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
              {cryptoPaymentData ? (
                <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Crypto Payment Details</h3>
                  <div className="space-y-6">
                    <div className="flex justify-center mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <QRCodeSVG
                          value={cryptoPaymentData.pay_address}
                          size={200}
                          level="H"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Payment Address</p>
                      <div className="flex items-center mt-1">
                        <p className="text-white font-mono break-all flex-1">{cryptoPaymentData.pay_address}</p>
                        <button
                          onClick={() => copyToClipboard(cryptoPaymentData.pay_address)}
                          className="ml-2 text-blue-500 hover:text-blue-400 transition-colors"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                      {copySuccess && (
                        <p className="text-green-500 text-sm mt-1">{copySuccess}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Amount to Send</p>
                      <p className="text-white font-mono text-xl">{cryptoPaymentData.pay_amount} USDT</p>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                      <p className="text-yellow-300 text-sm">
                        Please send exactly the specified amount to the payment address. The transaction will be automatically processed once confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
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
                      RazorPay funds credited instantly
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                      Crypto payments require network confirmation
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;