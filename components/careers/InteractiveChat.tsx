"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageRole, type ChatMessage } from '@/lib/types/chat';
import { BotIcon } from './BotIcon';
import { SendIcon } from './SendIcon';
import { CloseIcon } from './CloseIcon';

interface InteractiveChatProps {
  onClose: () => void;
}

export const InteractiveChat: React.FC<InteractiveChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: MessageRole.MODEL,
      text: "Hi! I can help explore how Andrew might fit at Opendoor. Ask about what he'd be building, how he'd spend his time, or what trade-offs would make sense for him.",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || userInput;
    if (!textToSend.trim() || isLoading) return;

    setIsLoading(true);
    const newMessages: ChatMessage[] = [...messages, { role: MessageRole.USER, text: textToSend }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: MessageRole.MODEL, text: data.text },
      ]);
    } catch {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: MessageRole.MODEL, text: "I'm having trouble connecting right now. Please try again." },
      ]);
    }

    setIsLoading(false);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const suggestedQuestions = [
    "What would Andrew spend most of his time building?",
    "How much would he interact with customers?",
    "What's the balance between technical work and campaigns?",
  ];

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-48px)] sm:w-full max-w-md bg-card rounded-lg border border-border flex flex-col h-[70vh] max-h-[600px] shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 border-b border-border flex justify-between items-center flex-shrink-0">
        <div className="text-center flex-1 ml-6">
          <h2 className="text-lg font-bold text-foreground">Ask AI</h2>
          <p className="text-sm text-muted-foreground">Role Explorer</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close chat">
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
            {msg.role === MessageRole.MODEL && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <BotIcon />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.role === MessageRole.USER ? 'bg-primary text-white rounded-br-none' : 'bg-muted text-foreground rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <BotIcon />
            </div>
            <div className="max-w-xs md:max-w-md px-4 py-2 rounded-2xl bg-muted text-foreground rounded-bl-none">
              <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border space-y-2 flex-shrink-0">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button 
              key={i} 
              onClick={() => handleSendMessage(q)} 
              disabled={isLoading} 
              className="text-xs bg-muted hover:bg-muted/80 disabled:opacity-50 text-foreground px-3 py-1 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1 bg-background border border-border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button 
            type="submit" 
            disabled={isLoading} 
            className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 hover:scale-110 disabled:opacity-50 disabled:scale-100 transition-transform"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
