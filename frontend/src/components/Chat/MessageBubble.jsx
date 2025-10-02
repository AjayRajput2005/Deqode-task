import React, { useState, useEffect, useRef } from 'react';
import { FiUser, FiCpu, FiEye, FiEyeOff, FiZap, FiDownload, FiCopy, FiCheck } from 'react-icons/fi';
import SourceCard from './SourceCard';
import Markdown from 'react-markdown';

const MessageBubble = ({ message }) => {
  const [showThinking, setShowThinking] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const bubbleRef = useRef(null);

  // Scroll into view on mount (for AI thinking messages)
  useEffect(() => {
    if (!isUser && bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [message]);

  const handleCopy = () => {
    let textToCopy = message.content;
    
    if (message.thinking) {
      textToCopy += `\n\n--- Thinking ---\n${message.thinking}`;
    }
    
    if (message.sources && message.sources.length > 0) {
      textToCopy += '\n\n--- Sources ---\n';
      message.sources.forEach((source, idx) => {
        textToCopy += `\n${idx + 1}. ${source.title}\n   ${source.url}\n`;
      });
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let content = `# ${isUser ? 'User' : 'AI Assistant'} Message\n\n`;
    content += `**Time:** ${new Date(message.createdAt).toLocaleString()}\n\n`;
    content += `## Content\n\n${message.content}\n\n`;
    
    if (message.thinking) {
      content += `## Thinking Process\n\n${message.thinking}\n\n`;
    }
    
    if (message.sources && message.sources.length > 0) {
      content += `## Sources\n\n`;
      message.sources.forEach((source, idx) => {
        content += `${idx + 1}. **${source.title}**\n`;
        content += `   - ${source.url}\n`;
        if (source.snippet) content += `   - ${source.snippet}\n`;
        content += `\n`;
      });
    }
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `message_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={bubbleRef} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-fadeIn`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-4xl w-full`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-4' : 'mr-4'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
              : 'bg-gradient-to-br from-gray-700 to-gray-900 ring-2 ring-blue-500/20'
          }`}>
            {isUser ? (
              <FiUser className="text-white" size={20} />
            ) : (
              <FiCpu className="text-blue-400" size={20} />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Name Label */}
          <p className={`text-xs font-medium mb-2 ${isUser ? 'text-right text-gray-400' : 'text-left text-gray-500'}`}>
            {isUser ? 'You' : 'AI Assistant'}
          </p>

          {/* Message Bubble */}
          <div className={`rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm relative group ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-8' 
              : 'bg-white border border-gray-200 text-gray-800 mr-8'
          }`}>
            <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px]">
              <Markdown>{message.thinking}</Markdown><Markdown>{message.content}</Markdown>
            </p>

            {/* Action Buttons */}
            <div className="absolute -top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg shadow-lg transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
                title="Copy message"
              >
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg shadow-lg transition-all"
                title="Download message"
              >
                <FiDownload size={14} />
              </button>
            </div>
          </div>

          {/* Thinking Section */}
          {!isUser && message.thinking && (
            <div className="mt-3 mr-8">
              <button
                onClick={() => setShowThinking(!showThinking)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                {showThinking ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                <span className="font-medium">{showThinking ? 'Hide' : 'Show'} Thinking Process</span>
                <FiZap size={14} className="text-yellow-500" />
              </button>
              
              {showThinking && (
                <div className="mt-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-xl shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiZap className="text-yellow-600" size={16} />
                    <p className="font-semibold text-yellow-800 text-sm">AI Reasoning:</p>
                  </div>
                  <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                    {message.thinking}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sources */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4 mr-8 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                <p className="text-sm font-semibold text-gray-700">Sources Referenced</p>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  {message.sources.length}
                </span>
              </div>
              <div className="grid gap-2">
                {message.sources.map((source, idx) => (
                  <SourceCard key={source._id} source={source} index={idx + 1} />
                ))}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <p className={`text-xs text-gray-400 mt-3 ${isUser ? 'text-right mr-8' : 'text-left'}`}>
            {new Date(message.createdAt).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MessageBubble;
