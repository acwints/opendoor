"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface HyperlinkData {
  text: string;
  url: string | null;
}

interface Opportunity {
  [key: string]: string | HyperlinkData;
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <CardDescription>Loading opportunities...</CardDescription>
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
            <CardDescription className="text-destructive">{error}</CardDescription>
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
            <CardDescription>No opportunities found.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Helper to get column value (handles both string and hyperlink data)
  const getColumnValue = (row: Opportunity, columnName: string): string | HyperlinkData | null => {
    // Try exact match first
    if (row[columnName]) return row[columnName] as string | HyperlinkData;
    
    // Try case-insensitive match
    const key = Object.keys(row).find(
      (k) => k.toLowerCase() === columnName.toLowerCase()
    );
    return key ? (row[key] as string | HyperlinkData) : null;
  };

  // Helper to check if value is hyperlink data
  const isHyperlink = (value: string | HyperlinkData | null): value is HyperlinkData => {
    return typeof value === "object" && value !== null && "text" in value && "url" in value;
  };

  // Get primary fields for card display
  const getPrimaryField = (opp: Opportunity): string => {
    // Try common title/name fields
    const titleFields = ["title", "name", "opportunity", "issue", "task"];
    for (const field of titleFields) {
      const value = getColumnValue(opp, field);
      if (value && typeof value === "string" && value.trim()) {
        return value;
      }
    }
    // Fallback to first non-empty string field
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 lg:px-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Opportunities</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Issue tracker pulling from Google Sheets
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {opportunities.length} {opportunities.length === 1 ? "opportunity" : "opportunities"} found
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <CardHeader className="flex-shrink-0 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg leading-tight font-semibold text-foreground pr-2">
                    {primaryField}
                  </CardTitle>
                  {status && (
                    <Badge variant={getStatusBadgeVariant(status)} className="shrink-0">
                      {status}
                    </Badge>
                  )}
                </div>
                {priority && (
                  <div className="mt-3">
                    <span className={cn("text-xs font-semibold uppercase tracking-wide", getPriorityColor(priority))}>
                      {priority} Priority
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 space-y-3 pt-0">
                {Object.entries(opportunity).map(([key, value]) => {
                  // Skip already displayed fields
                  const lowerKey = key.toLowerCase();
                  if (
                    lowerKey === "status" ||
                    lowerKey === "priority" ||
                    lowerKey === "location" ||
                    (typeof value === "string" && value === primaryField)
                  ) {
                    return null;
                  }

                  // Skip empty values
                  if (typeof value === "string" && !value.trim()) {
                    return null;
                  }
                  if (isHyperlink(value) && !value.text.trim()) {
                    return null;
                  }

                  return (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{key}:</span>{" "}
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
                
                {/* Location field with hyperlink support */}
                {location && (
                  <div className="text-sm pt-1 border-t border-border/40">
                    <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">Location:</span>{" "}
                    <span className="text-foreground">
                      {isHyperlink(location) ? (
                        location.url ? (
                          <a
                            href={location.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1.5 font-medium"
                          >
                            {location.text || location.url}
                            <ExternalLink className="size-3.5" />
                          </a>
                        ) : (
                          <span>{location.text}</span>
                        )
                      ) : (
                        <span>{location}</span>
                      )}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        </div>
      </div>
    </div>
  );
}

