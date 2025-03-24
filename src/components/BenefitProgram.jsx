import React from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, TrendingUp, Award, Target, PieChart, User, ArrowDown, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const HierarchyNode = ({ level, percentage, delay, children, isLeft, isRight }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center relative"
  >
    <div className="relative">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
        <div className="text-white text-base sm:text-lg font-bold">{percentage}%</div>
        {children && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.3 }}
              className="absolute w-[2px] h-8 bg-blue-500/30 bottom-[-2rem] left-1/2 transform -translate-x-1/2"
            />
            {isLeft && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.3 }}
                className="absolute w-8 sm:w-16 h-[2px] bg-blue-500/30 bottom-[-2rem] left-full"
              />
            )}
            {isRight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.3 }}
                className="absolute w-8 sm:w-16 h-[2px] bg-blue-500/30 bottom-[-2rem] right-full"
              />
            )}
          </>
        )}
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.3 }}
        className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
      >
        <span className="text-white text-xs font-bold">L{level}</span>
      </motion.div>
    </div>
    {children && (
      <div className="mt-12">
        {children}
      </div>
    )}
  </motion.div>
);

const BenefitCard = ({ title, icon: Icon, children, delay, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-gray-800/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-700 shadow-xl hover:bg-gray-700/40 transition-all duration-300"
  >
    {imageUrl && (
      <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>
    )}
    <div className="flex items-center mb-4">
      <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl mr-3 sm:mr-4">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const CommissionTier = ({ percentage, level, members, deposit, dailyCommission }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/30 rounded-xl mb-4"
  >
    <div className="flex items-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
        <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
      </div>
      <div>
        <h4 className="text-white text-sm sm:text-base font-medium">{level}</h4>
        <p className="text-gray-400 text-xs sm:text-sm">{members} members</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-blue-400 font-bold text-sm sm:text-base">{percentage}%</p>
      <p className="text-gray-400 text-xs sm:text-sm">${dailyCommission}/day</p>
    </div>
  </motion.div>
);

const NetworkVisualization = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative w-full max-w-2xl mx-auto mb-8 sm:mb-16 mt-4 sm:mt-8 overflow-x-auto py-4"
  >
    <div className="flex justify-center min-w-[800px] px-4">
      <HierarchyNode level={1} percentage={16} delay={0.5}>
        <div className="flex gap-16 sm:gap-32">
          <HierarchyNode level={2} percentage={8} delay={1.0} isLeft={true}>
            <div className="flex gap-8 sm:gap-16">
              <HierarchyNode level={3} percentage={4} delay={1.5} />
              <HierarchyNode level={3} percentage={4} delay={1.7} />
            </div>
          </HierarchyNode>
          <HierarchyNode level={2} percentage={8} delay={1.2} isRight={true}>
            <div className="flex gap-8 sm:gap-16">
              <HierarchyNode level={3} percentage={4} delay={1.6} />
              <HierarchyNode level={3} percentage={4} delay={1.8} />
            </div>
          </HierarchyNode>
        </div>
      </HierarchyNode>
    </div>
  </motion.div>
);

const BenefitProgram = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/95 px-4 sm:px-8 py-20 sm:py-8">
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1 
            {...fadeIn}
            className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4"
          >
            Benefit Program
          </motion.h1>
          <motion.p 
            {...fadeIn} 
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Maximize your earnings through our comprehensive benefit program featuring team commissions, community bonuses, and upline rewards.
          </motion.p>
        </div>

        <NetworkVisualization />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-700 shadow-xl mb-8 sm:mb-12"
        >
          <h3 className="text-xl font-bold text-white mb-4">Network Structure</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center space-x-4 bg-gray-700/30 p-3 sm:p-4 rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm sm:text-base">L1</span>
              </div>
              <div>
                <h4 className="text-white text-sm sm:text-base font-medium">First Layer</h4>
                <p className="text-blue-400 text-xs sm:text-sm">16% Commission</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-gray-700/30 p-3 sm:p-4 rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm sm:text-base">L2</span>
              </div>
              <div>
                <h4 className="text-white text-sm sm:text-base font-medium">Second Layer</h4>
                <p className="text-blue-400 text-xs sm:text-sm">8% Commission</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-gray-700/30 p-3 sm:p-4 rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm sm:text-base">L3</span>
              </div>
              <div>
                <h4 className="text-white text-sm sm:text-base font-medium">Third Layer</h4>
                <p className="text-blue-400 text-xs sm:text-sm">4% Commission</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <BenefitCard 
            title="Team Commission" 
            icon={Users} 
            delay={0.3}
            imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
          >
            <div className="space-y-4">
              <CommissionTier
                level="First Layer"
                percentage={16}
                members={20}
                deposit={500}
                dailyCommission={32}
              />
              <CommissionTier
                level="Second Layer"
                percentage={8}
                members={100}
                deposit={500}
                dailyCommission={80}
              />
              <CommissionTier
                level="Third Layer"
                percentage={4}
                members={500}
                deposit={500}
                dailyCommission={200}
              />
            </div>
          </BenefitCard>

          <BenefitCard 
            title="Community Bonus" 
            icon={Target} 
            delay={0.4}
            imageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
          >
            <div className="space-y-4">
              <div className="bg-gray-700/30 p-3 sm:p-4 rounded-xl">
                <h4 className="text-white text-sm sm:text-base font-medium mb-2">Agent Levels</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Universal</span>
                    <span className="text-blue-400">5%</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Elite</span>
                    <span className="text-blue-400">3%</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Special</span>
                    <span className="text-blue-400">2%</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Senior</span>
                    <span className="text-blue-400">1%</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Junior</span>
                    <span className="text-blue-400">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </BenefitCard>

          <BenefitCard 
            title="Upline Bonus" 
            icon={TrendingUp} 
            delay={0.5}
            imageUrl="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070"
          >
            <div className="space-y-4">
              <div className="bg-gray-700/30 p-3 sm:p-4 rounded-xl">
                <h4 className="text-white text-sm sm:text-base font-medium mb-2">Requirements</h4>
                <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                  <li className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-blue-400" />
                    Invite 8 active first layer members
                  </li>
                  <li className="flex items-center">
                    <Gift className="h-4 w-4 mr-2 text-blue-400" />
                    Receive 3% of upline's commission
                  </li>
                </ul>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                *Active downline defined as account with minimum 30 USDT total deposit
              </p>
            </div>
          </BenefitCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-12 bg-gray-800/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-700"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">How to Maximize Your Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-gray-700/30 rounded-xl">
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">Build Your Team</h3>
              <p className="text-sm sm:text-base text-gray-400">Share your unique invitation link and build a strong downline network to maximize commission earnings.</p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-700/30 rounded-xl">
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">Upgrade Your Level</h3>
              <p className="text-sm sm:text-base text-gray-400">Progress through agent levels to unlock higher community bonus percentages.</p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-700/30 rounded-xl">
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">Stay Active</h3>
              <p className="text-sm sm:text-base text-gray-400">Maintain active status by meeting minimum deposit requirements and completing regular tasks.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BenefitProgram;