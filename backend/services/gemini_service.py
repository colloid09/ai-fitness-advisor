# backend/services/gemini_service.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
if not API_KEY:
    # This will let your endpoints fail gracefully with a clear message if key is missing
    # You can also raise here if you prefer a hard failure during app startup
    print("WARNING: GOOGLE_API_KEY not set in environment")

genai.configure(api_key=API_KEY)

# Use the model you configured in your console (gemini-2.5-flash for example)
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
model = genai.GenerativeModel(MODEL_NAME)

def generate_fitness_advice(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating advice: {e}"
