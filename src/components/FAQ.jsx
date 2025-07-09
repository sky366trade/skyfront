import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-gray-700 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-800/40 hover:bg-gray-700/40 transition-colors"
      >
        <span className="text-white font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-800/20 text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const navigate = useNavigate();
  const faqs = [
    {
      question: "What is Sky366Trade?",
      answer: "Sky366Trade is revolutionizing the rewarding industry by combining competitive tasks with innovative trading mechanics.Our platform provides a secure and engaging environment for players worldwide."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply create an account, verify your email, and make your first deposit. Once you're set up, you can start  making tasks, and completing the tasks."
    },
   
    {
      question: "How does the reward system work?",
      answer: "Our reward system is based on your participation and performance. You earn points through completing tasks, trading, and completing challenges. These points can be converted into rewards or used for in-platform benefits."
    },
    {
      question: "Is my account secure?",
      answer: "Yes! We implement industry-standard security measures including SSL encryption, two-factor authentication, and regular security audits to ensure your account and assets are protected."
    },
    {
      question: "how the refferal system works?",
      answer: "You will receive 10% commission whenever someone signs up using your username as the referral code."
    }
  ];

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <HelpCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400">Find answers to common questions about Sky366Trade</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400">
              Still have questions? {" "}
              <button
                onClick={() => navigate('/contact')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact our support team
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;