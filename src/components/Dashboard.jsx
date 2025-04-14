import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Trophy,
  Users,
  ArrowLeft,
  Sword,
  Shield,
  Zap,
  Target,
  Crown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
  Wallet,
  Star,
  Copy,
  Share2,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1641932970485-26fe40a9da37?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex space-x-6">
            {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                <span className="text-white font-medium">{value}</span>
                <span className="text-gray-300 text-sm ml-2">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ name, rating, date, comment, avatar }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="min-w-[300px] bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
  >
    <div className="flex items-center mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
      <div className="ml-4">
        <h4 className="text-white font-medium">{name}</h4>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-500" : "text-gray-600"
              }`}
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
          <span className="text-gray-400 text-sm ml-2">{date}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-300">{comment}</p>
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
}) => {
  const navigate = useNavigate();
  const isLocked = currentWallet < minWallet;
  const progress = Math.min((currentWallet / minWallet) * 100, 100);

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.05 }}
      whileTap={{ scale: isLocked ? 1 : 0.95 }}
      className={`relative min-w-[300px] bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border 
        ${
          isActive
            ? "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            : isLocked
            ? "border-gray-700/50 opacity-50"
            : "border-gray-700"
        }`}
    >
      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-full shadow-lg">
        <Crown className="h-4 w-4 text-white" />
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-500/20 p-3 rounded-xl">
          <Icon className="h-8 w-8 text-blue-400" />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-400">Level</span>
          <h3 className="text-2xl font-bold text-white">{level}</h3>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <div className="relative h-2 bg-gray-700 rounded-full mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span className="text-gray-400">Current: ${currentWallet}</span>
        <span className="text-gray-400">Required: ${minWallet}</span>
      </div>

      <button
        disabled={isLocked}
        onClick={() => navigate(`/tasks/${level}`)}
        className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2
          ${
            isLocked
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          } transition-all duration-300`}
      >
        {isLocked ? (
          <>
            <Lock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">Locked</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-white font-medium">Explore Now</span>
          </>
        )}
      </button>
    </motion.div>
  );
};

  const ReferralSection = () => {
    const token=localStorage.getItem("token");
    const navigate = useNavigate();
    const url=import.meta.env.VITE_BACKEND_URL;
    const [username, setUsername] = useState("");
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
    const [copied, setCopied] = useState(false);
    const referralLink = `${window.location.origin}/register/${username}`; // Replace USER123 with actual user referral code

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
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Refer & Earn</h2>
            <p className="text-gray-400">Share with friends and earn rewards together</p>
          </div>
          <div className="bg-blue-500/20 p-4 rounded-xl">
            <Share2 className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-700/40 rounded-xl p-6">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Invite Friends</h3>
            <p className="text-gray-400 text-sm">Share your unique referral link with friends</p>
          </div>
          
          <div className="bg-gray-700/40 rounded-xl p-6">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Friend Signs Up</h3>
            <p className="text-gray-400 text-sm">Your friend creates an account using your link</p>
          </div>

          <div className="bg-gray-700/40 rounded-xl p-6">
            <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Both Rewards</h3>
            <p className="text-gray-400 text-sm">Get 10% of their first deposit</p>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="w-full bg-gray-700/40 border border-gray-600 rounded-xl px-4 py-3 text-white pr-24"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg flex items-center space-x-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

const Dashboard = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWallet, setCurrentWallet] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const scrollContainer = useRef(null);
  const reviewsContainer = useRef(null);

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
      icon: Gamepad2,
      description: "Perfect for beginners. Start your reward journey here!",
    },
    {
      level: 2,
      title: "Bronze",
      minWallet: 500,
      icon: Sword,
      description: "Give mor rewards along with reviews",
    },
    {
      level: 3,
      title: "Silver",
      minWallet: 1000,
      icon: Shield,
      description: "Join the elite players in high-stakes matches.",
    },
    {
      level: 4,
      title: "Gold",
      minWallet: 3000,
      icon: Zap,
      description: "Exclusive rewarding tasks available worldwide.",
    },
    {
      level: 5,
      title: "Diamond",
      minWallet: 5000,
      icon: Crown,
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
      const scrollAmount = 330;
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
      className="min-h-screen bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070')] bg-cover bg-center"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95">
        {/* Wallet Component */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2 border border-white/10">
            <Wallet className="h-6 w-6 text-white/70" />
            <span className="text-white/90 font-medium">
              ${currentWallet.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <div className="mb-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/profile")}
              className="bg-gray-800/60 p-2 rounded-lg hover:bg-gray-700/60 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </motion.button>
          </div>

          {/* Slideshow */}
          <Slideshow />

        

          {/* Level Cards Carousel */}
          <div className="relative mb-12">
            <button
              onClick={() => scroll("left", scrollContainer)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gray-800/80 p-2 rounded-full hover:bg-gray-700/80 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <div
              ref={scrollContainer}
              className="flex space-x-6 overflow-x-hidden scroll-smooth py-4 px-2"
            >
              {levels.map((level) => (
                <LevelCard
                  key={level.level}
                  {...level}
                  currentWallet={currentWallet}
                  isActive={currentWallet >= level.minWallet}
                />
              ))}
            </div>

            <button
              onClick={() => scroll("right", scrollContainer)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gray-800/80 p-2 rounded-full hover:bg-gray-700/80 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
  {/* Referral Section */}
  <ReferralSection />
          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star
                className="h-6 w-6 text-yellow-500 mr-2"
                fill="currentColor"
              />
              Reviews
            </h2>
            <div className="relative">
              <button
                onClick={() => scroll("left", reviewsContainer)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gray-800/80 p-2 rounded-full hover:bg-gray-700/80 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <div
                ref={reviewsContainer}
                className="flex space-x-6 overflow-x-hidden scroll-smooth py-4 px-2"
              >
                {reviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>

              <button
                onClick={() => scroll("right", reviewsContainer)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gray-800/80 p-2 rounded-full hover:bg-gray-700/80 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;