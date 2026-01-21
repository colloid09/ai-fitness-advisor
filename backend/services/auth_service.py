from fastapi import APIRouter, HTTPException, Body
from datetime import datetime, timedelta
import secrets
from passlib.context import CryptContext

from backend.database import users_collection
from backend.services.email_service import send_reset_email


# ✅ Router (THIS WAS MISSING)
router = APIRouter(prefix="/auth", tags=["Auth"])


# ✅ Password hashing (Argon2)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)


# ================= FORGOT PASSWORD =================
@router.post("/forgot-password")
def forgot_password(email: str = Body(..., embed=True)):
    user = users_collection.find_one({"email": email})

    # Security: don't reveal if user exists
    if not user:
        return {"message": "If email exists, reset link sent"}

    token = secrets.token_urlsafe(32)
    expiry = datetime.utcnow() + timedelta(minutes=15)

    users_collection.update_one(
        {"email": email},
        {"$set": {
            "reset_token": token,
            "reset_token_expiry": expiry
        }}
    )

    reset_link = f"http://localhost:3000/reset-password/{token}"
    send_reset_email(email, reset_link)

    return {"message": "Password reset link sent"}


# ================= RESET PASSWORD =================
@router.post("/reset-password/{token}")
def reset_password(token: str, new_password: str = Body(..., embed=True)):
    user = users_collection.find_one({"reset_token": token})

    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")

    if user["reset_token_expiry"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expired")

    # ✅ Reuse hashing function
    new_hashed_password = hash_password(new_password)

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "password": new_hashed_password,
            "reset_token": None,
            "reset_token_expiry": None
        }}
    )

    return {"message": "Password reset successful"}
