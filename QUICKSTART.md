# Quick Start Guide

Get Wan 2.1 up and running in minutes!

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Python 3.10+ installed (`python --version`)
- [ ] Git installed (`git --version`)
- [ ] A [Supabase](https://supabase.com) account
- [ ] A [Replicate](https://replicate.com) API key

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Krosebrook/LocalWan.git
cd LocalWan

# Install Node.js dependencies
npm install

# Install Python dependencies
cd apps/api
pip install -r requirements.txt
cd ../..
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **Settings** → **API**
3. Copy the following:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)
4. Go to **SQL Editor** and run the migration:
   - Copy the contents of `packages/db/schema.sql`
   - Paste and execute in the SQL Editor

### 3. Get Replicate API Key

1. Go to [replicate.com](https://replicate.com)
2. Sign up or log in
3. Go to your [account settings](https://replicate.com/account/api-tokens)
4. Create a new API token

### 4. Configure Environment Variables

#### Root `.env`
```bash
cp .env.example .env
# Edit with your credentials
```

#### Web App `.env.local`
```bash
cd apps/web
cp .env.example .env.local

# Edit apps/web/.env.local:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
REPLICATE_API_KEY=your_replicate_key
NEXT_PUBLIC_API_URL=http://localhost:8000

cd ../..
```

#### API `.env`
```bash
cd apps/api
cp .env.example .env

# Edit apps/api/.env:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
REPLICATE_API_KEY=your_replicate_key
JWT_SECRET=change-this-to-a-random-secret

cd ../..
```

### 5. Start Development Servers

#### Option A: All Services (Recommended)
```bash
# From the root directory
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000 (if configured)

#### Option B: Individual Services

**Frontend only:**
```bash
cd apps/web
npm run dev
```

**Backend only:**
```bash
cd apps/api
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

### 6. Access the Application

Open your browser and navigate to:
- **Web App**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs (if running backend)

## First Steps

1. **Create an Account**
   - Click "Sign In" in the header
   - Use Supabase Auth (email or OAuth)

2. **Explore Templates**
   - Navigate to "Browse Templates"
   - Browse 50+ pre-made prompt templates
   - Select one to use

3. **Generate Your First Video**
   - Go to Dashboard
   - Enter a prompt or use a template
   - Click "Generate Video"
   - Watch the progress bar

4. **Install as PWA** (Optional)
   - Look for the install prompt in your browser
   - Install Wan 2.1 as a desktop/mobile app
   - Enjoy offline access to generated videos

## Common Issues

### Port Already in Use

If port 3000 or 8000 is already in use:

```bash
# For Next.js (use different port)
cd apps/web
PORT=3001 npm run dev

# For FastAPI
cd apps/api
uvicorn src.api.main:app --reload --port 8001
```

### Module Not Found

If you get module not found errors:

```bash
# Clear all node_modules and reinstall
npm run clean
npm install

# For Python
cd apps/api
pip install -r requirements.txt --force-reinstall
```

### Database Connection Issues

- Verify Supabase credentials are correct
- Check that the SQL schema was executed
- Ensure RLS policies are enabled

### Replicate API Errors

- Verify your API key is correct
- Check you have credits in your Replicate account
- Review rate limits on your account

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Edit files and save
- Changes appear automatically
- No need to restart servers

### View API Documentation

FastAPI provides interactive API docs:
- Go to http://localhost:8000/docs
- Test endpoints directly in the browser
- View request/response schemas

### Database Management

Use Supabase Studio:
- Go to your Supabase dashboard
- Use Table Editor to view/edit data
- Use SQL Editor for custom queries
- Monitor real-time logs

## Next Steps

1. **Read Documentation**
   - [README.md](./README.md) - Overview and features
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guide

2. **Explore the Code**
   - Frontend: `apps/web/src/app/`
   - Backend: `apps/api/src/api/`
   - UI Components: `packages/ui/src/`
   - Database: `packages/db/src/`

3. **Customize**
   - Add your own prompt templates
   - Customize the UI theme
   - Add new features
   - Deploy to production

## Production Deployment

### Frontend (Vercel)

```bash
cd apps/web
vercel deploy
```

### Backend (Cloud Provider)

Deploy to any cloud platform with GPU support:
- Google Cloud Run
- AWS EC2 with GPU
- Azure with GPU VMs
- DigitalOcean with GPU Droplets

### Database

Supabase is already production-ready when using their hosted service.

## Need Help?

- 📖 Read the [full documentation](./README.md)
- 🐛 [Open an issue](https://github.com/Krosebrook/LocalWan/issues)
- 💬 Ask questions in [Discussions](https://github.com/Krosebrook/LocalWan/discussions)
- 📧 Email: support@wan21.com

---

Happy building! 🚀
