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
          <h2 className="text-2xl font-bold text-foreground mb-4">The Role</h2>
          <p className="text-muted-foreground mb-4">
            Andrew would work at the intersection of engineering and business impact - building tools and systems that help teams work better and customers engage more deeply. This would involve spending time with customers, sales, and operations teams to understand their workflows, then creating technical solutions that drive measurable improvements.
          </p>
          <p className="text-muted-foreground">
            He&apos;d spend more time building systems that enable others (customer tools, internal dashboards, data pipelines) than managing campaigns or content. The focus would be on creating leverage through software rather than day-to-day operations.
          </p>
        </div>

        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">What Andrew Would Build</h2>
          <div className="space-y-3 text-muted-foreground">
            <p><span className="font-semibold text-foreground">Customer-facing tools:</span> Dashboards showing home value trends, personalized insights, notification systems that keep sellers engaged</p>
            <p><span className="font-semibold text-foreground">Internal systems:</span> Tools that help sales and ops teams work more effectively - CRM integrations, workflow automation, reporting that surfaces the right data at the right time</p>
            <p><span className="font-semibold text-foreground">Data infrastructure:</span> Pipelines and analytics that turn raw data into actionable insights for business teams</p>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Potential Success Metrics</h2>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            <li>Customer engagement improvements and lifetime value growth</li>
            <li>Time savings and efficiency gains for internal teams</li>
            <li>Adoption and usage of data/insights by stakeholders</li>
            <li>Speed from idea to shipped solution</li>
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
          <h2 className="text-2xl font-bold text-primary mb-4">Andrew Would Spend More Time</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Building Customer Experiences</h3>
                <p className="text-muted-foreground">Creating tools that increase engagement and retention. Seller dashboards, personalized insights, proactive notifications - things that make customers want to come back.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Enabling Internal Teams</h3>
                <p className="text-muted-foreground">Building systems that make sales, ops, and customer success teams more effective. Integrations, automation, dashboards that surface insights when needed.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Working with Data</h3>
                <p className="text-muted-foreground">Building infrastructure that turns data into insights. Analytics pipelines, performance tracking, trend analysis that helps inform decisions.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Customer & Team Interaction</h3>
                <p className="text-muted-foreground">Spending time with customers and internal teams to understand their workflows. Building based on direct observation and feedback rather than assumptions.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckIcon className="text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Rapid Prototyping & Iteration</h3>
                <p className="text-muted-foreground">Moving fast from idea to working prototype. Getting something in users&apos; hands quickly, gathering feedback, iterating based on what works.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Andrew Would Spend Less Time</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Campaign & Content Management</h3>
                <p className="text-muted-foreground">Less focus on managing content calendars, writing marketing copy, or running ad campaigns. More focused on building the systems that support those efforts.</p>
              </div>
            </li>
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Acquisition & Lead Gen</h3>
                <p className="text-muted-foreground">Less emphasis on SEO strategy, paid acquisition, or top-of-funnel tactics. More focus on engagement, retention, and value after someone becomes a customer.</p>
              </div>
            </li>
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Core Product Features</h3>
                <p className="text-muted-foreground">Different from pure product engineering. Every project would connect back to business impact and team enablement rather than building features in isolation.</p>
              </div>
            </li>
            <li className="flex items-start">
              <XIcon className="text-muted-foreground mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground">Large Team Management</h3>
                <p className="text-muted-foreground">Leading through building and technical direction rather than managing a large team. Hands-on role focused on shipping rather than delegation.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return <div className="animate-in fade-in-50 duration-200">{content}</div>;
}
