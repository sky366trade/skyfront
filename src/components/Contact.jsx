import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, Clock, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getFieldValidation = (field, value) => {
    switch (field) {
      case 'name':
        return value.length >= 2;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'subject':
        return value.length >= 5;
      case 'message':
        return value.length >= 10;
      default:
        return false;
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'Sky366Trade@gmail.com',
      description: 'Get help via email',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Telegram',
      value: '@Sky366Trade',
      description: 'Chat with us instantly',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New York, NY 10001',
      description: 'Our headquarters',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <button
              onClick={() => navigate('/profile')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        {[...Array(8)].map((_, i) => (
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

      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/profile')}
            className="mb-8 flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Profile
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6 transform hover:scale-110 transition-all duration-300">
                <MessageSquare className="h-10 w-10 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Contact Our Team
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to help and answer any questions you might have about Sky366Trade
              </p>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl text-center transform hover:scale-[1.02] transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-blue-600 font-semibold mb-2">{method.value}</p>
                <p className="text-gray-500 text-sm">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Send className="h-6 w-6 mr-3 text-blue-500" />
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative group">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                          placeholder="Enter your full name"
                        />
                        {formData.name && getFieldValidation('name', formData.name) && (
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
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                          placeholder="your.email@example.com"
                        />
                        {formData.email && getFieldValidation('email', formData.email) && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative group">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        placeholder="What can we help you with?"
                      />
                      {formData.subject && getFieldValidation('subject', formData.subject) && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700 block mb-2 transition-colors group-focus-within:text-blue-600"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        required
                        rows="5"
                        className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                        placeholder="Please describe your question or concern in detail..."
                      />
                      {formData.message && getFieldValidation('message', formData.message) && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-right">
                      <span className={`text-sm ${formData.message.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" />
                        <span>Send Message</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Response Time */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Response Time
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-600">Email: Within 24 hours</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-600">Telegram: Instant response</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-600">Priority support available</p>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Security & Privacy
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    Your information is encrypted and secure. We never share your personal data with third parties.
                  </p>
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-green-700 text-sm font-medium">
                      🔒 All communications are SSL encrypted
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/faq')}
                    className="w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    → Frequently Asked Questions
                  </button>
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    → Account Settings
                  </button>
                  <button
                    onClick={() => navigate('/deposit')}
                    className="w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    → Deposit Help
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

export default Contact;