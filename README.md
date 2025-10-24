# Wan 2.1 - AI Video Generation Platform

A modern, full-stack PWA monorepo for AI-powered video generation using Next.js 15, FastAPI, and Supabase.

## 🌟 Features

- **Text-to-Video Generation**: Create videos from text descriptions using AI
- **Image-to-Video Generation**: Animate your images with AI-powered video generation
- **50+ Prompt Templates**: Professional templates across multiple categories
- **Smart Suggestion Engine**: Get AI-powered prompt suggestions
- **Real-time Progress Tracking**: Monitor your video generation in real-time
- **Credit System**: Pay-as-you-go credit system for generations
- **Authentication**: Secure user authentication with Supabase
- **PWA Support**: Install as a native app with offline capabilities
- **Video Player**: Built-in video player with download functionality
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🏗️ Architecture

This is a monorepo built with Turborepo containing:

```
wan21-monorepo/
├── apps/
│   ├── web/          # Next.js 15 PWA (React 19, TypeScript, Tailwind)
│   └── api/          # FastAPI backend with GPU support
├── packages/
│   ├── ui/           # Shared UI components (shadcn/ui)
│   └── db/           # Database schema and utilities (Supabase)
└── turbo.json        # Turborepo configuration
```

## 🚀 Tech Stack

### Frontend (apps/web)
- **Framework**: Next.js 15 with App Router
- **React**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Validation**: Zod
- **State Management**: Zustand
- **PWA**: next-pwa

### Backend (apps/api)
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **AI Generation**: Replicate API
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Supabase Auth
- **Rate Limiting**: SlowAPI + Redis
- **Validation**: Pydantic

### Shared Packages
- **@wan/ui**: Reusable React components
- **@wan/db**: Database types, schemas, and utilities

## 📦 Prerequisites

- Node.js 18+ and npm 9+
- Python 3.10+
- Supabase account
- Replicate API key

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Krosebrook/LocalWan.git
cd LocalWan
```

### 2. Install dependencies

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies for API
cd apps/api
pip install -r requirements.txt
cd ../..
```

### 3. Set up environment variables

#### Root `.env` (copy from `.env.example`)
```bash
cp .env.example .env
```

#### Web app `.env.local`
```bash
cd apps/web
cp .env.example .env.local
# Edit .env.local with your Supabase and API credentials
```

#### API `.env`
```bash
cd apps/api
cp .env.example .env
# Edit .env with your Replicate and Supabase credentials
```

### 4. Set up the database

1. Create a new Supabase project
2. Run the SQL migration in `packages/db/schema.sql`
3. Update your `.env` files with Supabase credentials

### 5. Run the development servers

```bash
# Run all apps in development mode
npm run dev
```

This will start:
- Web app: http://localhost:3000
- API: http://localhost:8000

## 📝 Environment Variables

### Required for Web App

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
REPLICATE_API_KEY=your_replicate_api_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Required for API

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
REPLICATE_API_KEY=your_replicate_api_key
JWT_SECRET=your-secret-key
```

## 🏃‍♂️ Available Scripts

```bash
# Development
npm run dev          # Run all apps in dev mode
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run test         # Run tests

# Individual apps
cd apps/web && npm run dev    # Run web app only
cd apps/api && uvicorn src.api.main:app --reload  # Run API only
```

## 🗄️ Database Schema

The database includes:
- **users**: User profiles (extends Supabase auth)
- **credits**: Credit transactions and balance
- **generations**: Video generation records
- **prompt_templates**: Community prompt templates

All tables have Row Level Security (RLS) enabled for data protection.

## 🔐 Security Features

- **Input Validation**: Zod schemas for frontend, Pydantic for backend
- **Row Level Security**: Database-level access control
- **Rate Limiting**: API rate limiting to prevent abuse
- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Configured CORS policies
- **SQL Injection Prevention**: Parameterized queries via Supabase

## 🎨 UI Components

The `@wan/ui` package includes:
- Button
- Card
- Input
- Select
- Dialog
- Progress
- Toast
- Tabs
- VideoPlayer
- PromptTemplateCard

## 📱 PWA Features

- **Offline Mode**: Access generated videos offline
- **Install Prompt**: Install as a native app
- **Service Worker**: Automatic caching of assets
- **App Manifest**: Native app-like experience

## 🤖 AI Generation

Video generation powered by Replicate:
- **Text-to-Video**: Stable Video Diffusion
- **Image-to-Video**: Stable Video Diffusion
- **Configurable Settings**: FPS, duration, resolution

## 📊 Prompt Templates

50+ categorized templates:
- Nature & Landscapes
- Urban & Architecture
- Abstract & Artistic
- Animals & Wildlife
- Space & Sci-Fi
- Food & Culinary
- Technology & Innovation
- Fashion & Lifestyle
- Business & Corporate

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd apps/web
vercel deploy
```

### Backend (Docker + Cloud GPU)

```bash
cd apps/api
docker build -t wan-api .
docker run -p 8000:8000 wan-api
```

### Database (Supabase)

Already cloud-hosted when using Supabase.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Test specific package
cd packages/ui && npm run test
cd apps/api && pytest
```

## 📚 Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Replicate Docs](https://replicate.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [FastAPI](https://fastapi.tiangolo.com/) for the modern Python API framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Replicate](https://replicate.com/) for AI model hosting
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Turborepo](https://turbo.build/) for monorepo management

## 📞 Support

For support, email support@wan21.com or open an issue in the repository.

---

Built with ❤️ by the Wan team