"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from './CheckIcon';
import { XIcon } from './XIcon';

const tabs = [
  { id: "role", label: "Overview" },
  { id: "responsibilities", label: "Focus Areas" },
] as const;

export type TabKey = (typeof tabs)[number]["id"];

type CareersNavProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
} & ComponentPropsWithoutRef<"nav">;

export function CareersNav({ activeTab, onTabChange, className, ...props }: CareersNavProps) {
  return (
    <nav
      {...props}
      className={cn(
        "mx-auto w-full max-w-3xl rounded-2xl border bg-card shadow-sm",
        className
      )}
      aria-label="Careers sections"
    >
      <ul className="flex w-full items-center justify-between gap-2 p-1" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <button
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full rounded-full px-4 py-2 text-center text-sm font-medium transition",
                activeTab === tab.id
                  ? "bg-primary text-white shadow"
                  : "bg-transparent text-muted-foreground hover:bg-muted/50"
              )}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type CareersTabsProps = {
  activeTab: TabKey;
};

export function CareersTabs({ activeTab }: CareersTabsProps) {
  let content: ReactNode;

  if (activeTab === "role") {
    content = (
      <div
        role="tabpanel"
        id="panel-role"
        aria-labelledby="tab-role"
        className="space-y-8"
      >
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">About The Role</h2>
          <p className="text-muted-foreground mb-4">
            Andrew would build products and systems that help Opendoor&apos;s teams and customers work better together. He&apos;d partner deeply with sales, operations, and customer-facing teams to understand their challenges, then architect and ship solutions that meaningfully improve productivity, revenue outcomes, or customer experience.
          </p>
          <p className="text-muted-foreground mb-4">
            This would be ideal for someone who doesn&apos;t wait for a spec, loves zero-to-one ambiguity, and wants to ship systems that actually get used daily by people who depend on them. He&apos;d work directly with internal stakeholders and customers to explore what&apos;s possible and ensure the products built translate directly to realized business value.
          </p>
          <p className="text-muted-foreground">
            The work would span customer-facing experiences, internal tools that make teams more effective, data infrastructure that surfaces insights, and systems that create leverage across the organization.
          </p>
        </div>

        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">What Andrew Would Build</h2>
          <div className="space-y-3 text-muted-foreground">
            <p><span className="font-semibold text-foreground">High-leverage applications:</span> Customer dashboards, seller insights, notification systems - experiences that make customers more engaged and informed about their home&apos;s value and market dynamics</p>
            <p><span className="font-semibold text-foreground">Internal systems & tools:</span> Sales enablement platforms, operations automation, CRM integrations, reporting dashboards that make GTM teams significantly more productive</p>
            <p><span className="font-semibold text-foreground">Data & measurement frameworks:</span> Analytics pipelines, performance tracking systems, knowledge bases that turn raw data into actionable insights for stakeholders</p>
            <p><span className="font-semibold text-foreground">Platform experiences:</span> APIs, integrations, and systems that create interoperability and leverage across products</p>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">How Success Would Be Measured</h2>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            <li>Measurable improvements in customer engagement, retention, and lifetime value</li>
            <li>Productivity gains and time savings for internal teams using the tools</li>
            <li>Business impact: revenue outcomes, operational efficiency, customer satisfaction</li>
            <li>Adoption and daily usage - building things people actually depend on</li>
            <li>Speed and iteration velocity - shipping prototypes to production quickly</li>
          </ul>
        </div>
      </div>
    );
  } else {
    content = (
      <div
        role="tabpanel"
        id="panel-responsibilities"
        aria-labelledby="tab-responsibilities"
        className="space-y-8"
      >
        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">In This Role, Andrew Would</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Enable Growth & GTM Teams</h3>
                <p className="text-muted-foreground">Build systems that enable marketers to run better campaigns, help sales teams close more deals, and create the GTM playbook through tools and automation. Make growth teams more effective through better data, workflows, and leverage.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Partner Deeply with Teams</h3>
                <p className="text-muted-foreground">Work closely with sales, marketing, and operations teams to uncover high-impact problems and architect solutions. Embed with teams to understand their workflows, pain points, and opportunities.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Build & Ship End-to-End</h3>
                <p className="text-muted-foreground">Own problems from discovery through deployment. Prototype quickly, iterate based on real usage, and ship systems that people actually use daily. Bias toward action and comfortable with ambiguity.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Drive Platform Leverage</h3>
                <p className="text-muted-foreground">Work closely with product and engineering teams to inform capabilities, close gaps, and influence platform evolution. Create interoperability and systems thinking across tools.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Synthesize & Feed Back Insights</h3>
                <p className="text-muted-foreground">Learn from real usage patterns and feed insights back to product, data, and engineering teams. Shape the future of what gets built based on frontline experience.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Scale Knowledge & Patterns</h3>
                <p className="text-muted-foreground">Contribute to documentation, design patterns, and technical resources that help scale capabilities across teams. Make the hard-won lessons reusable.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Less Focus On</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Marketing Operations</h3>
                <p className="text-muted-foreground">Less time managing content calendars, writing copy, or running campaigns. More time building the systems that enable those teams to work better.</p>
              </div>
            </li>
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Top-of-Funnel Acquisition</h3>
                <p className="text-muted-foreground">Less emphasis on SEO, paid ads, or lead generation tactics. More focus on what happens after someone engages - retention, value delivery, lifetime impact.</p>
              </div>
            </li>
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Isolated Product Features</h3>
                <p className="text-muted-foreground">Different from building features in a vacuum. Every project would have direct business context, user feedback loops, and measurable impact on team or customer outcomes.</p>
              </div>
            </li>
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Team/Process Management</h3>
                <p className="text-muted-foreground">Leading through building, technical direction, and influence rather than managing people or coordinating large teams. Hands-on role where shipping is the primary mode of leadership.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return <div className="animate-in fade-in-50 duration-200">{content}</div>;
}
