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
      title: "New Gaming Tournament Series Announced",
      date: "Mar 15, 2024",
      readTime: 5,
      tags: ["Tournament", "Gaming", "Prizes"],
      description: "Get ready for our biggest tournament series yet! With over $100,000 in prizes and multiple game categories, this is your chance to prove your skills and win big.",
      content: (
        <div className="space-y-4">
          <p>We're thrilled to announce our biggest tournament series yet, featuring multiple game categories and incredible prizes! Starting next month, players from around the world will compete for a share of the $100,000 prize pool.</p>
          <h4 className="text-xl font-bold text-white">Tournament Details</h4>
          <ul className="list-disc pl-4 space-y-2">
            <li>Multiple game categories including FPS, MOBA, and Battle Royale</li>
            <li>Qualifiers begin April 1st</li>
            <li>Finals will be streamed live on our platform</li>
            <li>Special rewards for all participants</li>
          </ul>
          <p>Don't miss this opportunity to showcase your skills and compete against the best players in the community!</p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
    },
    {
      title: "Platform Updates: New Features Released",
      date: "Mar 14, 2024",
      readTime: 3,
      tags: ["Update", "Features"],
      description: "We've just rolled out exciting new features to enhance your gaming experience! Check out the improved matchmaking system and new social features.",
      content: (
        <div className="space-y-4">
          <p>We're constantly working to improve your experience on our platform. Today, we're excited to announce several new features that will make your gaming journey even better!</p>
          <h4 className="text-xl font-bold text-white">New Features</h4>
          <ul className="list-disc pl-4 space-y-2">
            <li>Enhanced matchmaking algorithm</li>
            <li>Improved social features</li>
            <li>New achievement system</li>
            <li>Performance optimizations</li>
          </ul>
          <p>These updates are now live! Log in to explore all the new features and improvements.</p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069"
    },
    {
      title: "Community Spotlight: March Champions",
      date: "Mar 13, 2024",
      readTime: 4,
      tags: ["Community", "Awards"],
      description: "Celebrating our top performers and community contributors for the month of March. See who made the biggest impact in our gaming community.",
      content: (
        <div className="space-y-4">
          <p>Every month, we recognize the outstanding members of our community who have made significant contributions to our platform. Here are March's champions!</p>
          <h4 className="text-xl font-bold text-white">Top Performers</h4>
          <ul className="list-disc pl-4 space-y-2">
            <li>Most Valuable Player: Alex "ProGamer" Smith</li>
            <li>Best Community Support: Sarah "Helper" Johnson</li>
            <li>Most Improved Player: Mike "Rising" Brown</li>
          </ul>
          <p>Congratulations to all our champions! Your dedication and contribution make our community stronger.</p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2071"
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