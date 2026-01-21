from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    email: EmailStr
    password: str
    gender: Optional[str] = None
    age: Optional[int] = None

    # 🔐 Forgot password fields
    reset_token: Optional[str] = None
    reset_token_expiry: Optional[datetime] = None