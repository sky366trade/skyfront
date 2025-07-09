import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Circle,
  ArrowLeft,
  Trophy,
  Star,
  Clock,
  DollarSign,
  Send,
  Sparkles,
  AlertCircle,
  Target,
  Gift,
  TrendingUp,
  Zap,
  Award,
  Shield
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TasksPage = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { level } = useParams();
  const [progress, setProgress] = useState(0);
  const [currentWallet, setCurrentWallet] = useState(500);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWalletAlert, setShowWalletAlert] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const [tasksResponse, userResponse] = await Promise.all([
          fetch(`${url}/view-task`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${url}/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!tasksResponse.ok || !userResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const tasksData = await tasksResponse.json();
        const userData = await userResponse.json();

        setTasks(tasksData.tasks);
        setCurrentWallet(userData.wallet);

        const completed = tasks
          .filter((task) => task.status === "completed")
          .map((task) => task._id);
        setCompletedTasks(completed);

        const progressPercentage = (completed.length / tasks.length) * 100;
        setProgress(progressPercentage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTasks();
  }, [progress, token, tasks]);

  const handleTaskClick = (task) => {
    if (currentWallet < 100) {
      setShowWalletAlert(true);
      setTimeout(() => setShowWalletAlert(false), 3000);
      return;
    }

    if (!completedTasks.includes(task._id) && task.status !== "completed") {
      setCurrentTask(task);
      setShowFeedbackForm(true);
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedback.length < 20 || rating === 0) {
      alert(
        "Please provide a detailed feedback (minimum 20 characters) and rating!"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackResponse = await fetch(
        `${url}/completeTask/${currentTask._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!feedbackResponse.ok) {
        setShowFeedbackForm(false);
        setFeedback("");
        setRating(0);
        setCurrentTask(null);
        throw new Error("Failed to submit feedback");
      }
      const wallet = await feedbackResponse.json();
      setCurrentWallet(wallet.wallet);
      setProgress((completedTasks.length + 1) * (100 / tasks.length));
      setShowFeedbackForm(false);
      setFeedback("");
      setRating(0);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTaskIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'review': return Target;
      case 'survey': return Gift;
      case 'social': return TrendingUp;
      default: return Zap;
    }
  };

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
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="bg-white/90 backdrop-blur-xl p-3 rounded-2xl hover:bg-white transition-all duration-300 flex items-center space-x-2 border border-blue-200/50 shadow-lg text-gray-700 hover:text-blue-600"
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Award className="h-8 w-8 text-blue-600" />
                  Level {level} Tasks
                </h1>
                <p className="text-gray-600 mt-1">Complete tasks to earn rewards and progress</p>
              </div>
            </div>
            
            {/* Wallet Display */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`bg-white/90 backdrop-blur-xl px-6 py-4 rounded-2xl flex items-center space-x-3 border shadow-lg transition-all duration-300 ${
                currentWallet < 100 
                  ? 'border-red-300 shadow-red-500/20' 
                  : 'border-green-300 shadow-green-500/20'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`p-2 rounded-xl ${
                  currentWallet < 100 ? 'bg-red-500/20' : 'bg-green-500/20'
                }`}
              >
                <DollarSign className={`h-6 w-6 ${
                  currentWallet < 100 ? 'text-red-600' : 'text-green-600'
                }`} />
              </motion.div>
              <div>
                <span className={`font-bold text-lg ${
                  currentWallet < 100 ? 'text-red-600' : 'text-green-600'
                }`}>
                  ${currentWallet.toFixed(2)}
                </span>
                <p className="text-xs text-gray-500">Current Balance</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Wallet Alert */}
          <AnimatePresence>
            {showWalletAlert && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="fixed top-4 right-4 bg-red-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 border border-red-400/50 z-50"
              >
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Insufficient Balance</p>
                  <p className="text-sm text-red-100">Wallet balance must be greater than $100 to activate tasks</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-blue-200/50 p-8 mb-12 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  Daily Progress
                </h2>
                <p className="text-gray-600">Track your completion rate and earnings</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-blue-600">
                  {Math.round(progress)}%
                </span>
                <p className="text-gray-500 text-sm">Completed</p>
              </div>
            </div>
            
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              </motion.div>
            </div>
            
            <div className="flex justify-between mt-3 text-sm text-gray-600">
              <span>{completedTasks.length} of {tasks.length} tasks completed</span>
              <span>Keep going! 🚀</span>
            </div>
          </motion.div>

          {/* Tasks Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {tasks.map((task, index) => {
              const TaskIcon = getTaskIcon(task.type);
              const isCompleted = completedTasks.includes(task._id);
              const isLocked = currentWallet < 100;
              
              return (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: isLocked ? 1 : 1.02, 
                    y: isLocked ? 0 : -5 
                  }}
                  className={`bg-white/90 backdrop-blur-xl p-6 rounded-3xl border transition-all duration-300 cursor-pointer group ${
                    isCompleted
                      ? "border-green-300 shadow-lg shadow-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50"
                      : isLocked
                      ? "border-red-200 opacity-60 cursor-not-allowed shadow-lg"
                      : "border-blue-200/50 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/20 shadow-lg"
                  }`}
                  onClick={() => handleTaskClick(task)}
                >
                  {/* Task Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-3 rounded-2xl ${
                          isCompleted 
                            ? "bg-green-500/20" 
                            : isLocked 
                            ? "bg-red-500/20" 
                            : "bg-blue-500/20 group-hover:bg-blue-500/30"
                        } transition-all duration-300`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : isLocked ? (
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <TaskIcon className="h-6 w-6 text-blue-600" />
                        )}
                      </motion.div>
                      <div>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          isCompleted 
                            ? "bg-green-100 text-green-700" 
                            : isLocked 
                            ? "bg-red-100 text-red-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {task.type || 'Task'}
                        </span>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full ${
                        isCompleted 
                          ? "bg-green-500/20 text-green-700" 
                          : "bg-blue-500/20 text-blue-700"
                      }`}
                    >
                      <Trophy className="h-4 w-4" />
                      <span className="font-bold text-sm">{task.reward}</span>
                    </motion.div>
                  </div>

                  {/* Task Content */}
                  <h3 className={`text-xl font-bold mb-3 ${
                    isCompleted 
                      ? "text-green-800" 
                      : isLocked 
                      ? "text-red-600" 
                      : "text-gray-900 group-hover:text-blue-600"
                  } transition-colors`}>
                    {task.title}
                  </h3>

                  {/* Task Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>5-10 minutes</span>
                    </div>
                    
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center space-x-1 text-green-600"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">Completed!</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Locked Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <div className="text-center">
                        <Shield className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <p className="text-red-600 font-medium text-sm">Insufficient Balance</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Feedback Form Modal */}
          <AnimatePresence>
            {showFeedbackForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full border border-blue-200/50 shadow-2xl"
                >
                  {/* Modal Header */}
                  <div className="p-8 border-b border-gray-200/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500/20 rounded-xl">
                        <Target className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Complete Task
                      </h2>
                    </div>
                    <p className="text-gray-600">{currentTask?.title}</p>
                  </div>

                  <div className="p-8 space-y-6">
                    {/* Rating Section */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-3">
                        Rate your experience
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-10 w-10 transition-colors ${
                                star <= rating
                                  ? "text-yellow-500"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}
                              fill={star <= rating ? "currentColor" : "none"}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Section */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-3">
                        Share your detailed feedback
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none hover:bg-gray-100"
                        rows="4"
                        placeholder="Share your detailed experience... (minimum 20 characters)"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {feedback.length}/20 characters minimum
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowFeedbackForm(false)}
                        className="flex-1 px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 font-semibold"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmitFeedback}
                        disabled={isSubmitting || feedback.length < 20 || rating === 0}
                        className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                              />
                              Submitting...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="submit"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <Send className="h-5 w-5 mr-2" />
                              Submit Feedback
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion Celebration */}
          {progress === 100 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-2xl shadow-yellow-500/50"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TasksPage;