import React, { useEffect } from 'react';
import { useState } from 'react';
import { ArrowLeft, Wallet, Sparkles, DollarSign, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

function Withdrawal() {
  const [amount, setAmount] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
   
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!address1 && !address2) {
        setError('Please fill at least one address field');
        setSuccess('');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${url}/withdrawalRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          usdttrc20Address: address1,
          bep20Address: address2,
        })
      });
    
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.msg);
        setError('');
        setAmount('');
        setAddress1('');
        setAddress2('');
        fetchTransactions();
      } else {
        setError(data.msg);
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to process withdrawal request');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${url}/withdrawalInfo`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074')] bg-cover bg-center opacity-5"></div>
      
      {/* Floating sparkles animation */}
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
          <TrendingUp className="w-6 h-6 text-blue-300" />
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
          <Sparkles className="w-8 h-8 text-indigo-300" />
        </motion.div>
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute top-40 left-2/3"
        >
          <DollarSign className="w-5 h-5 text-blue-400" />
        </motion.div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <motion.a 
            href="/profile" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </motion.a>

          {/* Withdrawal Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-100/50 border border-blue-200 mb-8"
          >
            <div className="flex items-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-lg">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Withdrawal Request
                </h1>
                <p className="text-gray-600 text-sm mt-1">Manage your funds with care</p>
              </div>
            </div>

            <form onSubmit={handleWithdrawal} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD $)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-blue-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-blue-300" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  USDT TRC20 Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-blue-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                    placeholder="Enter TRC20 address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Wallet className="w-5 h-5 text-blue-300" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BEP20 Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-blue-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                    placeholder="Enter BEP20 address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Wallet className="w-5 h-5 text-blue-300" />
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {success}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Submit Withdrawal Request</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Decorative bottom element */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-100/50 border border-blue-200"
          >
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mr-4">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Transaction History
              </h2>
            </div>

            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-blue-200 rounded-2xl p-6 bg-gradient-to-r from-white/50 to-blue-50/50 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-bold text-lg text-gray-800">${tx.amount} USDT</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tx.status)}
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className={`font-semibold capitalize ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {tx.usdttrc20Address && (
                      <div className="bg-white/60 rounded-xl p-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">TRC20 Address</p>
                        <p className="text-sm font-mono text-gray-800 break-all bg-gray-50 px-2 py-1 rounded">
                          {tx.usdttrc20Address}
                        </p>
                      </div>
                    )}
                    {tx.bep20Address && (
                      <div className="bg-white/60 rounded-xl p-3">
                        <p className="text-sm font-medium text-gray-600 mb-1">BEP20 Address</p>
                        <p className="text-sm font-mono text-gray-800 break-all bg-gray-50 px-2 py-1 rounded">
                          {tx.bep20Address}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {transactions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-gray-500 text-lg">No transactions found</p>
                  <p className="text-gray-400 text-sm mt-1">Your transaction history will appear here</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Bottom inspirational text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-gray-500 text-sm max-w-md mx-auto"
          >
            "Managing your finances with care and transparency, every step of the way"
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;