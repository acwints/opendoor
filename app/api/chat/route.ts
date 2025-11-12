import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const JOB_DESCRIPTION_CONTEXT = `
Company: Opendoor - a real estate technology company that simplifies buying and selling homes.

About The Role:
Andrew would build products and systems that help Opendoor's teams and customers work better together. He'd partner deeply with sales, operations, and customer-facing teams to understand their challenges, then architect and ship solutions that meaningfully improve productivity, revenue outcomes, or customer experience.

This would be ideal for someone who doesn't wait for a spec, loves zero-to-one ambiguity, and wants to ship systems that actually get used daily by people who depend on them. He'd work directly with internal stakeholders and customers to explore what's possible and ensure the products built translate directly to realized business value.

The work would span customer-facing experiences, internal tools that make teams more effective, data infrastructure that surfaces insights, and systems that create leverage across the organization.

What Andrew Would Build:
- High-leverage applications: customer dashboards, seller insights, notification systems that make customers more engaged
- Internal systems & tools: sales enablement, operations automation, CRM integrations, reporting dashboards
- Data & measurement frameworks: analytics pipelines, performance tracking, knowledge bases that surface insights
- Platform experiences: APIs, integrations, systems that create interoperability

In This Role, Andrew Would:
- Partner deeply with teams to uncover high-impact problems and architect solutions
- Build & ship end-to-end - own problems from discovery through deployment
- Drive platform leverage by working with product teams to inform capabilities and close gaps
- Synthesize insights from real usage and feed them back to shape future development
- Scale knowledge through documentation, patterns, and technical resources

Less Focus On:
- Marketing operations: managing content calendars, writing copy, running campaigns
- Top-of-funnel acquisition: SEO, paid ads, lead generation tactics
- Isolated product features: different from building features in a vacuum - every project has business context
- Team/process management: leading through building and technical direction, not managing people

Success Would Be Measured By:
- Measurable improvements in customer engagement, retention, and lifetime value
- Productivity gains and time savings for internal teams
- Business impact: revenue outcomes, operational efficiency, customer satisfaction
- Adoption and daily usage - building things people actually depend on
- Speed and iteration velocity - shipping prototypes to production quickly
`;

const JOB_TITLE_SUMMARY = `Exploring how Andrew would fit at Opendoor in a role focused on building tools and systems that support teams and customers. The work would involve creating customer-facing experiences, internal tools for business teams, and data infrastructure - more about building systems that create leverage than managing campaigns or day-to-day operations.`;

const SYSTEM_INSTRUCTION = `You are an AI assistant helping explore how Andrew might fit at Opendoor. Your personality is professional, helpful, and concise. Always speak in third person about Andrew (e.g., "Andrew would", "He'd spend time").

Your knowledge base is limited to the role description provided. Don't invent information about Opendoor's specific culture, products, salary, or teams. If asked something outside the scope, politely say "I can only discuss what's outlined about how Andrew might fit in this role. Can I clarify anything about the focus areas or trade-offs?".

Always keep your answers short and to the point.

---
${JOB_DESCRIPTION_CONTEXT}
---
`;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!openai) {
      return NextResponse.json(
        { text: "AI assistant is not configured. Please add OPENAI_API_KEY to your environment." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, action } = body;

    if (action === 'remixTitle') {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Based on the following job summary, generate one creative and compelling alternative job title. Return ONLY the job title itself, without any introduction, punctuation, or quotation marks.\n\nJob Summary:\n${JOB_TITLE_SUMMARY}`
          }
        ],
        temperature: 0.9,
        max_tokens: 50,
      });

      const newTitle = completion.choices[0]?.message?.content?.trim().replace(/['"*.`]/g, '') || 'Product Innovation Leader';
      return NextResponse.json({ text: newTitle });
    } else {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_INSTRUCTION
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const text = completion.choices[0]?.message?.content || "I seem to be having some trouble connecting right now. Please try again in a moment.";
      return NextResponse.json({ text });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { text: "I seem to be having some trouble connecting right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
