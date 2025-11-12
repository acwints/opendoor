# Careers Page Setup

This document describes the new Careers page added to the Opendoor application, inspired by the Gruns application.

## Overview

A new `/careers` page has been added that showcases the "Head of Product Innovation" role at Opendoor. The page includes:
- **Tabbed interface** with 4 sections: Role Details, Responsibilities, Requirements, and Team & Culture
- Job description with **dynamic title remix feature** using AI
- Interactive **AI chat assistant** to answer questions about the role
- Floating chat bubble interface
- Opendoor-branded styling using the existing design system

## Files Added

### Components (`/components/careers/`)
- `careers-tabs.tsx` - Tab navigation and content components (CareersNav, CareersTabs)
- `BotIcon.tsx` - Bot avatar icon for chat messages
- `ChatIcon.tsx` - Chat bubble icon
- `SendIcon.tsx` - Send button icon
- `CloseIcon.tsx` - Close button icon
- `CheckIcon.tsx` - Checkmark icon for in-scope items
- `XIcon.tsx` - X icon for out-of-scope items
- `ChatBubble.tsx` - Floating chat button component
- `InteractiveChat.tsx` - Chat interface modal component
- `JobDescription.tsx` - Legacy job description component (replaced by careers-tabs.tsx)

### Pages
- `/app/careers/page.tsx` - Main careers page

### API Routes
- `/app/api/chat/route.ts` - API endpoint for OpenAI integration

### Types
- `/lib/types/chat.ts` - TypeScript types for chat messages

## Setup Instructions

### 1. Prerequisites
The page uses the existing OpenAI API key that's already configured for the project. No additional setup is needed if you already have `OPENAI_API_KEY` in your `.env.local` file.

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Access the Page
Navigate to `http://localhost:3000/careers` or click "Careers" in the header navigation.

## Features

### Tabbed Interface
The careers page is organized into 4 tabs:
- **Role Details** - Role summary, KPIs, and compensation/benefits
- **Responsibilities** - In-scope priorities and out-of-scope duties
- **Requirements** - Required/preferred qualifications and technical skills
- **Team & Culture** - Team structure, company culture, work environment, and why Opendoor

### Job Title Remix
Click the 🔄 button next to the job title to generate creative alternative titles using AI.

### Interactive Chat Assistant
- Click the floating "Ask AI" button to open the chat
- Ask questions about the role, responsibilities, KPIs, etc.
- The AI assistant is trained specifically on the job description content
- Includes suggested questions for quick access

## Customization

### Adapting for Opendoor
The content has been adapted from Gruns (health gummies e-commerce) to Opendoor (real estate technology):
- Company context changed to real estate focus
- Role adapted to "Head of Product Innovation"
- Messaging adjusted for customer journey and home transactions
- Color scheme uses Opendoor's primary red brand color
- Follows Opendoor's existing design system

### Job Description
To update the job description, edit the `JOB_DESCRIPTION_CONTEXT` constant in:
- `/app/api/chat/route.ts` - For the AI chat knowledge base
- `/components/careers/JobDescription.tsx` - For the visual content

## Technical Details

### Styling
- Uses Tailwind CSS with Opendoor's design system colors
- Responsive design with mobile-first approach
- Animations for chat open/close

### AI Integration
- Uses OpenAI GPT-4o-mini model (same as the existing AI search feature)
- Context-limited responses based on job description
- Handles errors gracefully with fallback messages

### Navigation
The header has been updated to include a "Careers" link that becomes active when on the careers page.
