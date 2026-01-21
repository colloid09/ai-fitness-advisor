from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.gemini_service import generate_fitness_advice




router = APIRouter(prefix="/nutrition", tags=["Nutrition"])

class NutritionInput(BaseModel):
    age: int
    weight: float
    height: float
    gender: str
    goal: str

@router.post("/plan")
async def nutrition_plan(input: NutritionInput):
    prompt = f"""
    Create a detailed daily nutrition plan for an athlete.
    Age: {input.age}
    Weight: {input.weight}
    Height: {input.height}
    Gender: {input.gender}
    Goal: {input.goal}

    Include:
    - Daily calorie intake
    - Protein, carb, fat breakdown
    - 4 meals + snacks
    - Hydration recommendations
    """

    response = generate_fitness_advice(prompt)
    return {"nutrition_plan": response}
