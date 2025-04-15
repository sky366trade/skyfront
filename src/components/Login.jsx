import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, User, Lock, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

const Login = () => {
  const [token,setToken]=useState("");
  useEffect(() => {if(token && token===localStorage.getItem("token")) {navigate("/profile")
  }
  else{
    navigate("/login");
  };}, []);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const url = import.meta.env.VITE_BACKEND_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      localStorage.setItem("token", data.token);
      setToken(data.token);
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500
      });
      
      navigate("/profile");
    } catch (error) {
      setError(error.message || "An error occurred during login");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2342')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-blue-900/95 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="relative bg-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <LogIn className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Welcome back</h2>
              <p className="mt-2 text-gray-300">Please sign in to your account</p>
            </div>

            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="text-sm font-medium text-gray-300 block mb-0">
                    Username or Email
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
                      placeholder="Enter your username or email"
                      value={formData.username.trim()}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value.trim() })}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-0">
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
                      placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to={`/register`} className="font-medium text-blue-400 hover:text-blue-300">
                    Don't have an account? Register
                  </Link>
                </div>
                {/* <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </a>
                </div> */}
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium"
              >
                <LogIn className="mr-2 h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                Sign in
                <ArrowRight className="ml-2 h-5 w-5 text-blue-300 group-hover:text-blue-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;