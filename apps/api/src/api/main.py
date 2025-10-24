from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from .routes import generation, auth, credits
from .middleware.rate_limit import setup_rate_limiting

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Wan 2.1 API",
    description="AI Video Generation API with GPU support",
    version="2.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(generation.router, prefix="/api/generation", tags=["generation"])
app.include_router(credits.router, prefix="/api/credits", tags=["credits"])

@app.get("/")
async def root():
    return {
        "name": "Wan 2.1 API",
        "version": "2.1.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
