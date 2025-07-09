import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Wallet, 
  DollarSign, 
  Bitcoin, 
  AlertCircle, 
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cryptoPaymentData, setCryptoPaymentData] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
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
  }, [token]);

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

  const quickAmounts = [
    { value: 100, popular: false },
    { value: 500, popular: true },
    { value: 1000, popular: false },
    { value: 5000, popular: false }
  ];

  const handleQuickAmountSelect = (quickAmount) => {
    setAmount(quickAmount.toString());
    setSelectedQuickAmount(quickAmount);
    setTimeout(() => setSelectedQuickAmount(null), 200);
  };

  const isValidAmount = amount && parseFloat(amount) >= 100 && parseFloat(amount) <= 50000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 top-1/2 left-1/4 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/profile')}
            className="mb-8 flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6 transform hover:scale-110 transition-all duration-300">
                <Bitcoin className="h-10 w-10 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Deposit Funds
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Add money to your Sky366Trade wallet securely with cryptocurrency payments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Deposit Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Balance Card */}
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Wallet className="h-6 w-6 mr-3 text-blue-500" />
                    Current Balance
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${parseFloat(walletBalance || 0).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">Available Balance</div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Form */}
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Deposit Amount</h3>
                
                {/* Amount Input */}
                <div className="relative group">
                  <label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                  >
                    Enter Amount (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className={`h-5 w-5 transition-colors ${focusedField === 'amount' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onFocus={() => setFocusedField('amount')}
                      onBlur={() => setFocusedField('')}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-lg font-medium"
                      placeholder="Enter amount (min $100)"
                      min="100"
                      max="50000"
                    />
                    {isValidAmount && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                  {amount && !isValidAmount && (
                    <p className="mt-2 text-sm text-red-600">
                      Amount must be between $100 and $50,000
                    </p>
                  )}
                </div>

                {/* Quick Select Amounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount.value}
                        onClick={() => handleQuickAmountSelect(quickAmount.value)}
                        className={`relative py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                          selectedQuickAmount === quickAmount.value
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        ${quickAmount.value.toLocaleString()}
                        {quickAmount.popular && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deposit Button */}
                <button
                  onClick={handleCryptoPayment}
                  disabled={loading || !isValidAmount}
                  className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Bitcoin className="h-6 w-6" />
                      <span>Pay with Cryptocurrency</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Important Notes */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                  Important Notes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Minimum deposit amount: $100</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Maximum deposit amount: $50,000</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Payments require network confirmation</p>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Security Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-gray-600 text-sm">256-bit SSL encryption</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-gray-600 text-sm">Secure cryptocurrency processing</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-gray-600 text-sm">Real-time transaction monitoring</p>
                  </div>
                </div>
              </div>

              {/* Processing Time */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  Processing Time
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    Cryptocurrency deposits typically process within 10-30 minutes after network confirmation.
                  </p>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-700 text-sm font-medium">
                      💡 Tip: Higher network fees result in faster confirmations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;