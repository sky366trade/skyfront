import React, { useEffect } from 'react';
import { useState } from 'react';
import { ArrowLeft, Wallet } from 'lucide-react';

function Withdrawal() {
  const [amount, setAmount] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
   
  const url = import.meta.env.VITE_BACKEND_URL; // Use this if you have a .env file
  const handleWithdrawal = async (e) => {
    e.preventDefault();
    try {
      if( !address1 && !address2) {
        setError('Please fill at least one address field');
        setSuccess('');
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
      console.log(response);
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
  }
  , []);


  return (
    <div className="min-h-screen bg-[#0a192f] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <a 
            href="/profile" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Profile
          </a>

          <div className="bg-[#112240] rounded-lg p-6 shadow-xl mb-8">
            <div className="flex items-center mb-6">
              <Wallet className="w-6 h-6 mr-2 text-blue-400" />
              <h1 className="text-2xl font-bold">Withdrawal Request</h1>
            </div>

            <form onSubmit={handleWithdrawal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Amount (USD $)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#1e2a4a] border border-gray-600 rounded-md p-2 text-white"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  USDT TRC20 Address
                </label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full bg-[#1e2a4a] border border-gray-600 rounded-md p-2 text-white"
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  BEP20 Address
                </label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full bg-[#1e2a4a] border border-gray-600 rounded-md p-2 text-white"
                  
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm py-2">{error}</div>
              )}
              {success && (
                <div className="text-green-400 text-sm py-2">{success}</div>
              )}

              <button onClick={handleWithdrawal}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Submit Withdrawal Request
              </button>
            </form>
          </div>

          <div className="bg-[#112240] rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div 
                  key={index}
                  className="border border-gray-600 rounded-md p-4 bg-[#1e2a4a]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Amount</p>
                      <p className="font-medium">{tx.amount} USDT</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <p className={`font-medium ${
                        tx.status === 'pending' ? 'text-yellow-400' :
                        tx.status === 'completed' ? 'text-green-400' :
                        tx.status=== 'failed' ? 'text-red-400' :    
                        'text-red-400'
                      }`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">TRC20 Address</p>
                    <p className="text-sm font-mono break-all">{tx.usdttrc20Address}</p>
                    <p className="text-sm text-gray-400">BEP20 Address</p>
                    <p className="text-sm font-mono break-all">{tx.bep20Address}</p>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                  No transactions found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;