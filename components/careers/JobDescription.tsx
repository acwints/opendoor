"use client";

import React, { useState } from 'react';
import { CheckIcon } from './CheckIcon';
import { XIcon } from './XIcon';

export const JobDescription: React.FC = () => {
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
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">{jobTitle}</h1>
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
        <p className="mt-4 text-lg text-muted-foreground">
          Lead a nimble team to build groundbreaking product experiences that directly enhance our customer journey and redefine how people buy and sell homes.
        </p>
      </div>

      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-4">Role Summary</h2>
        <p className="text-muted-foreground">
          As the Head of Product Innovation, you are a hands-on builder responsible for leading a small, elite team to ideate, prototype, and ship customer-centric products. Your focus is on creating tangible business value by enhancing our platform, automating critical workflows, and uncovering data-driven insights that lead to better customer experiences and increased home transactions. This is a role for a player-coach who thrives on building alongside their team and turning ambitious ideas into reality.
        </p>
      </div>
      
      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-4">Key KPIs</h2>
        <ul className="space-y-3 list-disc list-inside text-muted-foreground">
          <li><span className="font-semibold text-foreground">ROI on Innovation Initiatives:</span> The ability to generate a significant, measurable return on investment for all innovation projects.</li>
          <li><span className="font-semibold text-foreground">Speed to Market:</span> The velocity at which new features and prototypes are moved from concept to launch.</li>
          <li><span className="font-semibold text-foreground">Product-Driven Growth:</span> The measurable impact of new features on key metrics like customer satisfaction and transaction volume.</li>
          <li><span className="font-semibold text-foreground">Automation Efficiency:</span> The degree to which major business workflows are successfully automated, improving operational efficiency.</li>
        </ul>
      </div>

      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-primary mb-4">In-Scope: Top Priorities</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">New Product Bets & Prototyping</h3>
              <p className="text-muted-foreground">Rapidly ideate, build, and launch new products and features that delight customers and drive home transactions.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Platform Enhancement</h3>
              <p className="text-muted-foreground">Architect intelligent solutions that connect our data systems, CRM, and APIs to create seamless customer experiences.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Data Structures & Integration</h3>
              <p className="text-muted-foreground">Design data foundations for personalized recommendations, market insights, and other advanced capabilities.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Innovation Team Leadership</h3>
              <p className="text-muted-foreground">Directly lead and build alongside a small, elite team to ship at high velocity.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-4">Out-of-Scope / Underlying Duties</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Broad Tech Strategy</h3>
              <p className="text-muted-foreground">You&apos;ll influence it, but your focus is on tangible product innovation, not the entire company&apos;s tech roadmap.</p>
            </div>
          </li>
          <li className="flex items-start">
            <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Large-Scale Team Management</h3>
              <p className="text-muted-foreground">Lead a small, agile team that leads by example, not a large department.</p>
            </div>
          </li>
          <li className="flex items-start">
            <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Internal IT/Tooling</h3>
              <p className="text-muted-foreground">Focus on customer-facing products and core platform systems, not general IT support.</p>
            </div>
          </li>
          <li className="flex items-start">
            <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Extensive Cross-Functional Training</h3>
              <p className="text-muted-foreground">Your primary role is building, not training other departments.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
