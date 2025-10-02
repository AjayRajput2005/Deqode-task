import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiMic } from 'react-icons/fi';

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="  bg-transparent ">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Input Container */}
          <div className="relative flex items-end space-x-3 bg-white rounded-2xl shadow-lg border border-gray-200 p-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-200">
            
            {/* Attach Button */}
            <button
              type="button"
              aria-label="Attach file"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              <FiPaperclip size={20} />
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about stocks, market analysis, or financial research..."
              disabled={disabled}
              rows="1"
              maxLength={2000}
              className="flex-1 bg-transparent border-none focus:outline-none resize-none text-gray-800 placeholder-gray-400 text-[15px] leading-relaxed py-2 disabled:bg-transparent disabled:cursor-not-allowed"
              style={{ maxHeight: '200px', minHeight: '24px' }}
            />

            {/* Voice Button */}
            <button
              type="button"
              aria-label="Record voice"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              <FiMic size={20} />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              aria-label="Send message"
              disabled={!message.trim() || disabled}
              className={`flex-shrink-0 p-3 rounded-xl transition-all duration-200 shadow-lg ${
                message.trim() && !disabled
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105 shadow-blue-500/50'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiSend size={20} className={message.trim() && !disabled ? 'animate-pulse' : ''} />
            </button>
          </div>

          {/* Helper Text */}
          {/* <div className="flex items-center justify-between mt-3 px-2">
            <p className="text-xs text-gray-500">
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono shadow-sm">Enter</kbd>
              {' '}to send • 
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono shadow-sm ml-1">Shift + Enter</kbd>
              {' '}for new line
            </p>
            <p className={`text-xs ${message.length >= 2000 ? 'text-red-500' : 'text-gray-400'}`}>
              {message.length}/2000
            </p>
          </div> */}

          {/* Quick Suggestions */}
          {/* {message.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                'Analyze HDFC Bank stock',
                'Compare TCS vs Infosys',
                'Latest Nifty 50 trends',
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(suggestion)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 text-sm rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
