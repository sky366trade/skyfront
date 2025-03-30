import React, { useEffect, useState } from 'react';
import { 
  Wallet, LogOut, Trophy, GamepadIcon, Settings, User,
  Home, Gift, Lock, Newspaper, HelpCircle, Contact,
  ArrowUpCircle, ArrowDownCircle,
  Building2, Menu, X, ChevronLeft, ChevronRight, Star,
  Target, Award, TrendingUp, Clock, CheckCircle, BarChart3,
  Calendar, Mail, Phone, Crown, Sparkles, UserPlus, DollarSign,
  Zap, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SidebarMenuItem = ({ icon: Icon, label, onClick, isActive = false, isCollapsed = false }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all duration-200
      ${isActive 
        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' 
        : 'hover:bg-gray-700/30 text-gray-300 hover:text-white'}`}
    title={isCollapsed ? label : ''}
  >
    <Icon className="h-5 w-5" />
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </motion.button>
);

const TaskbarItem = ({ icon: Icon, label, onClick, isActive = false }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200
      ${isActive
        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
        : 'text-gray-300 hover:text-white hover:bg-gray-700/30'}`}
  >
    <Icon className="h-5 w-5 mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

const MenuSection = ({ title, children, isCollapsed = false }) => (
  <div className="space-y-2">
    {!isCollapsed && (
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
        {title}
      </h3>
    )}
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const TeamProgressBar = ({ icon: Icon, label, value, maxValue, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-700/30 p-4 rounded-xl"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-gray-400">{label}</span>
      </div>
      <span className={`${color} font-semibold`}>
        {value.toLocaleString()} / {maxValue.toLocaleString()}
      </span>
    </div>
    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / maxValue) * 100, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute h-full ${color.replace('text', 'bg')} opacity-75`}
      />
    </div>
  </motion.div>
);

const TeamStatsCard = ({ teamDetails }) => {
  const maxMembers = 100;
  const maxCommission = 10000;
  const maxActivity = 100;
  const currentActivity = teamDetails.teamCount * 5;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-blue-500" />
          Team Performance
        </h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="h-6 w-6 text-blue-500" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <TeamProgressBar 
          icon={UserPlus}
          label="Team Size"
          value={teamDetails.teamCount}
          maxValue={maxMembers}
          color="text-blue-400"
        />
        
        <TeamProgressBar 
          icon={DollarSign}
          label="Commission Progress"
          value={teamDetails.teamWallet}
          maxValue={maxCommission}
          color="text-green-400"
        />
        
        <TeamProgressBar 
          icon={Zap}
          label="Team Activity"
          value={currentActivity}
          maxValue={maxActivity}
          color="text-yellow-400"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700/30 p-4 rounded-xl"
          >
            <div className="text-sm text-gray-400">Total Members</div>
            <div className="text-lg font-bold text-white mt-1">
              {teamDetails.teamCount}
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700/30 p-4 rounded-xl"
          >
            <div className="text-sm text-gray-400">Total Commission</div>
            <div className="text-lg font-bold text-white mt-1">
              ${teamDetails.teamWallet}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TaskCard = ({ task, onComplete }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-3 bg-blue-500/20 rounded-xl"
        >
          <Target className="h-6 w-6 text-blue-500" />
        </motion.div>
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
      </div>
      {task.status === 'completed' ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="h-6 w-6 text-green-500" />
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors"
        >
         Pending Tasks
        </motion.button>
      )}
    </div>
    <p className="text-gray-400 mb-4">{task.type}</p>
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">
        <Clock className="h-4 w-4 inline mr-1" />
        {new Date(task.date).toLocaleDateString()}
      </span>
      <motion.span 
        whileHover={{ scale: 1.1 }}
        className="text-yellow-500 flex items-center"
      >
        <Sparkles className="h-4 w-4 mr-1" />
        Reward: {task.reward}
      </motion.span>
    </div>
  </motion.div>
);

const LevelCard = ({ level, xp, requiredXp, currentWallet }) => {
  const levels = [
    { level: 1, title: "Elite", minWallet: 0 },
    { level: 2, title: "Bronze", minWallet: 500 },
    { level: 3, title: "Silver", minWallet: 1000 },
    { level: 4, title: "Gold", minWallet: 3000 },
    { level: 5, title: "Diamond", minWallet: 5000 },
  ];

  const currentLevel = levels.find(l => currentWallet >= l.minWallet && 
    (levels[l.level] ? currentWallet < levels[l.level].minWallet : true));
  
  const progress = (xp / requiredXp) * 100;
  const nextLevel = levels[currentLevel?.level] || levels[levels.length - 1];
  const walletProgress = Math.min((currentWallet / nextLevel.minWallet) * 100, 100);
  
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="p-3 bg-yellow-500/20 rounded-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trophy className="h-6 w-6 text-yellow-500" />
          </motion.div>
          <div>
            <motion.h3 
              className="text-xl font-bold text-white"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              Level {currentLevel?.level || 1}
            </motion.h3>
            <p className="text-gray-400">{currentLevel?.title || "Rookie Arena"}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Crown className="h-8 w-8 text-yellow-500" />
        </motion.div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Daily XP</span>
            <span className="text-sm text-yellow-500">{xp} / {requiredXp} XP</span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Wallet Progress</span>
            <span className="text-sm text-blue-500">${currentWallet} / ${nextLevel.minWallet}</span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${walletProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700/30 p-3 rounded-xl"
          >
            <div className="text-sm text-gray-400">Current Level</div>
            <div className="text-lg font-bold text-white">{currentLevel?.level || 1}</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700/30 p-3 rounded-xl"
          >
            <div className="text-sm text-gray-400">Next Level</div>
            <div className="text-lg font-bold text-white">{(currentLevel?.level || 1) + 1}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl"
  >
    <div className="flex items-center justify-between">
      <motion.div 
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="p-3 bg-blue-500/20 rounded-xl"
      >
        <Icon className="h-6 w-6 text-blue-500" />
      </motion.div>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`px-2 py-1 rounded-lg text-sm ${
          trend > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
        }`}
      >
        {trend > 0 ? '+' : ''}{trend}%
      </motion.div>
    </div>
    <motion.h3 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-2xl font-bold text-white mt-4"
    >
      {value}
    </motion.h3>
    <p className="text-gray-400">{label}</p>
  </motion.div>
);

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [error, setError] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);

  const url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const fetchDetails = async () => {
    if (!userData?.username) return;
    
    try {
      setError(null);
      const response = await fetch(`${url}/showDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userData.username }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }

      const data = await response.json();
      setTeamDetails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateUserStats = (tasks) => {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    const successRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    const xpPerTask = 1000/tasks.length;
    const currentXp = completedTasks * xpPerTask;
    const level = Math.floor(currentXp / 1000) + 1;
    const requiredXp = 1000;
    
    return {
      level,
      xp: currentXp,
      requiredXp,
      completedTasks,
      successRate: Math.round(successRate),
      totalEarnings: userData?.wallet || 0
    };
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const profileRes = await fetch(`${url}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setUserData(profileData);

        const tasksRes = await fetch(`${url}/view-task`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!tasksRes.ok) throw new Error('Failed to fetch tasks');
        const tasksData = await tasksRes.json();
        setTasks(tasksData.tasks);

      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        if (error.message.includes('Authentication')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, url]);

  useEffect(() => {
    if (userData?.username) {
      fetchDetails();
    }
  }, [userData]);

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`${url}/completeTask/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to complete task');
      
      const data = await response.json();
      
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: 'completed' } : task
      ));
      
      setUserData(prev => ({
        ...prev,
        wallet: data.wallet
      }));

    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleHomeClick = () => navigate("/dashboard");
  const handleBenefitProgramClick = () => navigate("/benefitProgram");
  const handleNewsEvent = () => navigate("/newsevent");
  const handleDepositClick = () => navigate("/deposit");
  const handleContactClick = () => navigate("/contact");
  const handleAboutClick = () => navigate("/about");
  const handleFAQClick = () => navigate("/faq");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 text-red-500 p-4 rounded-xl border border-red-500/20"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  const userStats = calculateUserStats(tasks);
  const joinDate = new Date(userData?.joinDate || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95">
        <nav className="bg-gray-800/90 backdrop-blur-xl border-b border-gray-700 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-cenfter">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <img src="icon-03.png" className="h-13.5 w-15.5 mr-2 " />
                  </div>
                </div>
               
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800/80 px-6 py-2 rounded-xl border border-gray-700/50 flex items-center space-x-4">
                  <span className="text-white font-medium tracking-wide text-lg sm:inline">${userData?.wallet.toFixed(2) || 0}</span>
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg group-hover:bg-blue-500/30 transition-colors duration-300"></div>
                    <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg"></div>
                      <div className="relative z-10">
                        <Wallet className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 hidden sm:flex items-center transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="relative group lg:hidden"
                >
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gray-800/80 p-2 rounded-xl border border-gray-700/50">
                    {isSidebarOpen ? (
                      <X className="h-6 w-6 text-blue-400" />
                    ) : (
                      <Menu className="h-6 w-6 text-blue-400" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 transform lg:transform-none
            ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-gray-800/90 backdrop-blur-xl border-r border-gray-700
            p-4 space-y-6 transition-all duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:min-h-[calc(100vh-4rem)] overflow-y-auto
          `}>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              )}
            </button>

            <MenuSection title="Navigation" isCollapsed={isSidebarCollapsed}>
              <SidebarMenuItem 
                icon={Home} 
                label="Home" 
                isActive={activeMenu === 'home'}
                onClick={handleHomeClick}
                isCollapsed={isSidebarCollapsed}
              />
            </MenuSection>

            <MenuSection title="Money Management" isCollapsed={isSidebarCollapsed}>
              <SidebarMenuItem 
                icon={ArrowUpCircle} 
                label="Deposit" 
                isActive={activeMenu === 'deposit'}
                onClick={() => {
                  handleDepositClick();
                  setActiveMenu('deposit');
                  setIsSidebarOpen(false);
                }}
                isCollapsed={isSidebarCollapsed}
              />
              <SidebarMenuItem 
                icon={ArrowDownCircle} 
                label="Withdrawal" 
                isActive={activeMenu === 'withdrawal'}
                onClick={() => {
                  navigate("/withdrawl")
                  setActiveMenu('withdrawal');
                  setIsSidebarOpen(false);
                }}
                isCollapsed={isSidebarCollapsed}
              />
            </MenuSection>

            <MenuSection title="Benefit Program" isCollapsed={isSidebarCollapsed}>
              <SidebarMenuItem 
                icon={Gift} 
                label="Benefit Program" 
                isActive={activeMenu === 'benefits'}
                onClick={() => {
                  setActiveMenu('benefits');
                  handleBenefitProgramClick();
                  setIsSidebarOpen(false);
                }}
                isCollapsed={isSidebarCollapsed}
              />
            </MenuSection>

            <MenuSection title="Information" isCollapsed={isSidebarCollapsed}>
              <SidebarMenuItem 
                icon={Newspaper} 
                label="News & Events" 
                isActive={activeMenu === 'news'}
                onClick={() => {
                  setActiveMenu('news');
                  setIsSidebarOpen(false);
                  handleNewsEvent();
                }}
                isCollapsed={isSidebarCollapsed}
              />
              <SidebarMenuItem 
                icon={Building2} 
                label="About Us" 
                isActive={activeMenu === 'about'}
                onClick={() => {
                  handleAboutClick();
                  setActiveMenu('about');
                  setIsSidebarOpen(false);
                }}
                isCollapsed={isSidebarCollapsed}
              />
              <SidebarMenuItem 
                icon={HelpCircle} 
                label="FAQ" 
                isActive={activeMenu === 'faq'}
                onClick={() => {
                  handleFAQClick();
                  setActiveMenu('faq');
                  setIsSidebarOpen(false);
                }}
                isCollapsed={isSidebarCollapsed}
              />
              <SidebarMenuItem 
                icon={Contact} 
                label="Contact Us" 
                isActive={activeMenu === 'contact'}
                onClick={() => {
                  handleContactClick();
                  setActiveMenu('contact');
                  setIsSidebarOpen(false);
                }}
                isCollapsed={isSidebarCollapsed}
              />
            </MenuSection>

            <div className="lg:hidden mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-3 rounded-xl border border-red-500/20 flex items-center justify-center transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 p-8 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Section */}
              <div className="space-y-8">
                <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl">
                  <div className="text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center"
                    >
                      <User className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-4 text-2xl font-bold text-white"
                    >
                      {userData?.username}
                    </motion.h2>
                    <p className="text-gray-400">Trader Profile</p>
                  </div>
                  
                  <div className="mt-6">
                    <LevelCard 
                      level={userStats.level}
                      xp={userStats.xp}
                      requiredXp={userStats.requiredXp}
                      currentWallet={userData?.wallet || 0}
                    />
                  </div>

                  <div className="mt-6 space-y-4">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl"
                    >
                      <span className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        Member Since
                      </span>
                      <span className="text-white">{joinDate}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl"
                    >
                      <span className="flex items-center text-gray-300">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </span>
                      <span className="text-white">{userData?.email || 'Not provided'}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl"
                    >
                      <span className="flex items-center text-gray-300">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </span>
                      <span className="text-white">{userData?.phone || 'Not provided'}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl"
                    >
                      <span className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Tasks Completed
                      </span>
                      <span className="text-white">{userStats.completedTasks}</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl"
                    >
                      <span className="flex items-center text-gray-300">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Success Rate
                      </span>
                      <span className="text-white">{userStats.successRate}%</span>
                    </motion.div>
                  </div>
                </div>

                {/* Team Details Section */}
                {teamDetails && (
                  <TeamStatsCard teamDetails={teamDetails} />
                )}
              </div>

              {/* Stats and Tasks Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard 
                    icon={CheckCircle}
                    label="Completed Tasks"
                    value={userStats.completedTasks}
                    trend={12}
                  />
                  <StatCard 
                    icon={Award}
                    label="Success Rate"
                    value={`${userStats.successRate}%`}
                    trend={5}
                  />
                  <StatCard 
                    icon={TrendingUp}
                    label="Total Earnings"
                    value={`$${userStats.totalEarnings.toFixed(2)}`}
                    trend={8}
                  />
                </div>

                <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-500" />
                    Active Tasks
                  </h3>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <TaskCard 
                        key={task._id}
                        task={task}
                        onComplete={handleCompleteTask}
                      />
                    ))}
                    {tasks.length === 0 && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-400 text-center py-4"
                      >
                        No active tasks available
                      </motion.p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-xl border-t border-gray-700 p-2 z-50 lg:hidden">
          <div className="max-w-screen-lg mx-auto flex justify-around items-center">
            <TaskbarItem
              icon={Home}
              label="Home"
              isActive={activeMenu === 'home'}
              onClick={handleHomeClick}
            />
            <TaskbarItem
              icon={ArrowUpCircle}
              label="Deposit"
              isActive={activeMenu === 'deposit'}
              onClick={handleDepositClick}
            />
            <TaskbarItem
              icon={Gift}
              label="Benefits"
              isActive={activeMenu === 'benefits'}
              onClick={handleBenefitProgramClick}
            />
            <TaskbarItem
              icon={Newspaper}
              label="News"
              isActive={activeMenu === 'news'}
              onClick={handleNewsEvent}
            />
            <TaskbarItem
              icon={Contact}
              label="Contact"
              isActive={activeMenu === 'contact'}
              onClick={handleContactClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;