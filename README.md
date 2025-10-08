# Opendoor Home Dashboard

A Next.js prototype dashboard experience for homeowners to monitor home value, condition, comps, and get AI-powered insights.

## Features

- 📊 **Home Value Tracking** - Monitor estimated home value with historical trends
- 🏠 **Condition Monitoring** - Track home health across key systems (roof, HVAC, etc.)
- 📍 **Market Insights** - View comparable sales and market data on interactive maps
- 🤖 **AI Assistant** - Get personalized insights powered by OpenAI
- 🛠️ **Home Services** - Manage maintenance schedule, budget, and helper team
- 🏘️ **Neighborhood Updates** - Stay connected with local community updates

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **UI:** Tailwind CSS + shadcn/ui components
- **AI:** OpenAI GPT-4o-mini
- **Maps:** Leaflet with OpenStreetMap
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/acwints/opendoor.git
cd opendoor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI assistant | Yes |

## Project Structure

```
opendoor/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Feature components
├── data/                 # Mock data
│   └── homeData.ts       # Home data model
└── lib/                  # Utilities
    └── utils.ts          # Helper functions
```

## Design System

### Colors (Opendoor Branding)

- **Primary:** Red (#E01A00) - Opendoor's signature color
- **Background:** Off-white (#FAFAFA)
- **Foreground:** Dark gray (#333333)

### Typography

- **Font:** Geist Sans & Geist Mono
- **Headings:** Bold, uppercase tracking
- **Body:** Regular weight, comfortable line height

### Components

Built with shadcn/ui for consistency:
- Cards, Buttons, Progress bars
- Tables, Sliders
- Custom map and chart components

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The app is currently deployed at: [https://opendoor-cadqtj2do-winter-advisory.vercel.app](https://opendoor-cadqtj2do-winter-advisory.vercel.app)

## API Routes

### POST /api/search

AI-powered search endpoint for home insights.

**Request:**
```json
{
  "query": "How can I unlock more equity?",
  "context": {
    "currentValue": 645000,
    "comps": [...],
    "condition": {...}
  }
}
```

**Response:**
```json
{
  "summary": "Overview of opportunities...",
  "insights": [
    {"title": "Equity lever", "detail": "..."}
  ],
  "recommendations": ["Action 1", "Action 2"]
}
```

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT

## Credits

Built with [Claude Code](https://claude.com/claude-code)
