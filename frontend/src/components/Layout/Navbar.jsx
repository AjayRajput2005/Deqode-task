import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { exportChat } from '../../services/exportService';
import { FiLogOut, FiUser, FiDownload, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { currentThread, messages } = useChat();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const navigate = useNavigate();

  const handleExport = (format) => {
    if (!currentThread || messages.length === 0) {
      alert('No messages to export!');
      return;
    }
    exportChat(currentThread, messages, format);
    setShowExportMenu(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <div onClick={() => navigate('/')} className="cursor-pointer">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Finance Research
            </h1>
            <p className="text-xs text-gray-500">AI-Powered Analysis</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Export Button */}
          {user && currentThread && messages.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FiDownload size={18} />
                <span>Export</span>
                <FiChevronDown size={16} />
              </button>

              {showExportMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowExportMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                    <button
                      onClick={() => handleExport('markdown')}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-2xl">📝</span>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">Markdown</p>
                        <p className="text-xs text-gray-500">.md file</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleExport('html')}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-2xl">🌐</span>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">HTML</p>
                        <p className="text-xs text-gray-500">.html file</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleExport('json')}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">JSON</p>
                        <p className="text-xs text-gray-500">.json file</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* User Not Logged In */}
          {!user && (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Register
              </button>
            </>
          )}

          {/* User Logged In */}
          {user && (
            <>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiUser className="text-white" size={16} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-all duration-200 border border-red-200"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
