from fastapi import APIRouter
from pydantic import BaseModel
from backend.database import db
from backend.services.gemini_service import generate_fitness_advice


router = APIRouter(prefix="/users", tags=["Users"])

class User(BaseModel):
    name: str
    age: int
    gender: str
    height: float
    weight: float
    activity_level: str

@router.post("/register")
async def register_user(user: User):
    result = db["users"].insert_one(user.dict())
    return {"message": "User registered", "id": str(result.inserted_id)}

@router.get("/all")
async def list_users():
    users = list(db["users"].find({}, {"_id": 0}))
    return {"users": users}
