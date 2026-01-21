from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.gemini_service import generate_fitness_advice




router = APIRouter(prefix="/athlete", tags=["Athlete Plans"])

class AthleteInput(BaseModel):
    athlete_type: str

@router.post("/plan")
async def athlete_plan(input: AthleteInput):
    prompt = f"""
    Create a professional-level training plan for this athlete type:
    Athlete: {input.athlete_type}

    Include:
    - Strength training
    - Conditioning
    - Drills
    - Weekly breakdown
    """

    result = generate_fitness_advice(prompt)
    return {"athlete_plan": result}
