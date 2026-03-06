# ProtoPad

> Rapid prototyping environment designed for small development teams in startups.

**Status:** 🚧 In Development

## Problem
Developers often struggle with cumbersome coding environments that slow down the prototyping process. ProtoPad streamlines the setup and debugging process, enabling quicker iterations and improvements for small teams.

## MVP Features
- Lightweight code editor with live preview functionality
- Instant setup with default templates for common frameworks
- Integrated debugging tools tailored for rapid feedback
- Collaboration features allowing real-time code sharing
- Version control integration with Git for easy tracking

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
The choice of Next.js allows for rapid development with built-in API routes, handling both frontend and backend logic seamlessly. Using Supabase streamlines the authentication and database setup, simplifying data management and accelerating delivery within the 4-week timeframe.

## User Stories
- Lightweight Code Editor
- Instant Setup with Templates
- Integrated Debugging Tools
- Real-Time Code Collaboration
- Version Control Integration
- User Authentication
- Pricing Model

## Launch Checklist
- [ ] Finalize UI/UX designs
- [ ] Set up Auth0 for user authentication
- [ ] Build the landing page with signup form
- [ ] Create the core functionality of the code editor

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```