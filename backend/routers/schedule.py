from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.gemini_service import generate_fitness_advice



router = APIRouter(prefix="/schedule", tags=["Schedule"])

class ScheduleInput(BaseModel):
    goal: str
    activity_level: str

@router.post("/weekly")
async def weekly_schedule(input: ScheduleInput):
    prompt = f"""
    Generate a 7-day workout schedule for:
    Goal: {input.goal}
    Activity Level: {input.activity_level}

    Include:
    - Warmup
    - Main workout
    - Cooldown
    - Rest day if needed
    """

    result = generate_fitness_advice(prompt)
    return {"weekly_schedule": result}
