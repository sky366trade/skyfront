import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQItem = ({ question, answer, isOpen, onToggle, delay = 0 }) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-all duration-200 group"
      >
        <span className="text-gray-800 font-semibold text-lg pr-4 group-hover:text-blue-600 transition-colors">
          {question}
        </span>
        <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:scale-110`}>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-blue-500" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-blue-500" />
          )}
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 pt-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
          <p className="text-gray-600 leading-relaxed text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const faqs = [
    {
      question: "What is Sky366Trade?",
      answer: "Sky366Trade is revolutionizing the rewarding industry by combining competitive tasks with innovative trading mechanics. Our platform provides a secure and engaging environment for players worldwide to earn rewards through various activities."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply create an account, verify your email, and make your first deposit. Once you're set up, you can start making tasks and completing them to earn rewards. Our user-friendly interface guides you through every step."
    },
    {
      question: "How does the reward system work?",
      answer: "Our reward system is based on your participation and performance. You earn points through completing tasks, trading, and completing challenges. These points can be converted into rewards or used for in-platform benefits. The more active you are, the more you can earn!"
    },
    {
      question: "Is my account secure?",
      answer: "Yes! We implement industry-standard security measures including SSL encryption, two-factor authentication, and regular security audits to ensure your account and assets are protected. Your security is our top priority."
    },
    {
      question: "How does the referral system work?",
      answer: "You will receive 10% commission whenever someone signs up using your username as the referral code. This is a great way to earn passive income by inviting friends and family to join our platform."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cryptocurrency payments for deposits and withdrawals. This ensures fast, secure, and global accessibility for all our users. Popular cryptocurrencies like Bitcoin, Ethereum, and others are supported."
    },
    {
      question: "How long do withdrawals take?",
      answer: "Withdrawal processing times vary depending on the payment method and network congestion. Cryptocurrency withdrawals typically process within 10-30 minutes after network confirmation. We strive to process all requests as quickly as possible."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
        {[...Array(6)].map((_, i) => (
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
        <div className="max-w-4xl mx-auto">
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
                <HelpCircle className="h-10 w-10 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about Sky366Trade and get the help you need
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${focusedField === 'search' ? 'text-blue-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onFocus={() => setFocusedField('search')}
                onBlur={() => setFocusedField('')}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 shadow-lg"
              />
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openItems[index]}
                  onToggle={() => toggleItem(index)}
                  delay={index * 100}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse all FAQs above.</p>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl text-center transform hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our support team is here to help you with any questions or concerns you might have.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Support Team
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
              <div className="text-2xl font-bold text-blue-600">{faqs.length}</div>
              <div className="text-sm text-gray-600">Total FAQs</div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
              <div className="text-2xl font-bold text-purple-600"> 1hr</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;