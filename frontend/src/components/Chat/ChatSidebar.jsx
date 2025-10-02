import React, { useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { FiPlus, FiMessageSquare, FiTrash2, FiClock } from 'react-icons/fi';

const ChatSidebar = () => {
  const {
    threads,
    currentThread,
    loadThreads,
    createThread,
    setCurrentThread,
    deleteThread,
    loadMessages,
  } = useChat();

  useEffect(() => {
    loadThreads();
  }, []);

  // ✅ New Chat Handler
  const handleNewChat = async () => {
    const defaultTitle = `Chat ${threads.length + 1}`;
    const thread = await createThread(defaultTitle);
    if (thread) {
      setCurrentThread(thread);
      loadMessages(thread._id);
    }
  };

  // ✅ Select a thread
  const handleSelectThread = (thread) => {
    setCurrentThread(thread);
    loadMessages(thread._id);
  };

  // ✅ Delete thread
  const handleDeleteThread = async (e, threadId) => {
    e.stopPropagation();
    if (window.confirm('Delete this conversation?')) {
      await deleteThread(threadId);
    }
  };

  // ✅ Format last message time
  const formatDate = (date) => {
    if (!date) return '';
    const now = new Date();
    const msgDate = new Date(date);
    const diffInHours = (now - msgDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diffInHours < 48) return 'Yesterday';
    return msgDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-72 bg-white flex flex-col h-[calc(100vh-73px)] shadow-xl">
      {/* Header */}
      <div className="p-4 pt-10 border-b border-gray-300">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center space-x-2 
            bg-gradient-to-r from-blue-500 to-purple-600 
            hover:from-blue-600 hover:to-purple-700 
            text-white py-3 px-4 rounded-xl font-medium 
            transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          <FiPlus size={20} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 custom-scrollbar">
        {threads.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <FiMessageSquare className="text-gray-600" size={28} />
            </div>
            <p className="text-gray-400 text-sm">No conversations yet</p>
            <p className="text-gray-500 text-xs mt-1">Start a new chat to begin</p>
          </div>
        ) : (
          threads.map((thread) => (
            <div
              key={thread._id}
              onClick={() => handleSelectThread(thread)}
              className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                currentThread?._id === thread._id
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900 border border-blue-400 shadow-md'
                  : 'bg-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-transparent hover:border-blue-300'
              }`}
            >
              {/* Active Indicator */}
              {/* {currentThread?._id === thread._id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-red-500 to-purple-600 rounded-r-full" />
              )} */}

              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 ml-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        currentThread?._id === thread._id
                          ? 'bg-red-500 animate-pulse'
                          : 'bg-gray-500'
                      }`}
                    />
                    <h3 className="font-semibold text-sm truncate text-gray-900 group-hover:text-blue-600 transition-colors">
                      {thread.title || 'Untitled Chat'}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FiMessageSquare size={12} />
                      <span>{thread.message_count || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiClock size={12} />
                      <span>{formatDate(thread.last_message_at)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteThread(e, thread._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg ml-2"
                >
                  <FiTrash2 className="text-red-500 hover:text-red-400" size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300">
        <p className="text-xs text-gray-500 text-center">
          {threads.length} conversation{threads.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default ChatSidebar;
