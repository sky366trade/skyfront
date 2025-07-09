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
  AlertCircle
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[url('https://images.unsplash.com/photo-1533468432434-a8ee6f4f75af?q=80&w=2070')] bg-cover bg-fixed"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/dashboard")}
                className="bg-gray-800/60 p-2 rounded-lg hover:bg-gray-700/60 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </motion.button>
              <h1 className="text-2xl font-bold text-white">
                Level {level} Tasks
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`bg-gray-800/60 px-6 py-3 rounded-xl flex items-center space-x-3 ${
                currentWallet < 100 ? 'border-2 border-red-500' : ''
              }`}>
                <DollarSign className={`h-5 w-5 ${
                  currentWallet < 100 ? 'text-red-500' : 'text-green-400'
                }`} />
                <span className={`font-medium ${
                  currentWallet < 100 ? 'text-red-500' : 'text-white'
                }`}>
                  ${currentWallet.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Wallet Alert */}
          <AnimatePresence>
            {showWalletAlert && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <AlertCircle className="h-5 w-5" />
                <span>Wallet balance must be greater than $100 to activate tasks</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Daily Progress</span>
              <span className="text-blue-400 font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                whileHover={{ scale: currentWallet >= 100 ? 1.02 : 1 }}
                className={`bg-gray-800/60 p-6 rounded-xl border ${
                  completedTasks.includes(task._id)
                    ? "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    : currentWallet < 100
                    ? "border-red-500/50 opacity-50 cursor-not-allowed"
                    : "border-gray-700/50 hover:border-blue-500/50 cursor-pointer"
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {completedTasks.includes(task._id) ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-400">{task.type}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-500/20 px-3 py-1 rounded-full">
                    <Trophy className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">
                      {task.reward}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>5-10 minutes</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feedback Form Modal */}
          <AnimatePresence>
            {showFeedbackForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-800/90 p-8 rounded-2xl max-w-lg w-full mx-4"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {currentTask?.title}
                  </h2>

                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= rating
                                ? "text-yellow-500"
                                : "text-gray-600"
                            }`}
                            fill={star <= rating ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      rows="4"
                      placeholder="Share your detailed experience..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowFeedbackForm(false)}
                      className="flex-1 px-6 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitFeedback}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion Trophy */}
          {progress === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-full shadow-lg"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TasksPage;