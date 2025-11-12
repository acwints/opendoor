"use client";

import React from 'react';
import { ChatIcon } from './ChatIcon';

interface ChatBubbleProps {
  onClick: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 bg-primary text-white rounded-full h-16 w-16 sm:w-auto sm:px-6 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
      aria-label="Open chat assistant"
    >
      <ChatIcon />
      <span className="hidden sm:inline-block ml-3 font-bold text-lg whitespace-nowrap">Ask About This Role</span>
    </button>
  );
};
