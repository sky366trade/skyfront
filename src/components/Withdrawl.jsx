import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bitcoin, Feather as Ethereum, DollarSign, Wallet2, RefreshCw, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {
    const token=localStorage.getItem("token");
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [payoutId, setPayoutId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendURL = "http://localhost:3000";

  const getCurrencyIcon = (curr) => {
    switch (curr) {
      case "BTC":
        return <Bitcoin className="w-5 h-5" />;
      case "ETH":
        return <Ethereum className="w-5 h-5" />;
      case "USDT":
        return <DollarSign className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleWithdraw = async () => {
    if (!currency || !amount || !toAddress) {
      setStatus("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/withdraw`, {
        currency,
        amount,
        toAddress,
        token: {token},
      });

      setPayoutId(response.data.payout_id);
      setStatus(`Withdrawal Created! Payout ID: ${response.data.payout_id}`);
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkPayoutStatus = async () => {
    if (!payoutId) {
      setStatus("Enter a valid Payout ID");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${backendURL}/payout-status/${payoutId}`);
      setStatus(`Payout Status: ${response.data.status}`);
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white py-12 px-4">
      <div className="max-w-md mx-auto bg-blue-800/30 rounded-xl backdrop-blur-sm shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-100">Withdraw Crypto</h2>
          <button
            onClick={() => navigate('/profile')}
            className="bg-blue-700/50 hover:bg-blue-600/50 rounded-full p-2 transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Currency</label>
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-blue-900/50 border border-blue-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
              </select>
              <div className="absolute left-3 top-3 text-blue-300">
                {getCurrencyIcon(currency)}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-blue-900/50 border border-blue-700 rounded-lg py-2.5 px-4 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Wallet Address</label>
            <div className="relative">
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="Enter wallet address"
                className="w-full bg-blue-900/50 border border-blue-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-3 text-blue-300">
                <Wallet2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>

          <div className="border-t border-blue-700 my-6"></div>

          <div>
            <h3 className="text-xl font-semibold text-blue-100 mb-4">Check Payout Status</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Payout ID"
                value={payoutId}
                onChange={(e) => setPayoutId(e.target.value)}
                className="w-full bg-blue-900/50 border border-blue-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="absolute left-3 top-3 text-blue-300">
                <RefreshCw className="w-5 h-5" />
              </div>
            </div>
            <button
              onClick={checkPayoutStatus}
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>
          </div>

          {status && (
            <div className={`mt-4 p-4 rounded-lg ${status.includes('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;