from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.auth import router as auth_router
from backend.routers.progress import router as progress_router
from backend.routers.fitness import router as fitness_router

app = FastAPI(title="AI Fitness Advisor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(auth_router)
app.include_router(progress_router)
app.include_router(fitness_router)

@app.get("/")
def root():
    return {"status": "Backend running"}
