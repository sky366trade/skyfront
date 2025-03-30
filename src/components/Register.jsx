import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  User,
  Lock,
  ArrowRight,
  Phone,
} from "lucide-react";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  
  const url = import.meta.env.VITE_BACKEND_URL;
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const response = await fetch(`${url}/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.msg);
      
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: "Registered Successfully",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
      
  //     navigate("/login");
  //   } catch (error) {
  //     setError(error.message || "An error occurred during registration");
  //     console.error("Registration Error:", error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      navigate('/verify-email', { state: { formData } });
      localStorage.setItem("username", formData.username);
    } catch (error) {
      setError(error.message || "An error occurred during registration");
      console.error("Registration Error:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute w-96 h-96 -bottom-10 -right-10 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl space-y-8">
            <div className="text-center relative">
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">
                Join the Adventure
              </h2>
              <p className="mt-2 text-gray-300">
                Create your account and start exploring
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="relative">
                  <label htmlFor="username" className="text-sm font-medium text-gray-300 block mb-0">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="pl-10 block w-full px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Choose your username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-0">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10 block w-full px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-300 block mb-0">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="pl-10 block w-full px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 block w-full px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserPlus className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                  </span>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 text-blue-300 group-hover:text-blue-200 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/40 text-gray-400">Or</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="font-medium text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2 transition-colors"
                >
                  Already have an account? Sign in
                  <ArrowRight className="h-4 w-4" />
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