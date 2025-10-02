import API from './api';

export const chatService = {
createThread: async (title, count = 0) => {
  const safeTitle = title || `Chat ${count + 1}`;
  const response = await API.post('/chat/threads', { title: safeTitle });
  return response.data;
},


  getThreads: async () => {
    const response = await API.get('/chat/threads');
    return response.data;
  },

  getMessages: async (threadId) => {
    const response = await API.get(`/chat/threads/${threadId}/messages`);
    return response.data;
  },

  deleteThread: async (threadId) => {
    const response = await API.delete(`/chat/threads/${threadId}`);
    return response.data;
  },

  sendMessage: async (threadId, content) => {
    const response = await API.post('/ai/chat', { thread_id: threadId, content });
    return response.data;
  },
};