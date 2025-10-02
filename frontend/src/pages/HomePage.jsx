import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiSearch, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Layout/Navbar';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">
      
      <Navbar />

      {/* Floating Purple Blur */}
       <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-300/20 rounded-full blur-2xl -z-10 animate-blob animation-delay-2000"></div>

      {/* Hero Section */}
      <div className="mt-24 container mx-auto px-6 py-20 text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Finance Research
          <span className="text-purple-600"> AI Chatbot</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get instant financial insights, market analysis, and research with AI-powered web search and cited sources.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(user ? '/chat' : '/register')}
            className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>{user ? 'Go to Chat' : 'Get Started Free'}</span>
            <FiArrowRight />
          </button>

          {!user && (
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition border-2 border-gray-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transform transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <FiSearch className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Web Search</h3>
          <p className="text-gray-600">
            Search the latest financial news, reports, and market data from trusted sources.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transform transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <FiMessageSquare className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
          <p className="text-gray-600">
            Get detailed analysis and insights powered by advanced AI with reasoning traces.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transform transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <FiTrendingUp className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Cited Sources</h3>
          <p className="text-gray-600">
            Every answer includes citations with links to original sources for verification.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-8 mt-24">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 Finance Research Chatbot. All rights reserved.</p>
        </div>
      </div>

      {/* Blob Animation Styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
