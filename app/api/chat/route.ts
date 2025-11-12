import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const JOB_DESCRIPTION_CONTEXT = `
Company: Opendoor - a real estate technology company that simplifies buying and selling homes.
Focus: Exploring how Andrew would fit in a role building tools and systems that support teams and customers.

Role Summary:
Andrew would work at the intersection of engineering and business impact. He'd spend time with customers, sales, and operations teams to understand their workflows, then build technical solutions that drive measurable improvements. This means creating customer-facing tools, internal systems, and data infrastructure that help people work better and engage more deeply.

The work would lean more toward building systems that enable others (dashboards, automation, analytics) than managing content calendars or running acquisition campaigns. Examples: creating tools that make sales teams more effective, building features that increase customer engagement, or developing data pipelines that surface actionable insights.

Potential Success Metrics:
- Customer engagement and lifetime value improvements
- Team efficiency gains from tools built
- Data adoption and usage by stakeholders
- Speed from idea to shipped solution

Andrew Would Spend More Time:
- Building customer experiences: seller dashboards, personalized insights, engagement tools
- Enabling internal teams: CRM integrations, workflow automation, reporting that surfaces insights
- Working with data: analytics pipelines, performance tracking, trend analysis
- Customer & team interaction: understanding workflows through direct observation and feedback
- Rapid prototyping: moving fast from idea to working solution, iterating based on what works

Andrew Would Spend Less Time:
- Campaign & content management: less focus on content calendars, marketing copy, or ad campaigns
- Acquisition & lead gen: less emphasis on SEO, paid acquisition, or top-of-funnel tactics
- Core product features: different from building features in isolation - every project connects to business impact
- Large team management: leading through building and technical direction rather than managing a large team
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
