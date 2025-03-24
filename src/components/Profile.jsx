import React, { useEffect, useState } from 'react';
import { 
  Wallet, LogOut, Trophy, GamepadIcon, Settings, User,
  Home, Users, Gift, Lock, Newspaper, HelpCircle, Contact,
  ArrowUpCircle, ArrowDownCircle, History, ShoppingBag,
  Building2, Menu, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SidebarMenuItem = ({ icon: Icon, label, onClick, isActive = false }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
      ${isActive 
        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' 
        : 'hover:bg-gray-700/30 text-gray-300 hover:text-white'}`}
  >
    <Icon className="h-5 w-5" />
    <span className="font-medium">{label}</span>
  </motion.button>
);

const MenuSection = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">{title}</h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Authentication failed');
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Profile Error:', error);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleHomeClick = () => {

    navigate("/dashboard");
  };
const handleBenefitProgramClick=()=>{
    navigate("/benefitProgram");
}
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleNewsEvent=()=>{
    navigate("/newsevent");
  }
  const handleDepositClick = () => {
    navigate("/deposit");
  }
  const handleContactClick = () => {
    navigate("/contact");
  }
  const handleAboutClick = () => {
    navigate("/about");
  }
  const handleFAQClick = () => {
    navigate("/faq");
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95">
        <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <GamepadIcon className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">BeTrade</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800/80 px-6 py-2 rounded-xl border border-gray-700/50 flex items-center space-x-4">
                <span className="text-white font-medium tracking-wide text-lg  sm:inline ">${userData.wallet}</span>
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg group-hover:bg-blue-500/30 transition-colors duration-300"></div>
                    <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg"></div>
                      <div className="relative z-10">
                        <Wallet className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] " />
                      </div>
                    </div>
                  </div>
                
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg border border-red-500/20 hidden sm:flex items-center transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
                <button
                  onClick={toggleSidebar}
                  className="relative group lg:hidden"
                >
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gray-800/80 p-2 rounded-lg border border-gray-700/50">
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
          <div className={`
            fixed lg:static inset-y-0 left-0 transform lg:transform-none
            w-64 bg-gray-800/90 backdrop-blur-2xl border-r border-gray-700
            p-4 space-y-6 transition-all duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:min-h-[calc(100vh-4rem)] overflow-y-auto
          `}>
            <MenuSection title="Navigation">
              <SidebarMenuItem 
                icon={Home} 
                label="Home" 
                isActive={activeMenu === 'home'}
                onClick={handleHomeClick}
              />
            </MenuSection>

            <MenuSection title="Money Management">
              <SidebarMenuItem 
                icon={ArrowUpCircle} 
                label="Deposit" 
                isActive={activeMenu === 'deposit'}
                onClick={() => {
                  handleDepositClick();
                  setActiveMenu('deposit');
                  setIsSidebarOpen(false);
                }}
              />
              <SidebarMenuItem 
                icon={ArrowDownCircle} 
                label="Withdrawal" 
                isActive={activeMenu === 'withdrawal'}
                onClick={() => {
                  setActiveMenu('withdrawal');
                  setIsSidebarOpen(false);
                }}
              />
              <SidebarMenuItem 
                icon={History} 
                label="Transaction History" 
                isActive={activeMenu === 'transactions'}
                onClick={() => {
                  setActiveMenu('transactions');
                  setIsSidebarOpen(false);
                }}
              />
              <SidebarMenuItem 
                icon={ShoppingBag} 
                label="Order History" 
                isActive={activeMenu === 'orders'}
                onClick={() => {
                  setActiveMenu('orders');
                  setIsSidebarOpen(false);
                }}
              />
            </MenuSection>

            <MenuSection title="Benefits & Programs">
              <SidebarMenuItem 
                icon={Users} 
                label="Team Benefits" 
                isActive={activeMenu === 'team'}
                onClick={() => {
                  setActiveMenu('team');
                  setIsSidebarOpen(false);
                }}
              />
              <SidebarMenuItem 
                icon={Gift} 
                label="Benefit Program" 
                isActive={activeMenu === 'benefits'}
                onClick={() => {
                  setActiveMenu('benefits');
                  handleBenefitProgramClick();
                  setIsSidebarOpen(false);
                }}
              />
              <SidebarMenuItem 
                icon={Lock} 
                label="Locking" 
                isActive={activeMenu === 'locking'}
                onClick={() => {
                  setActiveMenu('locking');
                  setIsSidebarOpen(false);
                }}
              />
            </MenuSection>

            <MenuSection title="Information">
              <SidebarMenuItem 
                icon={Newspaper} 
                label="News & Events" 
                isActive={activeMenu === 'news'}
                onClick={() => {
                  setActiveMenu('news');
                  setIsSidebarOpen(false);
                  handleNewsEvent();
                }}
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

          <div className="flex-1 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-white">{userData.username}</h2>
                  <p className="text-gray-400">Player Profile</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                    <span className="text-gray-300">Member Since</span>
                    <span className="text-white">March 2024</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                    <span className="text-gray-300">Games Played</span>
                    <span className="text-white">42</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl">
                    <span className="text-gray-300">Achievements</span>
                    <span className="text-white">12</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Achievements
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-700/30 rounded-xl">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-yellow-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-white font-medium">First Victory</h4>
                        <p className="text-gray-400 text-sm">Won your first match</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-gray-400 text-sm">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 hover:bg-gray-700/40 transition-colors flex items-center">
                    <GamepadIcon className="w-6 h-6 text-blue-500 mr-3" />
                    <span className="text-white font-medium">Play Now</span>
                  </button>
                  <button className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 hover:bg-gray-700/40 transition-colors flex items-center">
                    <Settings className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-white font-medium">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;