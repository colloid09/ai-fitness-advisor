from urllib import request
from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.gemini_service import generate_fitness_advice



from typing import Optional
from pydantic import BaseModel, Field

class FitnessRequest(BaseModel):
    age: int = Field(..., ge=5)
    gender: str
    weight: float = Field(..., gt=0)
    height: float = Field(..., gt=0)
    sport: str
    goal: str
    injury: Optional[str] = None



# Router object
router = APIRouter(prefix="/fitness", tags=["Fitness AI"])

@router.post("/recommend")
async def recommend_fitness_plan(request: FitnessRequest):
    prompt = (
    f"Generate a personalized fitness plan for an athlete.\n"
    f"Age: {request.age}\n"
    f"Gender: {request.gender}\n"
    f"Weight: {request.weight} kg\n"
    f"Height: {request.height} cm\n"
    f"Sport: {request.sport}\n"
    f"Goal: {request.goal}\n"
)

    if request.injury:
        prompt += f"Injury or limitation: {request.injury}. Avoid exercises that could worsen this injury.\n"


    advice = generate_fitness_advice(prompt)

    return {"fitness_plan": advice}
