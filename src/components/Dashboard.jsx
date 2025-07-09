import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Users, ArrowLeft, Sword, Shield, Zap, Target, Crown, ChevronLeft, ChevronRight, Lock, Sparkles, Wallet, Star, Copy, Share2, Check, FlipVertical as EllipsisVertical, ActivityIcon, GlobeLock, Diamond, LucideXSquare, Highlighter, LeafyGreenIcon, GridIcon, GalleryHorizontal, SunMoon, TrendingUp, Gift, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Instant Deposits",
      subtitle: "Quick and secure transactions",
      stats: { deposits: "24/7", speed: "Instant", security: "100%" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070",
      title: "Daily Earnings",
      subtitle: "Turn your skills into rewards",
      stats: { dailyEarnings: "$10k+" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1641932970485-26fe40a9da37?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Fast Withdrawals",
      subtitle: "Get your winnings instantly",
      stats: { processing: "< 1hr", fee: "0%" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2070",
      title: "Community Reviews",
      subtitle: "Join our trusted review community",
      stats: { satisfaction: "98%", support: "24/7" },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-600/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-2 drop-shadow-lg"
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-100 mb-4 drop-shadow-md"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex space-x-6"
          >
            {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30"
              >
                <span className="text-white font-semibold">{value}</span>
                <span className="text-blue-100 text-sm ml-2 capitalize">{key}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/60 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ name, rating, date, comment, avatar }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="min-w-[300px] bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full border-2 border-blue-200"
      />
      <div className="ml-4">
        <h4 className="text-gray-900 font-semibold">{name}</h4>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill={i < rating ? "currentColor" : "none"}
              />
            </motion.div>
          ))}
          <span className="text-gray-500 text-sm ml-2">{date}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-700 leading-relaxed">{comment}</p>
  </motion.div>
);

