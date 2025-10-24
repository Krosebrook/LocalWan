from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Supabase
    supabase_url: str
    supabase_service_role_key: str
    
    # Replicate
    replicate_api_key: str
    
    # Security
    jwt_secret: str = "your-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Rate Limiting
    rate_limit_max: int = 100
    rate_limit_window: int = 900  # 15 minutes in seconds
    
    # Redis (for rate limiting)
    redis_url: Optional[str] = None
    
    # GPU
    cuda_visible_devices: str = "0"
    model_cache_dir: str = "/tmp/models"
    
    class Config:
        env_file = ".env"

settings = Settings()
