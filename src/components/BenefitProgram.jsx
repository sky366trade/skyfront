import React from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, TrendingUp, Award, Target, PieChart, User, ArrowDown, ChevronLeft, Sparkles, DollarSign } from 'lucide-react';
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
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center relative shadow-lg">
        <div className="text-white text-base sm:text-lg font-bold">{percentage}%</div>
        {children && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.3 }}
              className="absolute w-[2px] h-8 bg-blue-300 bottom-[-2rem] left-1/2 transform -translate-x-1/2"
            />
            {isLeft && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.3 }}
                className="absolute w-8 sm:w-16 h-[2px] bg-blue-300 bottom-[-2rem] left-full"
              />
            )}
            {isRight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.3 }}
                className="absolute w-8 sm:w-16 h-[2px] bg-blue-300 bottom-[-2rem] right-full"
              />
            )}
          </>
        )}
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.3 }}
        className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md"
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
    className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90"
  >
    {imageUrl && (
      <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    )}
    <div className="flex items-center mb-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        <div className="relative p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
      <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const CommissionTier = ({ percentage, level, members, deposit, dailyCommission }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4 border border-blue-100 hover:shadow-md transition-all duration-200"
  >
    <div className="flex items-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-md">
        <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <div>
        <h4 className="text-gray-800 text-sm sm:text-base font-medium">{level}</h4>
        <p className="text-gray-600 text-xs sm:text-sm">{members} members</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-blue-600 font-bold text-sm sm:text-base">{percentage}%</p>
      <p className="text-gray-500 text-xs sm:text-sm">${dailyCommission}/day</p>
    </div>
  </motion.div>
);

const BenefitProgram = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074')] bg-cover bg-center opacity-5"></div>
      
      {/* Floating sparkles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute top-20 left-1/4"
        >
          <TrendingUp className="w-6 h-6 text-blue-300" />
        </motion.div>
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute top-32 right-1/3"
        >
          <Sparkles className="w-8 h-8 text-indigo-300" />
        </motion.div>
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute top-40 left-2/3"
        >
          <DollarSign className="w-5 h-5 text-blue-400" />
        </motion.div>
        <motion.div
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          className="absolute top-60 right-1/4"
        >
          <Users className="w-6 h-6 text-purple-400" />
        </motion.div>
      </div>

      <div className="relative px-4 sm:px-8 py-20 sm:py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/profile')}
          className="fixed top-4 sm:top-8 left-4 sm:left-8 bg-white/80 backdrop-blur-xl p-2 sm:p-3 rounded-xl border border-blue-200 hover:bg-white/90 transition-all duration-300 flex items-center space-x-2 text-gray-800 z-50 shadow-lg"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          <span className="text-sm sm:text-base font-medium">Back to Profile</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-6 shadow-xl"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              {...fadeIn}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4"
            >
              Benefit Program
            </motion.h1>
            <motion.p 
              {...fadeIn} 
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Maximize your earnings through our comprehensive benefit program featuring team commissions, community bonuses, and upline rewards.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-blue-200 shadow-xl mb-8 sm:mb-12"
          >
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mr-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Network Structure</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm sm:text-base">L1</span>
                </div>
                <div>
                  <h4 className="text-gray-800 text-sm sm:text-base font-medium">First Layer</h4>
                  <p className="text-blue-600 text-xs sm:text-sm font-semibold">16% Commission</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm sm:text-base">L2</span>
                </div>
                <div>
                  <h4 className="text-gray-800 text-sm sm:text-base font-medium">Second Layer</h4>
                  <p className="text-blue-600 text-xs sm:text-sm font-semibold">8% Commission</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm sm:text-base">L3</span>
                </div>
                <div>
                  <h4 className="text-gray-800 text-sm sm:text-base font-medium">Third Layer</h4>
                  <p className="text-blue-600 text-xs sm:text-sm font-semibold">4% Commission</p>
                </div>
              </motion.div>
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
                  percentage={10}
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
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                  <h4 className="text-gray-800 text-sm sm:text-base font-medium mb-3">Agent Levels</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Universal</span>
                      <span className="text-blue-600 font-semibold">5%</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Elite</span>
                      <span className="text-blue-600 font-semibold">3%</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Special</span>
                      <span className="text-blue-600 font-semibold">2%</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Senior</span>
                      <span className="text-blue-600 font-semibold">1%</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Junior</span>
                      <span className="text-gray-500 font-semibold">0%</span>
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
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                  <h4 className="text-gray-800 text-sm sm:text-base font-medium mb-3">Requirements</h4>
                  <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-blue-500" />
                      Invite 8 active first layer members
                    </li>
                    <li className="flex items-center">
                      <Gift className="h-4 w-4 mr-2 text-blue-500" />
                      Receive 3% of upline's commission
                    </li>
                  </ul>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 bg-blue-50 p-2 rounded-lg">
                  *Active downline defined as account with minimum 30 USDT total deposit
                </p>
              </div>
            </BenefitCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-12 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-blue-200 shadow-xl"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mr-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">How to Maximize Your Benefits</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">Build Your Team</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Share your unique invitation link and build a strong downline network to maximize commission earnings.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">Upgrade Your Level</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Progress through agent levels to unlock higher community bonus percentages.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">Stay Active</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Maintain active status by meeting minimum deposit requirements and completing regular tasks.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative bottom element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-2 mt-8"
          >
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </motion.div>

          {/* Bottom inspirational text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-center text-gray-500 text-sm max-w-md mx-auto"
          >
            "Building connections and growing networks, one referral at a time"
          </motion.p>
        </motion.div>
        
      </div>
      
    </div>
    
  );
};

export default BenefitProgram;