const LevelCard = ({
  level,
  title,
  minWallet,
  currentWallet,
  icon: Icon,
  isActive,
  description,
  member,
  teamCount,
}) => {
  const navigate = useNavigate();
  const isLocked = !isActive;
  const progress = Math.min((currentWallet / minWallet) * 100, 100);
  const progressTeam = Math.min((teamCount / member) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isLocked ? 1 : 1.05, y: isLocked ? 0 : -10 }}
      whileTap={{ scale: isLocked ? 1 : 0.95 }}
      className={`relative min-w-[320px] bg-white/90 backdrop-blur-xl p-6 rounded-3xl border-2 transition-all duration-300
        ${
          isActive
            ? "border-blue-400 shadow-2xl shadow-blue-500/25 bg-gradient-to-br from-blue-50 to-indigo-50"
            : isLocked
            ? "border-gray-200 opacity-60"
            : "border-gray-200 hover:border-blue-300 hover:shadow-xl"
        }`}
    >
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg"
        >
          <Crown className="h-4 w-4 text-white" />
        </motion.div>
      )}

      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 5 }}
          className={`p-3 rounded-2xl ${
            isActive ? "bg-blue-500/20" : "bg-gray-100"
          }`}
        >
          <Icon className={`h-8 w-8 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
        </motion.div>
        <div className="text-right">
          <span className="text-sm text-gray-500 font-medium">Level</span>
          <h3 className={`text-3xl font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`}>
            {level}
          </h3>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{description}</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Wallet Progress</span>
            <span className="text-xs text-gray-500">{progress.toFixed(0)}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs mt-1 font-mono">
            <span className="text-gray-600">
              ${parseFloat(currentWallet).toFixed(2)}
            </span>
            <span className="text-gray-600">${minWallet}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Team Members</span>
            <span className="text-xs text-gray-500">{progressTeam.toFixed(0)}%</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressTeam}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs mt-1 font-mono">
            <span className="text-gray-600">{teamCount}</span>
            <span className="text-gray-600">{member}</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: isLocked ? 1 : 1.02 }}
        whileTap={{ scale: isLocked ? 1 : 0.98 }}
        disabled={isLocked}
        onClick={() => navigate(`/tasks/${level}`)}
        className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 mt-6 font-semibold transition-all duration-300
          ${
            isLocked
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
          }`}
      >
        {isLocked ? (
          <>
            <Lock className="h-4 w-4" />
            <span>Locked</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span>Explore Now</span>
            <TrendingUp className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

const ReferralSection = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${url}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Authentication failed");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Profile Error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  const referralLink = `${window.location.origin}/register/${username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl border border-blue-200/50 p-8 mb-12 shadow-xl"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Gift className="h-8 w-8 text-blue-600" />
            Refer & Earn
          </h2>
          <p className="text-gray-600">
            Share with friends and earn rewards together
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="bg-blue-500/20 p-4 rounded-2xl"
        >
          <Share2 className="h-8 w-8 text-blue-600" />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: Users,
            title: "Invite Friends",
            description: "Share your unique referral link with friends",
            color: "green",
          },
          {
            icon: Trophy,
            title: "Friend Signs Up",
            description: "Your friend creates an account using your link",
            color: "purple",
          },
          {
            icon: Wallet,
            title: "Both Rewards",
            description: "Get 10% of their first deposit",
            color: "yellow",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${item.color}-500/20`}
            >
              <item.icon className={`h-6 w-6 text-${item.color}-600`} />
            </motion.div>
            <h3 className="text-gray-900 font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="copied"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWallet, setCurrentWallet] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const scrollContainer = useRef(null);
  const reviewsContainer = useRef(null);
  const [teamCount, setteamCount] = useState(0);
  const [teamWallet, setTeamWallet] = useState(0);
  const [userData, setUserData] = useState(null);
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
  }, []);

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
        let total = 0;

        ["level1", "level2", "level3", "level4", "level5", "level6"].forEach(
          (level) => {
            total += data.teams[level].length;
          }
        );

        setteamCount(total);
      } catch (error) {
        console.error("Error fetching total members:", error);
      }
    };

    fetchTotalMembers();
  }, [userData]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${url}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Authentication failed");
        return res.json();
      })
      .then((data) => {
        setCurrentWallet(data.wallet);
      })
      .catch((error) => {
        console.error("Profile Error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  const levels = [
    {
      level: 1,
      title: "Elite",
      minWallet: 0,
      member: 0,
      icon: ActivityIcon,
      description: "Perfect for beginners. Start your reward journey here!",
    },
    {
      level: 2,
      title: "Bronze",
      minWallet: 500,
      member: 6,
      icon: Sword,
      description: "Give more rewards along with reviews",
    },
    {
      level: 3,
      title: "Silver",
      minWallet: 1000,
      member: 20,
      icon: Shield,
      description: "Join the elite players in high-stakes matches.",
    },
    {
      level: 4,
      title: "Gold",
      minWallet: 2000,
      member: 60,
      icon: GlobeLock,
      description: "Exclusive rewarding tasks available worldwide.",
    },
    {
      level: 5,
      title: "Platinum",
      minWallet: 3000,
      member: 100,
      icon: Diamond,
      description: "The ultimate rewards experience and get true money.",
    },
    {
      level: 6,
      title: "Diamond",
      minWallet: 4000,
      member: 500,
      icon: Highlighter,
      description: "The ultimate rewards experience and get true money.",
    },
    {
      level: 7,
      title: "Emerald",
      minWallet: 5000,
      member: 2000,
      icon: LeafyGreenIcon,
      description: "The ultimate rewards experience and get true money.",
    },
  ];

  const reviews = [
    {
      name: "Alex Thompson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Best rewarding platform I've ever used! The daily tasks are incredibly well organized.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
    },
    {
      name: "Sarah Chen",
      rating: 5,
      date: "1 week ago",
      comment:
        "Amazing community and fantastic support. Withdrawals are super fast!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
    },
    {
      name: "Michael Rodriguez",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Great platform for daily earning. The ranking system is fair and rewarding.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100",
    },
    {
      name: "Emily Watson",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Love the variety of tasks and the daily rewards. Excellent prize pools!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    },
    {
      name: "David Kim",
      rating: 5,
      date: "1 month ago",
      comment:
        "Professional setup and great earnings potential. Highly recommended!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    },
  ];

  const scroll = (direction, container) => {
    if (container.current) {
      const scrollAmount = 350;
      container.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 relative overflow-hidden"
    >
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
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"
        />
      </div>

      {/* Wallet Component */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center space-x-3 border border-blue-200/50 shadow-lg">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-blue-500/20 rounded-xl"
          >
            <Wallet className="h-5 w-5 text-blue-600" />
          </motion.div>
          <span className="text-gray-900 font-semibold text-lg">
            ${currentWallet.toLocaleString()}
          </span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="bg-white/90 backdrop-blur-xl p-3 rounded-2xl hover:bg-white transition-all duration-300 flex items-center space-x-2 border border-blue-200/50 shadow-lg"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
            <span className="text-gray-700 font-medium">Back to Profile</span>
          </motion.button>
        </motion.div>

        {/* Slideshow */}
        <Slideshow />

        {/* Level Cards Carousel */}
        <div className="relative mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3"
          >
            <Crown className="h-8 w-8 text-blue-600" />
            Choose Your Level
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left", scrollContainer)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-xl p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg border border-blue-200/50"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </motion.button>

          <div
            ref={scrollContainer}
            className="flex space-x-6 overflow-x-hidden scroll-smooth py-4 px-2"
          >
            {levels.map((l, index) => (
              <LevelCard
                key={l.level}
                {...l}
                teamCount={teamCount}
                currentWallet={currentWallet}
                member={levels[index + 1] ? levels[index + 1].member : l.member}
                isActive={currentWallet >= l.minWallet && teamCount >= l.member}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right", scrollContainer)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-xl p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg border border-blue-200/50"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </motion.button>
        </div>

        {/* Referral Section */}
        <ReferralSection />

        {/* Reviews Section */}
        <div className="mt-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3"
          >
            <Heart className="h-8 w-8 text-red-500" />
            What Our Users Say
          </motion.h2>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left", reviewsContainer)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-xl p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg border border-blue-200/50"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </motion.button>

            <div
              ref={reviewsContainer}
              className="flex space-x-6 overflow-x-hidden scroll-smooth py-4 px-2"
            >
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right", reviewsContainer)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-xl p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg border border-blue-200/50"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;