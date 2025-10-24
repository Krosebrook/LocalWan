import replicate
from typing import Optional
from ..config import settings
from ..models.generation import GenerationType, VideoSettings

class ReplicateService:
    def __init__(self):
        self.client = replicate.Client(api_token=settings.replicate_api_key)
    
    async def generate_video(
        self,
        prompt: str,
        generation_type: GenerationType,
        image_url: Optional[str] = None,
        settings: Optional[VideoSettings] = None
    ) -> Optional[str]:
        """
        Generate video using Replicate API
        """
        try:
            if generation_type == GenerationType.TEXT_TO_VIDEO:
                # Use a text-to-video model (example: Stable Video Diffusion)
                output = self.client.run(
                    "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
                    input={
                        "prompt": prompt,
                        "num_frames": (settings.duration * settings.fps) if settings else 120,
                    }
                )
            else:
                # Image-to-video generation
                if not image_url:
                    raise ValueError("Image URL required for image-to-video generation")
                
                output = self.client.run(
                    "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
                    input={
                        "image": image_url,
                        "motion_bucket_id": 127,
                    }
                )
            
            # Extract video URL from output
            if isinstance(output, list) and len(output) > 0:
                return str(output[0])
            elif isinstance(output, str):
                return output
            
            return None
        except Exception as e:
            print(f"Error generating video: {e}")
            raise
