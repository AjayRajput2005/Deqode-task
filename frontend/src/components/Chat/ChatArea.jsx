import React, { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Spinner from '../Common/Spinner';

const ChatArea = () => {
  const { currentThread, messages, loading, sendMessage } = useChat();
  const containerRef = useRef(null);
  const latestMsgRef = useRef(null);

  // ✅ Scroll to latest message
  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    await sendMessage(content);
  };

  if (!currentThread) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Welcome 👋</h2>
          <p className="text-gray-500 mt-2">Start a new chat to begin your journey!</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-lg">Ask anything about finance, stocks, or markets!</p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              return (
                <div key={idx} ref={isLast ? latestMsgRef : null}>
                  <MessageBubble message={msg} />
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start mb-8 animate-fadeIn" ref={latestMsgRef}>
                <div className="flex items-center space-x-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-lg">
                  <Spinner size="sm" />
                  <div>
                    <p className="text-gray-800 font-medium text-sm">AI is thinking...</p>
                    <p className="text-gray-500 text-xs">Analyzing your query</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <MessageInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default ChatArea;
