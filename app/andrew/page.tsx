"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { OpportunitiesContent } from "@/components/opportunities-content";
import { CareersNav, CareersTabs, type TabKey as CareersTabKey } from '@/components/careers/careers-tabs';
import { InteractiveChat } from '@/components/careers/InteractiveChat';
import { ChatBubble } from '@/components/careers/ChatBubble';

type TabValue = "opportunities" | "role";

export default function AndrewPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("opportunities");
  const [careersTab, setCareersTab] = useState<CareersTabKey>("role");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('GTM Innovation Architect');
  const [isRemixing, setIsRemixing] = useState(false);

  const tabs = [
    { label: "Opportunities", value: "opportunities" },
    { label: "Role Ideas", value: "role" },
  ];

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 lg:px-10">

        <div className="mb-8 flex justify-center">
          <SegmentedControl
            options={tabs}
            value={activeTab}
            onChange={(value) => setActiveTab(value as TabValue)}
          />
        </div>

        <div className="mt-8">
          {activeTab === "opportunities" && <OpportunitiesContent />}
          {activeTab === "role" && (
            <div className="max-w-5xl mx-auto space-y-8 pb-32">
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
                  Build tools and systems that support go-to-market efforts, drive customer engagement, and enable data-driven decision making. Forward deployed engineering at its best.
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="flex justify-center">
                <CareersNav
                  activeTab={careersTab}
                  onTabChange={setCareersTab}
                  className="max-w-3xl bg-card shadow-sm"
                />
              </div>

              {/* Tab Content */}
              <CareersTabs activeTab={careersTab} />
            </div>
          )}
        </div>
      </div>
      
      {activeTab === "role" && (
        <>
          {isChatOpen ? (
            <InteractiveChat onClose={() => setIsChatOpen(false)} />
          ) : (
            <ChatBubble onClick={() => setIsChatOpen(true)} />
          )}
        </>
      )}
    </div>
  );
}

