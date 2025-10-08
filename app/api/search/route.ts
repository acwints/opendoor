import { NextResponse } from "next/server";
import OpenAI from "openai";

const defaultResponse = {
  summary:
    "Here's a quick overview of opportunities around your home. You can refinance to unlock equity, explore mid-grade upgrades, and time a listing when demand peaks.",
  insights: [
    {
      title: "Equity lever",
      detail: "Refinancing at 5.7% could free up roughly $120k in equity for improvements or a bridge move without selling first.",
    },
    {
      title: "Listing timing",
      detail: "Austin listings in your ZIP are receiving 2.1 offers on average when listed in late spring with condition scores above 80.",
    },
  ],
  recommendations: [
    "Capture updated photos after flooring refresh to improve digital curb appeal.",
    "Review comps within 0.5 miles weekly to monitor pricing momentum.",
  ],
};

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  const { query, context } = await request.json().catch(() => ({ query: "", context: {} }));

  if (!query || typeof query !== "string") {
    return NextResponse.json(
      { error: "Missing query" },
      {
        status: 400,
      },
    );
  }

  if (!openai) {
    return NextResponse.json(defaultResponse);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert Opendoor home advisor helping homeowners maximize their property value and make informed real estate decisions. Analyze the provided home data and user question to give actionable, data-driven insights. Always respond with valid JSON containing: summary (string, 1-2 sentences overview), insights (array of {title, detail} with 2-3 key data points), and recommendations (array of 2-4 actionable next steps). Be professional, concise, and focus on equity opportunities, market timing, and home improvements.",
        },
        {
          role: "user",
          content: `Home Context: ${JSON.stringify(context)}\n\nQuestion: ${query}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(defaultResponse);
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI search error", error);
    return NextResponse.json(defaultResponse, { status: 200 });
  }
}
