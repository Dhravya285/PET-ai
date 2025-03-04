import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const ChatbotIcon = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to="/chatbot"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-200"
        aria-label="Chat with PetPal Assistant"
      >
        <Bot size={24} />
      </Link>
    </div>
  );
};

export default ChatbotIcon;