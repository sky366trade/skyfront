import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, Tag, Calendar, Clock, ArrowRight, Share2, Heart, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewsCard = ({ title, date, readTime, tags, description, content, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <motion.img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-blue-500" />
              {date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-green-500" />
              {readTime} min read
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300"
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </motion.button>
              </div>
              <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="p-4 sm:p-6">
                  <motion.img 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    src={image} 
                    alt={title}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  <div className="prose prose-gray max-w-none">
                    {content}
                  </div>
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
      title: "First Deposit Special – Get $7 on Your First $100 Deposit",
      date: "Mar 15, 2024",
      readTime: 5,
      tags: ["Bonus", "Prizes"],
      description: "Deposit $100 as your first deposit and receive $7 as a reward. This offer is applicable only for first-time depositors.",
      content: (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900">How it works</h4>
          <ul className="list-disc pl-4 space-y-2 text-gray-700">
            <li>A new registered member makes an initial one-time deposit of $100.</li>
            <li>They receive a $7 reward instantly.</li>
            <li>Users can use the bonus amount to complete tasks and win real money.</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800">
              <strong>Important:</strong> Fraudulent activities like multiple accounts with the same identity, multiple logins from the same IP, or using VPNs to access multiple accounts will lead to disqualification.
            </p>
          </div>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1650821289259-cb51d897d706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Mentorship Rewards Program – Earn Up to $3000",
      date: "Mar 14, 2024",
      readTime: 3,
      tags: ["Update", "Features"],
      description: "At Sky366Trade, we recognize and reward mentorship. Our Mentorship Rewards Program allows you to earn up to $3000 based on your downline network performance.",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">We're constantly working to improve your experience on our platform. Today, we're excited to announce several new features that will make your gaming journey even better!</p>
          <h4 className="text-xl font-bold text-gray-900">Important Notes</h4>
          <ul className="list-disc pl-4 space-y-2 text-gray-700">
            <li>Each user is allowed only one Sky366Trade account.</li>
            <li>Accounts sharing the same IP address will not be eligible for rewards.</li>
            <li>Sky366Trade reserves the right to cancel rewards participation if fraudulent activities are detected, such as multiple accounts with the same identity or VPN usage to log into multiple accounts.</li>
          </ul>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Great News:</strong> These updates are now live! Log in to explore all the new features and improvements.
            </p>
          </div>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1561346745-5db62ae43861?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Direct Downline Deposit Rewards – Earn Up to $500",
      date: "Mar 13, 2024",
      readTime: 4,
      tags: ["Community", "Awards"],
      description: "At Sky366Trade, we value your referrals. Get rewarded every time your direct downlines make their initial deposits.",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Join Sky366Trade today and maximize your earnings with our referral and mentorship rewards programs!</p>
          <h4 className="text-xl font-bold text-gray-900">Important Notes</h4>
          <ul className="list-disc pl-4 space-y-2 text-gray-700">
            <li>Only one Sky366Trade account per user is allowed.</li>
            <li>Accounts sharing an IP address are not eligible for rewards.</li>
            <li>Sky366Trade reserves the right to cancel rewards if fraudulent activities such as multiple accounts or VPN usage are detected.</li>
          </ul>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Congratulations:</strong> To all our champions! Your dedication and contribution make our community stronger.
            </p>
          </div>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1554134449-8ad2b1dea29e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="relative h-[30vh] sm:h-[40vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070" 
          alt="News Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-blue-600/40 to-white" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg"
            >
              News & Events
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 max-w-xl mx-auto px-4 drop-shadow-md"
            >
              Stay updated with the latest announcements, updates, and community events
            </motion.p>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/profile')}
        className="fixed top-4 sm:top-8 left-4 sm:left-8 bg-white/90 backdrop-blur-xl p-2 sm:p-3 rounded-xl border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-gray-800 z-50"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-sm sm:text-base font-medium">Back to Profile</span>
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover exciting opportunities, new features, and important announcements from our platform
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <NewsCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsEvents;