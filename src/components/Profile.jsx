import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wallet,
  LogOut,
  Menu,
  X,
  User,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  TrendingUp,
  Award,
  Target,
  Clock,
  Sparkles,
  Home,
  ArrowUpCircle,
  ArrowDownCircle,
  Gift,
  Newspaper,
  Building2,
  HelpCircle,
  Contact,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Crown,
  Shield,
  UserPlus,
  DollarSign,
  Zap,
  Users,
  Star,
} from "lucide-react";

// Sidebar Menu Item Component
const SidebarMenuItem = ({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  isCollapsed = false,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02, x: 4 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center ${
      isCollapsed ? "justify-center" : "space-x-3"
    } px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden
      ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-blue-600 hover:shadow-md"
      }`}
    title={isCollapsed ? label : ""}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Icon className="h-5 w-5 relative z-10" />
    {!isCollapsed && <span className="font-medium relative z-10">{label}</span>}
  </motion.button>
);

// Taskbar Item Component for Mobile
const TaskbarItem = ({ icon: Icon, label, onClick, isActive = false }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          : "text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
      }`}
  >
    <Icon className="h-5 w-5 mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

// Menu Section Component
const MenuSection = ({ title, children, isCollapsed = false }) => (
  <div className="space-y-2">
    {!isCollapsed && (
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-3">
        {title}
      </h3>
    )}
    <div className="space-y-2">{children}</div>
  </div>
);

