from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.gemini_service import generate_fitness_advice



router = APIRouter(prefix="/injury", tags=["Injury-Safe Advisor"])

class InjuryInput(BaseModel):
    injury_type: str
    goal: str

@router.post("/safe-workouts")
async def injury_safe_workouts(input: InjuryInput):
    prompt = f"""
    Provide injury-safe workout recommendations.
    Injury: {input.injury_type}
    Goal: {input.goal}

    Include:
    - Safe exercises
    - Exercises to avoid
    - Low-impact alternatives
    """

    result = generate_fitness_advice(prompt)
    return {"safe_workouts": result}
