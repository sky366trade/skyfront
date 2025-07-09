import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  User,
  Lock,
  ArrowRight,
  Phone,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";

const Register = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    localStorage.setItem("verifying", "false");
    fetch(
      `${url}/delete-unverified-users`,
      {
        method: "DELETE",
      },
      []
    );
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();
  const username = useParams().username;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      localStorage.setItem("verifying", "true");
      localStorage.setItem("username", formData.username);
      const response = await fetch(`${url}/check-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if(data.msg){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.msg,
        });
        return;
      }
      navigate("/verify-email", { state: { formData, username } });
    } catch (error) {
      setError(error.message || "An error occurred during registration");
      console.error("Registration Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldValidation = (field, value) => {
    switch (field) {
      case 'username':
        return value.length >= 3;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return value.length >= 10;
      case 'password':
        return value.length >= 6;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 top-1/2 left-1/4 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          {/* Main Form Container */}
          <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl space-y-8 transform hover:scale-[1.02] transition-all duration-300">
            {/* Header with Icon */}
            <div className="text-center relative">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <UserPlus className="w-10 h-10 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Join the Adventure
              </h2>
              <p className="mt-2 text-gray-600">
                Create your account and start exploring
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-shake">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Username Field */}
                <div className="relative group">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-5 w-5 transition-colors ${focusedField === 'username' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="pl-10 pr-10 block w-full px-3 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Choose your username"
                      value={formData.username.trim()}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField('')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          username: e.target.value.trim(),
                        })
                      }
                    />
                    {formData.username && getFieldValidation('username', formData.username) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10 pr-10 block w-full px-3 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Enter your email"
                      value={formData.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {formData.email && getFieldValidation('email', formData.email) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="relative group">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className={`h-5 w-5 transition-colors ${focusedField === 'phone' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="pl-10 pr-10 block w-full px-3 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    {formData.phone && getFieldValidation('phone', formData.phone) && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 pr-20 block w-full px-3 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      {formData.password && getFieldValidation('password', formData.password) && (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 animate-pulse" />
                      )}
                      <button
                        type="button"
                        className="pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <UserPlus className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                      </span>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5 text-blue-300 group-hover:text-blue-200 group-hover:translate-x-1 transition-all duration-200" />
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 group"
                >
                  Already have an account? Sign in
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;