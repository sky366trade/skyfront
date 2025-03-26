import React from 'react';
import { ArrowLeft, Building2, Users, Shield, Target, Award, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700"
  >
    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure Platform",
      description: "State-of-the-art security measures to protect your assets and data"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "A thriving community of gamers and traders from around the world"
    },
    {
      icon: Target,
      title: "Fair Gaming",
      description: "Transparent and fair gaming mechanics for all players"
    },
    {
      icon: Award,
      title: "Rewards System",
      description: "Competitive rewards and incentives for active participants"
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Constantly evolving platform with cutting-edge features"
    }
  ];

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
            className="text-center mb-16"
          >
            <Building2 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">About TradeFlyHub</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              TradeFlyHub is revolutionizing the gaming industry by combining competitive gaming with innovative trading mechanics.
              Our platform provides a secure and engaging environment for players worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 mb-6">
              At TradeFlyHub, we're committed to creating a revolutionary gaming platform that combines the thrill of competitive gaming
              with innovative trading mechanics. Our mission is to provide a secure, fair, and engaging environment where players
              can compete, trade, and earn rewards while being part of a global community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-3xl font-bold text-blue-500 mb-2">100K+</h3>
                <p className="text-gray-400">Active Players</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-500 mb-2">50+</h3>
                <p className="text-gray-400">Countries</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-500 mb-2">$1M+</h3>
                <p className="text-gray-400">Rewards Distributed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400">
              Ready to join our community? {" "}
              <button
                onClick={() => navigate('/contact')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Get in touch
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;