from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import secrets
from fastapi import Depends
from backend.utils.jwt import get_current_user
from backend.db import users_collection
from backend.utils.security import hash_password, verify_password
from backend.utils.jwt import create_access_token
from backend.services.email_service import send_reset_email

router = APIRouter(prefix="/auth", tags=["Auth"])

# ---------- Models ----------

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    gender: str | None = None
    age: int | None = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ---------- Routes ----------

@router.post("/register")
def register(user: RegisterRequest):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")

    users_collection.insert_one({
        "email": user.email,
        "password": hash_password(user.password),
        "gender": user.gender,
        "age": user.age
    })

    return {"message": "Registered successfully"}


@router.post("/login")
def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["email"]})
    return {"access_token": token}


# ================= FORGOT PASSWORD =================

@router.post("/forgot-password")
def forgot_password(email: EmailStr = Body(..., embed=True)):
    user = users_collection.find_one({"email": email})

    # Security: do not reveal user existence
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

    reset_link = f"http://localhost:5173/reset-password/{token}"
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

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "password": hash_password(new_password),
            "reset_token": None,
            "reset_token_expiry": None
        }}
    )

    return {"message": "Password reset successful"}


@router.get("/me")
def get_profile(current_user: dict = Depends(get_current_user)):
    return {
        "email": current_user["email"],
        "gender": current_user.get("gender"),
        "age": current_user.get("age"),
    }