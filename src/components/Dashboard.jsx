import React, { useState, useEffect } from "react";
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
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
      title: "Epic Victories",
      subtitle: "Join thousands of players in epic battles",
      stats: { rating: "4.9/5", reviews: "10k+", earnings: "$1M+" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070",
      title: "Instant Deposits",
      subtitle: "Quick and secure transactions",
      stats: { deposits: "24/7", speed: "Instant", security: "100%" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070",
      title: "Daily Earnings",
      subtitle: "Turn your skills into rewards",
      stats: { dailyEarnings: "$10k+", players: "50k+", games: "100+" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=2070",
      title: "Fast Withdrawals",
      subtitle: "Get your winnings instantly",
      stats: { processing: "< 1hr", methods: "10+", fee: "0%" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2070",
      title: "Community Reviews",
      subtitle: "Join our trusted gaming community",
      stats: { satisfaction: "98%", support: "24/7", users: "100k+" },
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

const Dashboard = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWallet, setCurrentWallet] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("https://betradebackend.onrender.com/profile", {
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
      title: "Rookie Arena",
      minWallet: 0,
      icon: Gamepad2,
      description: "Perfect for beginners. Start your gaming journey here!",
    },
    {
      level: 2,
      title: "Warrior's Path",
      minWallet: 1000,
      icon: Sword,
      description: "Test your skills against more challenging opponents.",
    },
    {
      level: 3,
      title: "Elite League",
      minWallet: 2500,
      icon: Shield,
      description: "Join the elite players in high-stakes matches.",
    },
    {
      level: 4,
      title: "Master's Domain",
      minWallet: 5000,
      icon: Zap,
      description: "Exclusive matches with the best players worldwide.",
    },
    {
      level: 5,
      title: "Legend's Realm",
      minWallet: 10000,
      icon: Crown,
      description: "The ultimate gaming experience for true legends.",
    },
  ];

  const reviews = [
    {
      name: "Alex Thompson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Best gaming platform I've ever used! The tournaments are incredibly well organized.",
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
        "Great platform for competitive gaming. The ranking system is fair and rewarding.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100",
    },
    {
      name: "Emily Watson",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Love the variety of games and the daily tournaments. Excellent prize pools!",
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

  const scrollContainer = React.useRef(null);
  const reviewsContainer = React.useRef(null);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/profile")}
                className="bg-gray-800/60 p-2 rounded-lg hover:bg-gray-700/60 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </motion.button>
              <div className="bg-gray-800/60 px-6 py-3 rounded-xl flex items-center space-x-3 border border-gray-700/50">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg group-hover:bg-blue-500/30 transition-colors duration-300"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-3 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg"></div>
                    <div className="relative z-10">
                      <Wallet className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] transform -rotate-12" />
                    </div>
                  </div>
                </div>
                <span className="text-white font-medium tracking-wide text-lg">
                  ${currentWallet}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800/60 px-4 py-2 rounded-xl flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">432 Online</span>
              </div>
            </div>
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

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star
                className="h-6 w-6 text-yellow-500 mr-2"
                fill="currentColor"
              />
              Player Reviews
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
