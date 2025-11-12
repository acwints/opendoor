import { NextResponse } from "next/server";

const SPREADSHEET_ID = "1jYhSlvDi9_w23T1Oy6EOTQC0xVrTcuRZtYgw4a8N5bE";
const SHEET_ID = "0"; // gid=0

export async function GET() {
  try {
    // Using the public CSV export endpoint for Google Sheets
    // This works for public spreadsheets without authentication
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;
    
    const response = await fetch(csvUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch spreadsheet: ${response.statusText}`);
    }

    const csvText = await response.text();
    
    // Parse CSV - improved parser that handles quoted fields with commas
    const parseCSVLine = (line: string): string[] => {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            // Escaped quote
            current += '"';
            i++; // Skip next quote
          } else {
            // Toggle quote state
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim()); // Add last value
      return values;
    };

    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length === 0) {
      return NextResponse.json({ data: [] });
    }

    // First line is headers
    const headers = parseCSVLine(lines[0]).map((h) => h.replace(/^"|"$/g, "").trim());
    
    // Helper function to extract hyperlink from Google Sheets format
    // Google Sheets CSV may export hyperlinks as =HYPERLINK("url","text") or just URLs
    const extractHyperlink = (value: string): { text: string; url: string | null } => {
      const trimmed = value.replace(/^"|"$/g, "").trim();
      
      // Check for HYPERLINK formula format: =HYPERLINK("url","text")
      const hyperlinkMatch = trimmed.match(/^=HYPERLINK\("([^"]+)","([^"]+)"\)$/i);
      if (hyperlinkMatch) {
        return { text: hyperlinkMatch[2], url: hyperlinkMatch[1] };
      }
      
      // Check if it's a URL
      const urlPattern = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/i;
      if (urlPattern.test(trimmed)) {
        const url = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
        return { text: trimmed, url };
      }
      
      // Check if text contains a URL
      const urlInTextMatch = trimmed.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/i);
      if (urlInTextMatch) {
        const url = urlInTextMatch[0].startsWith("http") ? urlInTextMatch[0] : `https://${urlInTextMatch[0]}`;
        return { text: trimmed, url };
      }
      
      return { text: trimmed, url: null };
    };

    // Parse remaining rows
    const rows = lines.slice(1).map((line) => {
      const values = parseCSVLine(line);
      const row: Record<string, string | { text: string; url: string | null }> = {};
      headers.forEach((header, index) => {
        const rawValue = values[index]?.replace(/^"|"$/g, "").trim() || "";
        
        // Check if this is the Location column (case-insensitive)
        if (header.toLowerCase() === "location" && rawValue) {
          row[header] = extractHyperlink(rawValue);
        } else {
          row[header] = rawValue;
        }
      });
      return row;
    }).filter((row) => {
      // Filter out completely empty rows
      return Object.values(row).some((val) => {
        if (typeof val === "string") return val.trim() !== "";
        if (typeof val === "object" && val !== null && "text" in val) {
          return val.text.trim() !== "";
        }
        return false;
      });
    });

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { error: "Failed to fetch opportunities data" },
      { status: 500 }
    );
  }
}

