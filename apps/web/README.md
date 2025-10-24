# Wan 2.1 Web App

Next.js 15 PWA for AI video generation.

## Features

- **Next.js 15**: Latest features with App Router
- **React 19**: Cutting-edge React features
- **PWA**: Progressive Web App with offline support
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Beautiful, accessible components
- **TypeScript**: Type-safe development

## Getting Started

### Install Dependencies

```bash
npm install
```

### Set Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
REPLICATE_API_KEY=your_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── dashboard/    # Dashboard page
│   ├── templates/    # Templates page
│   └── auth/         # Authentication pages
├── components/       # React components
├── lib/              # Utilities and helpers
└── hooks/            # Custom React hooks
```

## Building for Production

```bash
npm run build
npm start
```

## PWA Features

The app is configured as a Progressive Web App:
- **Installable**: Users can install it on their devices
- **Offline Mode**: Works without internet connection
- **Service Worker**: Automatic caching of assets
- **App Manifest**: Native app-like experience

## UI Components

Uses shadcn/ui components from `@wan/ui` package:
- Button, Card, Input, Select
- Dialog, Progress, Toast, Tabs
- VideoPlayer, PromptTemplateCard

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Other Platforms

Build the app and deploy the `.next` folder:

```bash
npm run build
# Deploy .next, public, and package.json
```

## Environment Variables

Required for production:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `REPLICATE_API_KEY`
- `NEXT_PUBLIC_API_URL`
