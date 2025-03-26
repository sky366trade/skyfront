import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, Tag, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewsCard = ({ title, date, readTime, tags, description, content, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden hover:bg-gray-700/40 transition-all duration-300"
      >
        <div className="relative h-48 sm:h-56">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-400 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {readTime} min read
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <div className="prose prose-invert max-w-none">
                  {content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NewsEvents = () => {
  const navigate = useNavigate();
  
  const news = [
    {
      title: " First Deposit Special – Get $7 on Your First $100 Deposit",
      date: "Mar 15, 2024",
      readTime: 5,
      tags: [ "Bonus", "Prizes"],
      description: "Deposit $100 as your first deposit and receive $7 as a reward. This offer is applicable only for first-time depositors.",
      content: (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">How its works</h4>
          <ul className="list-disc pl-4 space-y-2">
            <li>A new registered member makes an initial one-time deposit of $100.</li>
            <li>They receive a $7 reward instantly.</li>
            <li>Users can use the bonus amount to complete tasks and win real money.</li>
          </ul>
          <p>Fraudulent activities like multiple accounts with the same identity, multiple logins from the same IP, or using VPNs to access multiple accounts will lead to disqualification.</p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1650821289259-cb51d897d706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Mentorship Rewards Program – Earn Up to $3000",
      date: "Mar 14, 2024",
      readTime: 3,
      tags: ["Update", "Features"],
      description: "At TradeFlyHub, we recognize and reward mentorship. Our Mentorship Rewards Program allows you to earn up to $3000 based on your downline network performance.",
      content: (
        <div className="space-y-4">
          <p>We're constantly working to improve your experience on our platform. Today, we're excited to announce several new features that will make your gaming journey even better!</p>
          <h4 className="text-xl font-bold text-white">Important Notes</h4>
          <ul className="list-disc pl-4 space-y-2">
            <li>Each user is allowed only one TradeFlyHub account.</li>
            <li>Accounts sharing the same IP address will not be eligible for rewards.</li>
            <li>TradeFlyHub reserves the right to cancel rewards participation if fraudulent activities are detected, such as multiple accounts with the same identity or VPN usage to log into multiple accounts.</li>
          </ul>
          <p>These updates are now live! Log in to explore all the new features and improvements.</p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1561346745-5db62ae43861?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Direct Downline Deposit Rewards – Earn Up to $500",
      date: "Mar 13, 2024",
      readTime: 4,
      tags: ["Community", "Awards"],
      description: "At TradeFlyHub, we value your referrals. Get rewarded every time your direct downlines make their initial deposits.",
      content: (
        <div className="space-y-4">
          <p>Join TradeFlyHub today and maximize your earnings with our referral and mentorship rewards programs!</p>
          <h4 className="text-xl font-bold text-white">Important Notes</h4>
          <ul className="list-disc pl-4 space-y-2">
            <li>Only one TradeFlyHub account per user is allowed.

h</li>
            <li>Accounts sharing an IP address are not eligible for rewards</li>
            <li>TradeFlyHub reserves the right to cancel rewards if fraudulent activities such as multiple accounts or VPN usage are detected.</li>
          </ul>
          <p>Congratulations to all our champions! Your dedication and contribution make our community stronger.</p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1554134449-8ad2b1dea29e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/95">
      <div className="relative h-[30vh] sm:h-[40vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070" 
          alt="News Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">News & Events</h1>
            <p className="text-gray-300 max-w-xl mx-auto px-4">Stay updated with the latest announcements, updates, and community events</p>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/profile')}
        className="fixed top-4 sm:top-8 left-4 sm:left-8 bg-gray-800/40 backdrop-blur-xl p-2 sm:p-3 rounded-xl border border-gray-700 hover:bg-gray-700/40 transition-all duration-300 flex items-center space-x-2 text-white z-50"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-sm sm:text-base">Back to Profile</span>
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;