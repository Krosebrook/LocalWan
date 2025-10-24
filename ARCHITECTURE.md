# Wan 2.1 Architecture

This document provides an overview of the Wan 2.1 architecture and design decisions.

## System Overview

Wan 2.1 is a full-stack AI video generation platform built as a monorepo using Turborepo. The system consists of:

1. **Frontend**: Next.js 15 PWA (React 19)
2. **Backend**: FastAPI with GPU support
3. **Database**: Supabase (PostgreSQL)
4. **AI Engine**: Replicate API
5. **Shared Packages**: UI components and database utilities

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Next.js 15 PWA (React 19)              │   │
│  │  - App Router                                   │   │
│  │  - Server Components                            │   │
│  │  - Client Components                            │   │
│  │  - Service Worker (Offline)                     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS/REST
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   FastAPI Backend                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Routes (Auth, Generation, Credits)            │   │
│  │          │                                      │   │
│  │          ▼                                      │   │
│  │  Services (Replicate, Supabase)                │   │
│  │          │                                      │   │
│  │          ▼                                      │   │
│  │  Middleware (Auth, Rate Limiting)              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
┌──────────────────────┐    ┌──────────────────────┐
│   Supabase (DB)      │    │   Replicate API      │
│  - PostgreSQL        │    │  - Video Generation  │
│  - Auth              │    │  - Model Hosting     │
│  - Row Level Security│    │  - GPU Processing    │
└──────────────────────┘    └──────────────────────┘
```

## Technology Stack

### Frontend Stack

**Framework**: Next.js 15
- App Router for file-based routing
- Server Components for improved performance
- React Server Actions for mutations
- Streaming and Suspense for better UX

**UI Library**: React 19
- Concurrent features
- Automatic batching
- Transitions API

**Styling**: Tailwind CSS + shadcn/ui
- Utility-first CSS framework
- Pre-built accessible components
- Customizable design system

**State Management**: Zustand
- Lightweight state management
- TypeScript support
- Simple API

**Validation**: Zod
- TypeScript-first schema validation
- Type inference
- Runtime validation

**PWA**: next-pwa
- Service Worker generation
- Offline support
- App manifest

### Backend Stack

**Framework**: FastAPI
- Async/await support
- Automatic API documentation
- Type hints with Pydantic
- High performance

**Validation**: Pydantic
- Data validation
- Settings management
- Type safety

**Authentication**: JWT + Supabase
- Secure token-based auth
- Integration with Supabase Auth

**Rate Limiting**: SlowAPI + Redis
- Prevent abuse
- Configurable limits
- Distributed rate limiting

**AI Integration**: Replicate
- Text-to-video models
- Image-to-video models
- GPU-accelerated inference

### Database Stack

**Database**: Supabase (PostgreSQL)
- Managed PostgreSQL
- Real-time subscriptions
- Built-in authentication

**Security**: Row Level Security (RLS)
- Table-level access control
- User-based policies
- PostgreSQL-native security

## Data Flow

### Video Generation Flow

1. **User Submits Prompt**
   ```
   User → Next.js → FastAPI
   ```

2. **Authentication & Validation**
   ```
   FastAPI → JWT Verification → Pydantic Validation
   ```

3. **Credit Check**
   ```
   FastAPI → Supabase → Check Credit Balance
   ```

4. **Create Generation Record**
   ```
   FastAPI → Supabase → Insert Generation (status: pending)
   ```

5. **AI Processing**
   ```
   FastAPI → Replicate API → Video Generation
   ```

6. **Update Record**
   ```
   Replicate → Webhook → FastAPI → Supabase (status: completed)
   ```

7. **Deduct Credits**
   ```
   FastAPI → Supabase → Insert Credit Transaction
   ```

8. **Return Result**
   ```
   FastAPI → Next.js → User
   ```

## Security Architecture

### Authentication Flow

1. User signs up/logs in via Supabase Auth
2. Supabase returns JWT access token
3. Client includes token in Authorization header
4. FastAPI validates token on each request
5. Request proceeds if token is valid

### Authorization

- **Row Level Security**: Database-level access control
- **JWT Claims**: User ID and email in token
- **API Middleware**: Token validation before route handlers

### Input Validation

**Frontend (Zod)**:
```typescript
const schema = z.object({
  prompt: z.string().min(10).max(2000),
  type: z.enum(["text_to_video", "image_to_video"])
});
```

**Backend (Pydantic)**:
```python
class GenerationRequest(BaseModel):
    prompt: str = Field(..., min_length=10, max_length=2000)
    type: GenerationType
