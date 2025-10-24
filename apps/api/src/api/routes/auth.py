from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta
from jose import jwt

from ..models.auth import UserLogin, UserRegister, TokenResponse
from ..config import settings

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """
    Authenticate user and return access token
    """
    # TODO: Implement Supabase authentication
    # For now, return a mock token
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    expire = datetime.utcnow() + access_token_expires
    
    to_encode = {
        "sub": "user-id-placeholder",
        "email": credentials.email,
        "exp": expire
    }
    
    access_token = jwt.encode(
        to_encode,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )
    
    return TokenResponse(
        access_token=access_token,
        user_id="user-id-placeholder"
    )

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister):
    """
    Register a new user
    """
    # TODO: Implement Supabase user creation
    raise HTTPException(status_code=501, detail="Registration not implemented")

@router.post("/logout")
async def logout():
    """
    Logout user
    """
    return {"message": "Logged out successfully"}
