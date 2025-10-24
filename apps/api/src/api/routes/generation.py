from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid
from datetime import datetime

from ..models.generation import GenerationRequest, GenerationResponse, GenerationStatus
from ..services.replicate_service import ReplicateService
from ..middleware.auth import get_current_user

router = APIRouter()
replicate_service = ReplicateService()

@router.post("/", response_model=GenerationResponse)
async def create_generation(
    request: GenerationRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new video generation request
    """
    try:
        # Create generation record
        generation_id = str(uuid.uuid4())
        
        # Start the generation process (async)
        # In production, this would use Replicate API
        video_url = await replicate_service.generate_video(
            prompt=request.prompt,
            generation_type=request.type,
            image_url=request.image_url,
            settings=request.settings
        )
        
        # Calculate credits used (example: 10 credits per video)
        credits_used = 10
        
        response = GenerationResponse(
            id=generation_id,
            user_id=current_user["id"],
            type=request.type,
            status=GenerationStatus.PROCESSING,
            prompt=request.prompt,
            video_url=video_url,
            thumbnail_url=None,
            credits_used=credits_used,
            created_at=datetime.utcnow().isoformat(),
            updated_at=datetime.utcnow().isoformat()
        )
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{generation_id}", response_model=GenerationResponse)
async def get_generation(
    generation_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get status of a generation request
    """
    # TODO: Implement fetching from database
    raise HTTPException(status_code=404, detail="Generation not found")

@router.get("/", response_model=List[GenerationResponse])
async def list_generations(
    current_user: dict = Depends(get_current_user),
    limit: int = 10,
    offset: int = 0
):
    """
    List user's generations
    """
    # TODO: Implement fetching from database
    return []
