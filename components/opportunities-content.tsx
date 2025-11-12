"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Sparkles, Loader2 } from "lucide-react";

interface HyperlinkData {
  text: string;
  url: string | null;
}

interface Opportunity {
  [key: string]: string | HyperlinkData;
}

export function OpportunitiesContent() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<number | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch("/api/opportunities");
        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }
        const result = await response.json();
        setOpportunities(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    const lowerStatus = status?.toLowerCase() || "";
    if (lowerStatus.includes("open") || lowerStatus.includes("new")) {
      return "default";
    }
    if (lowerStatus.includes("in progress") || lowerStatus.includes("active")) {
      return "secondary";
    }
    if (lowerStatus.includes("done") || lowerStatus.includes("closed") || lowerStatus.includes("resolved")) {
      return "outline";
    }
    return "default";
  };

  const getPriorityColor = (priority: string) => {
    const lowerPriority = priority?.toLowerCase() || "";
    if (lowerPriority.includes("high") || lowerPriority.includes("urgent")) {
      return "text-red-600";
    }
    if (lowerPriority.includes("medium") || lowerPriority.includes("normal")) {
      return "text-yellow-600";
    }
    if (lowerPriority.includes("low")) {
      return "text-green-600";
    }
    return "";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 lg:px-10">
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
            <p className="text-muted-foreground text-sm">Loading opportunities...</p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8 lg:px-10">
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
            <p className="text-destructive text-sm">{error}</p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="container mx-auto px-6 py-8 lg:px-10">
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
            <p className="text-muted-foreground text-sm">No opportunities found.</p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getColumnValue = (row: Opportunity, columnName: string): string | HyperlinkData | null => {
    if (row[columnName]) return row[columnName] as string | HyperlinkData;
    const key = Object.keys(row).find(
      (k) => k.toLowerCase() === columnName.toLowerCase()
    );
    return key ? (row[key] as string | HyperlinkData) : null;
  };

  const isHyperlink = (value: string | HyperlinkData | null): value is HyperlinkData => {
    return typeof value === "object" && value !== null && "text" in value && "url" in value;
  };

  const getPrimaryField = (opp: Opportunity): string => {
    const titleFields = ["title", "name", "opportunity", "issue", "task"];
    for (const field of titleFields) {
      const value = getColumnValue(opp, field);
      if (value && typeof value === "string" && value.trim()) {
        return value;
      }
    }
    for (const [key, value] of Object.entries(opp)) {
      if (typeof value === "string" && value.trim() && !key.toLowerCase().includes("location")) {
        return value;
      }
      if (isHyperlink(value) && value.text.trim()) {
        return value.text;
      }
    }
    return "Untitled Opportunity";
  };

  const handleAiRecommendation = async (index: number, opportunity: Opportunity) => {
    if (aiLoading === index || aiRecommendations[index]) return;
    
    setAiLoading(index);
    try {
      const primaryField = getPrimaryField(opportunity);
      const query = `Based on this opportunity: "${primaryField}", generate an innovative and specific next step for Andrew at Opendoor. 

Think about:
- How this connects to Opendoor's mission of simplifying home buying/selling
- What unique technical or product solution could create leverage
- How to turn this into a concrete prototype or system that drives measurable impact
- What would make this a compelling portfolio piece or talking point

Provide one bold, specific, actionable recommendation that demonstrates strategic thinking and technical creativity. Make it exciting and concrete, not generic.`;
      
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query,
          context: { opportunity: Object.fromEntries(Object.entries(opportunity).map(([k, v]) => [k, typeof v === 'object' && v !== null && 'text' in v ? v.text : v])) }
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      const recommendation = data.summary || data.recommendations?.[0] || "No recommendation available.";
      setAiRecommendations(prev => ({ ...prev, [index]: recommendation }));
    } catch (err) {
      console.error('AI recommendation error:', err);
      setAiRecommendations(prev => ({ ...prev, [index]: "Unable to generate recommendation at this time." }));
    } finally {
      setAiLoading(null);
    }
  };

  const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1jYhSlvDi9_w23T1Oy6EOTQC0xVrTcuRZtYgw4a8N5bE/edit?gid=0#gid=0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a
          href={GOOGLE_SHEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
        >
          {opportunities.length} {opportunities.length === 1 ? "opportunity" : "opportunities"} found
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity, index) => {
          const primaryField = getPrimaryField(opportunity);
          const statusValue = getColumnValue(opportunity, "status");
          const priorityValue = getColumnValue(opportunity, "priority");
          const locationValue = getColumnValue(opportunity, "location");
          
          const status = typeof statusValue === "string" ? statusValue : "";
          const priority = typeof priorityValue === "string" ? priorityValue : "";
          const location = isHyperlink(locationValue) ? locationValue : 
                          typeof locationValue === "string" ? locationValue : null;

          return (
            <Card key={index} className="flex flex-col border-border/60 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex-shrink-0 pb-4 relative">
                <div className="flex items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight font-semibold text-foreground truncate">
                      {primaryField}
                    </CardTitle>
                    {status && (
                      <Badge variant={getStatusBadgeVariant(status)} className="shrink-0">
                        {status}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 shrink-0 ml-auto"
                    onClick={() => handleAiRecommendation(index, opportunity)}
                    disabled={aiLoading === index}
                  >
                    {aiLoading === index ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin mr-1.5" />
                        <span className="text-xs">AI</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-3.5 mr-1.5" />
                        <span className="text-xs">AI</span>
                      </>
                    )}
                  </Button>
                </div>
                {priority && (
                  <div className="mt-3">
                    <span className={cn("text-xs font-semibold uppercase tracking-wide", getPriorityColor(priority))}>
                      {priority} Priority
                    </span>
                  </div>
                )}
                {aiRecommendations[index] && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Next Step</p>
                    <p className="text-sm text-foreground leading-relaxed">{aiRecommendations[index]}</p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-3 pt-0">
                {Object.entries(opportunity).map(([key, value]) => {
                  const lowerKey = key.toLowerCase();
                  if (
                    lowerKey === "status" ||
                    lowerKey === "priority" ||
                    lowerKey === "location" ||
                    (typeof value === "string" && value === primaryField)
                  ) {
                    return null;
                  }

                  if (typeof value === "string" && !value.trim()) {
                    return null;
                  }
                  if (isHyperlink(value) && !value.text.trim()) {
                    return null;
                  }

                  // Transform field name: Description -> Context
                  const displayKey = key.toLowerCase() === "description" ? "Context" : key;

                  return (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{displayKey}:</span>{" "}
                      <span className="text-foreground">
                        {isHyperlink(value) ? (
                          value.url ? (
                            <a
                              href={value.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-1.5 font-medium"
                            >
                              {value.text || value.url}
                              <ExternalLink className="size-3.5" />
                            </a>
                          ) : (
                            <span>{value.text}</span>
                          )
                        ) : (
                          <span>{value as string}</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
              
              {/* Location field with hyperlink support - anchored to bottom with fixed height */}
              <div className="h-16 mt-auto border-t border-border/40 px-6 flex items-center">
                {location ? (
                  <div className="text-sm w-full flex items-baseline gap-2">
                    <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide shrink-0 leading-none">Location:</span>
                    <span className="text-foreground truncate min-w-0 flex items-center">
                      {isHyperlink(location) ? (
                        location.url ? (
                          <a
                            href={location.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1.5 font-medium truncate"
                            title={location.text || location.url}
                          >
                            <span className="truncate">{location.text || location.url}</span>
                            <ExternalLink className="size-3.5 shrink-0" />
                          </a>
                        ) : (
                          <span className="truncate" title={location.text}>{location.text}</span>
                        )
                      ) : (
                        <span className="truncate" title={location}>{location}</span>
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground/50 flex items-baseline gap-2">
                    <span className="font-medium text-xs uppercase tracking-wide shrink-0 leading-none">Location:</span>
                    <span>—</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

