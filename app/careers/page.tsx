"use client";

import React, { useState } from 'react';
import { CareersNav, CareersTabs, type TabKey } from '@/components/careers/careers-tabs';
import { InteractiveChat } from '@/components/careers/InteractiveChat';
import { ChatBubble } from '@/components/careers/ChatBubble';

export default function CareersPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("role");
  const [jobTitle, setJobTitle] = useState('Head of Product Innovation');
  const [isRemixing, setIsRemixing] = useState(false);

  const handleRemix = async () => {
    setIsRemixing(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remixTitle' }),
      });
      const data = await response.json();
      setJobTitle(data.text);
    } catch (error) {
      console.error('Failed to remix title:', error);
    }
    setIsRemixing(false);
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-32">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {jobTitle}
              </h1>
              <button
                onClick={handleRemix}
                disabled={isRemixing}
                className="relative bg-muted border border-border rounded-lg h-12 w-12 flex items-center justify-center text-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Generate a new job title"
              >
                {isRemixing ? (
                  <div className="h-6 w-6 border-2 border-t-2 border-foreground/50 border-t-foreground rounded-full animate-spin"></div>
                ) : (
                  <span className="text-2xl" role="img" aria-label="Refresh">🔄</span>
                )}
              </button>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Lead a nimble team to build groundbreaking product experiences that directly enhance our customer journey and redefine how people buy and sell homes.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex justify-center">
            <CareersNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="max-w-3xl bg-card shadow-sm"
            />
          </div>

          {/* Tab Content */}
          <CareersTabs activeTab={activeTab} />
        </div>
      </main>
      
      {isChatOpen ? (
        <InteractiveChat onClose={() => setIsChatOpen(false)} />
      ) : (
        <ChatBubble onClick={() => setIsChatOpen(true)} />
      )}
    </div>
  );
}
