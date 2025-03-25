import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const Login = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const url=import.meta.env.VITE_BACKEND_URL;
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
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/profile");
    } catch (error) {
      setError(error.message || "An error occurred during login");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2342')] bg-cover bg-center">
      <div className="min-h-screen bg-gray-900/70 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-gray-300">Please sign in to your account</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
                  Don't have an account? Register
                </Link>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;