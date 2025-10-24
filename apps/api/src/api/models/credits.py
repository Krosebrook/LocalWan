from pydantic import BaseModel
from typing import Literal

class CreditTransaction(BaseModel):
    amount: int
    transaction_type: Literal["purchase", "usage", "refund"]
    description: str

class CreditBalance(BaseModel):
    user_id: str
    balance: int
