import React, { createContext, useState, useEffect } from 'react';
import { chatService } from '../services/chatService';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load all threads
  const loadThreads = async () => {
    try {
      const response = await chatService.getThreads();
      if (response.success) {
        setThreads(response.threads);
        if (!currentThread && response.threads.length > 0) {
          setCurrentThread(response.threads[0]);
        }
      }
    } catch (error) {
      console.error('❌ Load threads error:', error);
    }
  };

  // ✅ Load messages for current thread
  const loadMessages = async (threadId) => {
    if (!threadId) return;
    try {
      setLoading(true);
      const response = await chatService.getMessages(threadId);
      setMessages(response.success ? response.messages : []);
    } catch (error) {
      console.error('❌ Load messages error:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create new thread
  const createThread = async (title) => {
    try {
      const response = await chatService.createThread(title);
      if (response.success) {
        setThreads([response.thread, ...threads]);
        setCurrentThread(response.thread);
        setMessages([]);
        return response.thread;
      }
    } catch (error) {
      console.error('❌ Create thread error:', error);
    }
  };

  // ✅ Send message
  const sendMessage = async (content) => {
    if (!currentThread) return;
    try {
      setLoading(true);
      const response = await chatService.sendMessage(currentThread._id, content);
      if (response.success) {
        const userMsg = { role: 'user', content, createdAt: new Date() };
        setMessages((prev) => [...prev, userMsg, response.message]);
      }
      return response;
    } catch (error) {
      console.error('❌ Send message error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete thread
  const deleteThread = async (threadId) => {
    try {
      const response = await chatService.deleteThread(threadId);
      if (response.success) {
        const updated = threads.filter((t) => t._id !== threadId);
        setThreads(updated);

        if (currentThread?._id === threadId) {
          setCurrentThread(updated[0] || null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('❌ Delete thread error:', error);
    }
  };

  // ✅ Auto load threads on mount
  useEffect(() => {
    loadThreads();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        threads,
        currentThread,
        messages,
        loading,
        loadThreads,
        loadMessages,
        createThread,
        sendMessage,
        deleteThread,
        setCurrentThread,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