```

### Rate Limiting

- Per-IP rate limiting (100 requests per 15 minutes)
- Optional Redis for distributed systems
- Configurable limits per endpoint

## Monorepo Structure

### Workspace Organization

```
wan21-monorepo/
├── apps/               # Applications
│   ├── web/           # Next.js PWA
│   └── api/           # FastAPI backend
├── packages/          # Shared packages
│   ├── ui/            # UI components
│   └── db/            # Database utilities
└── turbo.json         # Build orchestration
```

### Turborepo Pipeline

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Package Dependencies

```
@wan/ui ← apps/web
@wan/db ← apps/web, apps/api
```

## Scalability Considerations

### Horizontal Scaling

- **Frontend**: Vercel Edge Network (CDN)
- **Backend**: Multiple FastAPI instances behind load balancer
- **Database**: Supabase handles scaling automatically
- **AI Processing**: Replicate manages GPU resources

### Caching Strategy

- **Static Assets**: CDN caching (Vercel)
- **API Responses**: Redis caching (optional)
- **Database Queries**: PostgreSQL query cache
- **Generated Videos**: CDN storage (Supabase Storage)

### Performance Optimization

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **API Responses**: FastAPI async/await
- **Database**: Proper indexing (see schema.sql)

## Error Handling

### Frontend

```typescript
try {
  const result = await generateVideo(prompt);
} catch (error) {
  toast.error("Failed to generate video");
  console.error(error);
}
```

### Backend

```python
@router.post("/")
async def create_generation(request: GenerationRequest):
    try:
        # Process generation
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Monitoring & Logging

### Application Logs

- **Frontend**: Console logs + error tracking (Sentry)
- **Backend**: Structured logging (Python logging)

### Metrics

- **Performance**: Core Web Vitals (Next.js)
- **API**: Response times, error rates
- **Database**: Query performance (Supabase dashboard)

## Future Considerations

### Planned Improvements

1. **Real-time Updates**: WebSocket support for generation status
2. **Video Editor**: In-browser video editing
3. **Batch Processing**: Generate multiple videos at once
4. **Team Collaboration**: Share and collaborate on projects
5. **Advanced Analytics**: Usage insights and trends

### Technical Debt

- Complete Supabase integration in auth routes
- Add comprehensive test coverage
- Implement proper error boundaries
- Add request retry logic
- Implement webhook handling for async operations

## Development Workflow

### Local Development

1. Start Supabase local instance (optional)
2. Run `npm run dev` for frontend
3. Run `uvicorn` for backend
4. Use Replicate API for AI generation

### Testing Strategy

- **Unit Tests**: Jest (frontend), pytest (backend)
- **Integration Tests**: Playwright (E2E)
- **Manual Testing**: Local development

### CI/CD Pipeline

```
Git Push → GitHub Actions → Build → Test → Deploy
  ↓
  ├─ Lint
  ├─ Type Check
  ├─ Unit Tests
  ├─ Build
  └─ Deploy (Vercel + Cloud Run)
```

## Conclusion

Wan 2.1 is designed to be:
- **Scalable**: Handle growing user base
- **Secure**: Multiple layers of security
- **Performant**: Fast load times and generation
- **Maintainable**: Clean code and architecture
- **Extensible**: Easy to add new features

For questions or clarifications, please refer to other documentation files or open a discussion on GitHub.
