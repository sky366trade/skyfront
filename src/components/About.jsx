import React from 'react';
import { ArrowLeft, Building2, Users, Shield, Target, Award, Rocket, Sparkles, TrendingUp, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-blue-200/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300"
    >
      <Icon className="h-8 w-8 text-white" />
    </motion.div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const StatCard = ({ value, label, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
    className="text-center group"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/30 transition-all duration-300"
    >
      <Icon className="h-6 w-6 text-blue-600" />
    </motion.div>
    <motion.h3
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.2 }}
      className="text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors"
    >
      {value}
    </motion.h3>
    <p className="text-gray-600 font-medium">{label}</p>
  </motion.div>
);

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "State-of-the-art security measures to protect your assets and data with enterprise-grade encryption"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "A thriving community of traders from around the world, fostering collaboration and growth"
    },
    {
      icon: Target,
      title: "Fair Gaming",
      description: "Transparent and fair rewarding mechanics for all players with equal opportunities"
    },
    {
      icon: Award,
      title: "Rewards System",
      description: "Competitive rewards and incentives for active participants with multiple earning opportunities"
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Constantly evolving platform with cutting-edge features and modern technology"
    }
  ];

  const stats = [
    { value: "100K+", label: "Active Players", icon: Users },
    { value: "50+", label: "Countries", icon: Globe },
    { value: "$1M+", label: "Rewards Distributed", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
        />
      </div>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
            className="mb-8 bg-white/90 backdrop-blur-xl p-3 rounded-2xl hover:bg-white transition-all duration-300 flex items-center space-x-2 border border-blue-200/50 shadow-lg text-gray-700 hover:text-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Profile</span>
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/25"
            >
              <Building2 className="h-12 w-12 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              About Sky366Trade
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0" />
              Sky366Trade is revolutionizing the rewarding industry by combining competitive tasks with innovative trading mechanics.
              Our platform provides a secure and engaging environment for players worldwide.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl border border-blue-200/50 shadow-2xl shadow-blue-500/10 mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Heart className="h-8 w-8 text-red-500" />
                  Our Mission
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-blue-500/20 p-4 rounded-2xl"
              >
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-700 mb-10 text-lg leading-relaxed"
            >
              At Sky366Trade, we're committed to creating a revolutionary gaming platform that combines the thrill of competitive gaming
              with innovative trading mechanics. Our mission is to provide a secure, fair, and engaging environment where players
              can compete, trade, and earn rewards while being part of a global community that values excellence and integrity.
            </motion.p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  delay={0.9 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-12 shadow-2xl shadow-blue-500/25"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Experience the future of competitive gaming and trading. Join thousands of players worldwide who trust Sky366Trade.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              Get in Touch
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;