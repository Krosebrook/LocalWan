from fastapi import APIRouter, HTTPException, Depends

from ..models.credits import CreditBalance, CreditTransaction
from ..middleware.auth import get_current_user

router = APIRouter()

@router.get("/balance", response_model=CreditBalance)
async def get_credit_balance(current_user: dict = Depends(get_current_user)):
    """
    Get user's credit balance
    """
    # TODO: Implement fetching from database
    return CreditBalance(
        user_id=current_user["id"],
        balance=100
    )

@router.post("/purchase")
async def purchase_credits(
    amount: int,
    current_user: dict = Depends(get_current_user)
):
    """
    Purchase credits
    """
    # TODO: Implement payment processing
    raise HTTPException(status_code=501, detail="Payment not implemented")