// Progress Bar Component
const TeamProgressBar = ({ icon: Icon, label, value, maxValue, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-xl bg-gradient-to-r ${color.replace('text', 'from')}-500 ${color.replace('text', 'to')}-600`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <span className={`${color} font-bold text-lg`}>
        {value.toLocaleString()} / {maxValue.toLocaleString()}
      </span>
    </div>
    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / maxValue) * 100, 100)}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`absolute h-full bg-gradient-to-r ${color.replace('text', 'from')}-500 ${color.replace('text', 'to')}-600 shadow-sm`}
      />
    </div>
  </motion.div>
);

// Team Stats Card Component
const TeamStatsCard = ({ teamDetails }) => {
  const maxMembers = 100;
  const maxCommission = 10000;
  const maxActivity = 100;
  const currentActivity = teamDetails.teamCount * 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mr-3 shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          Team Performance
        </h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="h-8 w-8 text-blue-500" />
        </motion.div>
      </div>

      <div className="space-y-6 relative z-10">
        <TeamProgressBar
          icon={UserPlus}
          label="Team Size"
          value={teamDetails.teamCount}
          maxValue={maxMembers}
          color="text-blue"
        />

        <TeamProgressBar
          icon={DollarSign}
          label="Commission Progress"
          value={teamDetails.teamWallet}
          maxValue={maxCommission}
          color="text-green"
        />

        <TeamProgressBar
          icon={Zap}
          label="Team Activity"
          value={currentActivity}
          maxValue={maxActivity}
          color="text-yellow"
        />

        <div className="grid grid-cols-2 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-lg"
          >
            <div className="text-sm text-blue-600 font-medium">Total Members</div>
            <div className="text-3xl font-bold text-blue-900 mt-2">
              {teamDetails.teamCount}
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-lg"
          >
            <div className="text-sm text-green-600 font-medium">Total Commission</div>
            <div className="text-3xl font-bold text-green-900 mt-2">
              ${teamDetails.teamWallet}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center space-x-4">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
        <User className="h-7 w-7 text-white" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900">{member.username}</h4>
        <p className="text-gray-600 text-sm">{member.email}</p>
      </div>
    </div>
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-600 font-medium">Wallet Balance</p>
        <p className="text-xl font-bold text-gray-900 mt-1">
          ${member.wallet.toFixed(2)}
        </p>
      </div>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-600 font-medium">Join Date</p>
        <p className="text-sm text-gray-900 font-semibold mt-1">
          {new Date(member.joinDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  </motion.div>
);

// Team Members Section Component
const TeamMembersSection = ({ teamMembers }) => {
  const levels = [1, 2, 3, 4, 5, 6];
  const [currentLevel, setCurrentLevel] = useState(1);

  const levelKey = `level${currentLevel}`;
  const members = teamMembers[levelKey] || [];

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-lg">
            <Users className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full shadow-lg">
          <span className="text-white font-bold">
            Level 0{currentLevel}
          </span>
        </div>
      </div>

      {/* Level Buttons */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {levels.map((level) => (
          <motion.button
            key={level}
            onClick={() => setCurrentLevel(level)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap shadow-lg ${
              currentLevel === level
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25"
                : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            Level 0{level}
          </motion.button>
        ))}
      </div>

      {/* Team Members of selected level */}
      <div className="space-y-6">
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
        {members.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No team members found for this level.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />
    
    <div className="flex items-center justify-between relative z-10">
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg"
      >
        <Icon className="h-7 w-7 text-white" />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`px-3 py-2 rounded-xl text-sm font-bold shadow-lg ${
          trend > 0
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
        }`}
      >
        {trend > 0 ? "+" : ""}
        {trend}%
      </motion.div>
    </div>
    <motion.h3
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-3xl font-bold text-gray-900 mt-6 relative z-10"
    >
      {value}
    </motion.h3>
    <p className="text-gray-600 font-medium relative z-10">{label}</p>
  </motion.div>
);

// Level Card Component
const LevelCard = ({ xp, requiredXp, currentWallet }) => {
  const [teamWallet, setTeamWallet] = useState(0);
  const [userData, setUserData] = useState(null);
  const [teamCount, setTeamsCount] = useState(0);

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const profileRes = await fetch(`${url}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      setUserData(profileData);
    };
    fetchUserData();
  }, [url]);

  useEffect(() => {
    if (!userData) return;
    const fetchTotalMembers = async () => {
      try {
        const teamsDetails = await fetch(`${url}/total-teams-details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userData.username }),
        });

        if (!teamsDetails.ok) {
          const text = await teamsDetails.text();
          throw new Error(
            `Server responded with status ${teamsDetails.status}: ${text}`
          );
        }

        const data = await teamsDetails.json();
        let totalMember = 0;

        ["level1", "level2", "level3", "level4", "level5", "level6"].forEach(
          (level) => {
            totalMember += data.teams[level].length;
          }
        );

        setTeamsCount(totalMember);
       
      } catch (error) {
        console.error("Error fetching total members:", error);
      }
    };

    fetchTotalMembers();
  }, [userData, url]);

  const levels = [
    { level: 1, title: "Elite", minWallet: 0, member: 0 },
    { level: 2, title: "Bronze", minWallet: 500, member: 6 },
    { level: 3, title: "Silver", minWallet: 1000, member: 20 },
    { level: 4, title: "Gold", minWallet: 2000, member: 60 },
    { level: 5, title: "Platinum", minWallet: 3000, member: 100 },
    { level: 6, title: "Diamond", minWallet: 4000, member: 500 },
    { level: 7, title: "Emerald", minWallet: 5000, member: 2000 },
  ];

  const currentLevel = levels.findLast(
    (l) => l.minWallet <= currentWallet && teamCount >= l.member
  );

  const progress = (xp / requiredXp) * 100;
  const nextLevel = levels[currentLevel?.level] || levels[levels.length - 1];
  const walletProgress = Math.min(
    (currentWallet / nextLevel.minWallet) * 100,
    100
  );
  const memberProgress = Math.min((teamCount / nextLevel.member) * 100, 100);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full -translate-y-16 translate-x-16" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          <motion.div
            className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trophy className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <motion.h3
              className="text-2xl font-bold text-gray-900"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              Level {currentLevel?.level}
            </motion.h3>
            <p className="text-gray-600 font-medium">
              {currentLevel?.title || "Rookie Arena"}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Crown className="h-10 w-10 text-yellow-500" />
        </motion.div>
      </div>

      <div className="space-y-6 relative z-10">
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-900 font-semibold">Daily XP</span>
            <span className="text-sm text-yellow-600 font-bold">
              {xp} / {requiredXp} XP
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-900 font-semibold">Wallet Progress</span>
            <span className="text-sm text-blue-600 font-bold">
              ${currentWallet.toFixed(2)} / ${nextLevel.minWallet}
            </span>
          </div>

          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${walletProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm text-gray-900 font-semibold">Member Progress</span>
            <span className="text-sm text-blue-600 font-bold">
              {teamCount} / {nextLevel.member}
            </span>
          </div>

          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${memberProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200 shadow-lg"
          >
            <div className="text-sm text-blue-600 font-medium">Current Level</div>
            <div className="text-2xl font-bold text-blue-900 mt-1">
              {currentLevel?.level || 1}
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200 shadow-lg"
          >
            <div className="text-sm text-green-600 font-medium">Next Level</div>
            <div className="text-2xl font-bold text-green-900 mt-1">
              {(currentLevel?.level || 1) + 1}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Sidebar Component
const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  activeMenu,
  setActiveMenu,
  handleLogout,
}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => navigate("/dashboard");
  const handleBenefitProgramClick = () => navigate("/benefitProgram");
  const handleNewsEvent = () => navigate("/newsevent");
  const handleDepositClick = () => navigate("/deposit");
  const handleContactClick = () => navigate("/contact");
  const handleAboutClick = () => navigate("/about");
  const handleFAQClick = () => navigate("/faq");

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 transform lg:transform-none
          ${
            isSidebarCollapsed ? "w-20" : "w-72"
          } bg-white/95 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl
          p-6 space-y-8 transition-all duration-300 ease-in-out z-40
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          lg:min-h-[calc(100vh-4rem)] overflow-y-auto
        `}
      >
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:flex items-center justify-center w-full p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>

        <MenuSection title="Navigation" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItem
            icon={Home}
            label="Home"
            isActive={activeMenu === "home"}
            onClick={handleHomeClick}
            isCollapsed={isSidebarCollapsed}
          />
        </MenuSection>

        <MenuSection title="Money Management" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItem
            icon={ArrowUpCircle}
            label="Deposit"
            isActive={activeMenu === "deposit"}
            onClick={() => {
              handleDepositClick();
              setActiveMenu("deposit");
              setIsSidebarOpen(false);
            }}
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarMenuItem
            icon={ArrowDownCircle}
            label="Withdrawal"
            isActive={activeMenu === "withdrawal"}
            onClick={() => {
              navigate("/withdrawal");
              setActiveMenu("withdrawal");
              setIsSidebarOpen(false);
            }}
            isCollapsed={isSidebarCollapsed}
          />
        </MenuSection>

        <MenuSection title="Benefit Program" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItem
            icon={Gift}
            label="Benefit Program"
            isActive={activeMenu === "benefits"}
            onClick={() => {
              setActiveMenu("benefits");
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
            isActive={activeMenu === "news"}
            onClick={() => {
              setActiveMenu("news");
              setIsSidebarOpen(false);
              handleNewsEvent();
            }}
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarMenuItem
            icon={Building2}
            label="About Us"
            isActive={activeMenu === "about"}
            onClick={() => {
              handleAboutClick();
              setActiveMenu("about");
              setIsSidebarOpen(false);
            }}
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarMenuItem
            icon={HelpCircle}
            label="FAQ"
            isActive={activeMenu === "faq"}
            onClick={() => {
              handleFAQClick();
              setActiveMenu("faq");
              setIsSidebarOpen(false);
            }}
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarMenuItem
            icon={Contact}
            label="Contact Us"
            isActive={activeMenu === "contact"}
            onClick={() => {
              handleContactClick();
              setActiveMenu("contact");
              setIsSidebarOpen(false);
            }}
            isCollapsed={isSidebarCollapsed}
          />
        </MenuSection>

        <div className="lg:hidden mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg font-medium"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 p-4 z-50 lg:hidden shadow-2xl">
        <div className="max-w-screen-lg mx-auto flex justify-around items-center">
          <TaskbarItem
            icon={Home}
            label="Home"
            isActive={activeMenu === "home"}
            onClick={handleHomeClick}
          />
          <TaskbarItem
            icon={ArrowUpCircle}
            label="Deposit"
            isActive={activeMenu === "deposit"}
            onClick={handleDepositClick}
          />
          <TaskbarItem
            icon={Gift}
            label="Benefits"
            isActive={activeMenu === "benefits"}
            onClick={handleBenefitProgramClick}
          />
          <TaskbarItem
            icon={Newspaper}
            label="News"
            isActive={activeMenu === "news"}
            onClick={handleNewsEvent}
          />
          <TaskbarItem
            icon={Contact}
            label="Contact"
            isActive={activeMenu === "contact"}
            onClick={handleContactClick}
          />
        </div>
      </div>
    </>
  );
};

// Main Profile Component
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [error, setError] = useState(null);
  const [teamDetails, setTeamDetails] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
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
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const totalTasks = tasks.length;
    const successRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const xpPerTask = 1000 / (tasks.length || 1);
    const currentXp = completedTasks * xpPerTask;
    const level = Math.floor(currentXp / 1000) + 1;
    const requiredXp = 1000;

    return {
      level,
      xp: currentXp,
      requiredXp,
      completedTasks,
      successRate: Math.round(successRate),
      totalEarnings: userData?.wallet || 0,
    };
  };

  useEffect(() => {
    if (!userData) return;
    const fetchTotalMembers = async () => {
      try {
        const teamsDetails = await fetch(`${url}/total-teams-details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userData.username }),
        });

        if (!teamsDetails.ok) {
          const text = await teamsDetails.text();
          throw new Error(
            `Server responded with status ${teamsDetails.status}: ${text}`
          );
        }

        const data = await teamsDetails.json();
        setTeamMembers(data.teams);
      } catch (error) {
        console.error("Error fetching total members:", error);
      }
    };

    fetchTotalMembers();
  }, [userData, url]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const profileRes = await fetch(`${url}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        const profileData = await profileRes.json();
        setUserData(profileData);

        const tasksRes = await fetch(`${url}/view-task`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!tasksRes.ok) throw new Error("Failed to fetch tasks");
        const tasksData = await tasksRes.json();
        setTasks(tasksData.tasks);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        if (error.message.includes("Authentication")) {
          localStorage.removeItem("token");
          navigate("/login");
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

      if (!response.ok) throw new Error("Failed to complete task");

      const data = await response.json();

      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: "completed" } : task
        )
      );

      setUserData((prev) => ({
        ...prev,
        wallet: data.wallet,
      }));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent shadow-lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200 shadow-lg"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  const userStats = calculateUserStats(tasks);
  const joinDate = new Date(
    userData?.joinDate || Date.now()
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="min-h-screen">
        <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-gray-900 font-bold text-3xl">
                    Sky<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">366</span>Trade
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl border border-gray-200/50  flex items-center space-x-4">
                  <span className="text-gray-900 font-bold tracking-wide text-xl sm:inline">
                    ${userData?.wallet.toFixed(2) || 0}
                  </span>
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Wallet className=" text-white" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl hidden sm:flex items-center transition-all duration-300 shadow-lg font-medium"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="relative group lg:hidden"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl p-3 rounded-2xl border border-gray-200/50 shadow-lg">
                    {isSidebarOpen ? (
                      <X className="h-7 w-7 text-blue-600" />
                    ) : (
                      <Menu className="h-7 w-7 text-blue-600" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            handleLogout={handleLogout}
          />

          {/* Main Content */}
          <div className="flex-1 p-6 md:p-10 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Profile Section */}
              <div className="space-y-8 md:space-y-10">
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
                  
                  <div className="text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl"
                    >
                      <User className="w-12 h-12 md:w-14 md:h-14 text-white" />
                    </motion.div>
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-6 text-2xl md:text-3xl font-bold text-gray-900"
                    >
                      {userData?.username}
                    </motion.h2>
                    <p className="text-gray-600 font-medium text-lg">Trader Profile</p>
                  </div>

                  <div className="mt-8 relative z-10">
                    <LevelCard
                      level={userStats.level}
                      xp={userStats.xp}
                      requiredXp={userStats.requiredXp}
                      currentWallet={userData?.wallet || 0}
                    />
                  </div>

                  <div className="mt-8 space-y-4 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm"
                    >
                      <span className="flex items-center text-gray-700 text-sm md:text-base font-medium">
                        <Calendar className="w-5 h-5 mr-3 flex-shrink-0 text-blue-500" />
                        <span className="truncate">Member Since</span>
                      </span>
                      <span className="text-gray-900 text-sm md:text-base ml-2 font-semibold">
                        {joinDate}
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm"
                    >
                      <span className="flex items-center text-gray-700 text-sm md:text-base font-medium">
                        <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-blue-500" />
                        <span className="truncate">Email</span>
                      </span>
                      <span className="text-gray-900 text-sm md:text-base ml-2 truncate max-w-[150px] font-semibold">
                        {userData?.email || "Not provided"}
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm"
                    >
                      <span className="flex items-center text-gray-700 text-sm md:text-base font-medium">
                        <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-blue-500" />
                        <span className="truncate">Phone</span>
                      </span>
                      <span className="text-gray-900 text-sm md:text-base ml-2 font-semibold">
                        {userData?.phone || "Not provided"}
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm"
                    >
                      <span className="flex items-center text-gray-700 text-sm md:text-base font-medium">
                        <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 text-green-500" />
                        <span className="truncate">Tasks Completed</span>
                      </span>
                      <span className="text-gray-900 text-sm md:text-base ml-2 font-semibold">
                        {userStats.completedTasks}
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm"
                    >
                      <span className="flex items-center text-gray-700 text-sm md:text-base font-medium">
                        <TrendingUp className="w-5 h-5 mr-3 flex-shrink-0 text-green-500" />
                        <span className="truncate">Success Rate</span>
                      </span>
                      <span className="text-gray-900 text-sm md:text-base ml-2 font-semibold">
                        {userStats.successRate}%
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Stats and Tasks Section */}
              <div className="lg:col-span-2 space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                <TeamMembersSection teamMembers={teamMembers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;