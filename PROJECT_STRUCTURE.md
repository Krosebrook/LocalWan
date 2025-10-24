# Project Structure

Complete file structure of the Wan 2.1 monorepo.

## Overview

```
wan21-monorepo/
├── apps/                       # Applications
│   ├── web/                   # Next.js 15 PWA
│   └── api/                   # FastAPI Backend
├── packages/                   # Shared Packages
│   ├── ui/                    # UI Components
│   └── db/                    # Database Utilities
└── [config files]             # Root configuration
```

## Detailed Structure

### Root Level
```
LocalWan/
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier configuration
├── package.json             # Root package.json (workspaces)
├── tsconfig.json            # Shared TypeScript config
├── turbo.json               # Turborepo configuration
├── README.md                # Main documentation
├── QUICKSTART.md            # Quick setup guide
├── ARCHITECTURE.md          # System architecture
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # MIT License
└── PROJECT_STRUCTURE.md     # This file
```

### Frontend App (apps/web/)
```
apps/web/
├── public/
│   └── manifest.json        # PWA manifest
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── page.tsx        # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard page
│   │   ├── templates/
│   │   │   └── page.tsx            # Templates browse page
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Home page
│   ├── components/                  # React components
│   ├── lib/
│   │   └── prompt-templates.ts     # 50+ templates
│   └── hooks/                       # Custom hooks
├── .env.example              # Environment template
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.js        # PostCSS config
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
└── README.md                # Web app documentation
```

### Backend API (apps/api/)
```
apps/api/
├── src/
│   └── api/
│       ├── middleware/
│       │   ├── __init__.py
│       │   ├── auth.py              # JWT authentication
│       │   └── rate_limit.py        # Rate limiting
│       ├── models/
│       │   ├── __init__.py
│       │   ├── auth.py              # Auth models
│       │   ├── credits.py           # Credit models
│       │   └── generation.py        # Generation models
│       ├── routes/
│       │   ├── __init__.py
│       │   ├── auth.py              # Auth endpoints
│       │   ├── credits.py           # Credit endpoints
│       │   └── generation.py        # Generation endpoints
│       ├── services/
│       │   ├── __init__.py
│       │   └── replicate_service.py # Replicate integration
│       ├── __init__.py
│       ├── config.py                # Configuration
│       └── main.py                  # FastAPI app
├── .env.example              # Environment template
├── pyproject.toml           # Python project config
├── requirements.txt         # Python dependencies
└── README.md                # API documentation
```

### UI Package (packages/ui/)
```
packages/ui/
├── src/
│   ├── components/
│   │   ├── button.tsx              # Button component
│   │   ├── card.tsx                # Card component
│   │   ├── dialog.tsx              # Dialog component
│   │   ├── input.tsx               # Input component
│   │   ├── progress.tsx            # Progress component
│   │   ├── prompt-template.tsx     # Template card component
│   │   ├── select.tsx              # Select component
│   │   ├── tabs.tsx                # Tabs component
│   │   ├── toast.tsx               # Toast component
│   │   └── video-player.tsx        # Video player component
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   └── index.ts                     # Package exports
├── .eslintrc.json           # ESLint config
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

### Database Package (packages/db/)
```
packages/db/
├── src/
│   ├── schemas/
│   │   └── index.ts                # Zod schemas
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── client.ts                   # Supabase client
│   └── index.ts                    # Package exports
├── schema.sql                      # Database schema with RLS
├── .eslintrc.json           # ESLint config
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

## Key Features by Location

### Authentication & Security
- `apps/api/src/api/middleware/auth.py` - JWT validation
- `apps/api/src/api/routes/auth.py` - Auth endpoints
- `apps/web/src/app/auth/login/page.tsx` - Login UI
- `packages/db/schema.sql` - RLS policies

### Video Generation
- `apps/api/src/api/routes/generation.py` - Generation endpoints
- `apps/api/src/api/services/replicate_service.py` - AI integration
- `apps/web/src/app/dashboard/page.tsx` - Generation UI

### Templates System
- `apps/web/src/lib/prompt-templates.ts` - 50+ templates
- `apps/web/src/app/templates/page.tsx` - Template browser
- `packages/ui/src/components/prompt-template.tsx` - Template card

### UI Components
- `packages/ui/src/components/` - 10+ reusable components
- All built with Radix UI + Tailwind CSS
- Fully typed with TypeScript

### Database & State
- `packages/db/schema.sql` - PostgreSQL schema
- `packages/db/src/types/` - Database types
- `packages/db/src/schemas/` - Validation schemas

## Technology Matrix

| Component | Technology | Location |
|-----------|-----------|----------|
| Frontend Framework | Next.js 15 | apps/web |
| UI Library | React 19 | apps/web |
| Styling | Tailwind CSS | apps/web |
| Components | shadcn/ui | packages/ui |
| Backend Framework | FastAPI | apps/api |
| AI Generation | Replicate | apps/api |
| Database | Supabase | packages/db |
| Auth | JWT + Supabase | apps/api, apps/web |
| Validation | Zod + Pydantic | packages/db, apps/api |
| Monorepo | Turborepo | root |

## Lines of Code

- TypeScript/TSX: ~22 files
- Python: ~16 files
- Configuration: ~16 files
- SQL: 1 comprehensive schema
- Documentation: 5 markdown files

## Import Paths

The monorepo uses workspace imports:

```typescript
// In apps/web
import { Button, Card } from "@wan/ui";
import { getSupabaseClient } from "@wan/db";
```

```python
# In apps/api
from api.models import GenerationRequest
from api.services import ReplicateService
```

## Build Outputs

```
.next/                  # Next.js build
dist/                   # TypeScript build
__pycache__/           # Python cache
node_modules/          # Dependencies
```

## Environment Files

```
.env                   # Root (not committed)
apps/web/.env.local   # Web app (not committed)
apps/api/.env         # API (not committed)

.env.example          # Templates (committed)
apps/web/.env.example
apps/api/.env.example
```

---

For detailed information about each component, see the respective README files in each directory.
