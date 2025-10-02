import React from 'react';
import Navbar from '../components/Layout/Navbar';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatArea from '../components/Chat/ChatArea';

const ChatPage = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main chat section */}
      <div className="  flex flex-1 overflow-hidden">
      
        <ChatSidebar className="w-80 flex-shrink-0 border-r border-gray-200" />

       
        <ChatArea className="flex-1 bg-[#F9FAFB] overflow-y-auto" />
      </div>
    </div>
  );
};

export default ChatPage;


