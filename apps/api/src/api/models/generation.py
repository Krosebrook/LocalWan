from pydantic import BaseModel, Field
from typing import Optional, Literal
from enum import Enum

class GenerationType(str, Enum):
    TEXT_TO_VIDEO = "text_to_video"
    IMAGE_TO_VIDEO = "image_to_video"

class GenerationStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class VideoSettings(BaseModel):
    duration: int = Field(default=5, ge=1, le=10, description="Video duration in seconds")
    fps: int = Field(default=24, ge=12, le=60, description="Frames per second")
    resolution: Literal["720p", "1080p"] = Field(default="720p", description="Video resolution")

class GenerationRequest(BaseModel):
    type: GenerationType
    prompt: str = Field(..., min_length=10, max_length=2000, description="Generation prompt")
    image_url: Optional[str] = Field(None, description="Source image URL for I2V")
    settings: Optional[VideoSettings] = None

class GenerationResponse(BaseModel):
    id: str
    user_id: str
    type: GenerationType
    status: GenerationStatus
    prompt: str
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    credits_used: int
    created_at: str
    updated_at: str
