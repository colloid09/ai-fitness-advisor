from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from backend.db import progress_collection, calorie_collection
from backend.dependencies import get_current_user
from bson import ObjectId
from fastapi import HTTPException

router = APIRouter(prefix="/progress", tags=["Progress"])


# ==============================
# Save a generated plan
# ==============================
@router.post("/save")
def save_plan(data: dict, user=Depends(get_current_user)):
    data["user_id"] = user["email"]          # ✅ consistent identifier
    data["created_at"] = datetime.utcnow()   # ✅ store as datetime
    progress_collection.insert_one(data)
    return {"message": "Saved"}


# ==============================
# Get all plans of logged-in user
# ==============================
@router.get("/history")
def get_history(user=Depends(get_current_user)):
    plans = list(
        progress_collection.find(
            {"user_id": user["email"]},
            {"_id": 0}
        )
    )
    return plans


# ==============================
# Dashboard + Progress analytics
# ==============================
@router.get("/analytics")
def get_analytics(user=Depends(get_current_user)):
    user_id = user["email"]  # ✅ SAME as save_plan

    # Fetch all plans of user
    plans = list(
        progress_collection
        .find({"user_id": user_id})
        .sort("_id", -1)
    )

    # ---------- Recent Plans ----------
    recent = []
    sports = {}

    for p in plans[:5]:
        sport = p.get("sport") or p.get("sport_type") or "Unknown"
        goal = p.get("goal") or p.get("fitness_goal") or "Unknown"

        sports[sport] = sports.get(sport, 0) + 1

        recent.append({
            "_id": str(p["_id"]),
            "sport": sport,
            "goal": goal,
            "created_at": p.get("created_at")
        })

    # ---------- Weekly Activity ----------
    today = datetime.utcnow()
    last_7_days = [today - timedelta(days=i) for i in range(6, -1, -1)]
    weekly_activity = []

    for day in last_7_days:
        count = 0
        for p in plans:
            created = p.get("created_at")
            if isinstance(created, datetime):
                if created.date() == day.date():
                    count += 1
        weekly_activity.append(count)

    return {
        "total_plans": len(plans),
        "weekly_activity": weekly_activity,
        "sports": sports,
        "recent": recent
    }


# ==============================
# Log burned calories
# ==============================
@router.post("/log-calories")
def log_calories(data: dict, user=Depends(get_current_user)):
    data["user_id"] = user["email"]
    data["created_at"] = datetime.utcnow()
    calorie_collection.insert_one(data)
    return {"message": "Calories logged"}


# ==============================
# Get calorie logs
# ==============================
@router.get("/calories")
def get_calories(user=Depends(get_current_user)):
    logs = list(
        calorie_collection.find(
            {"user_id": user["email"]},
            {"_id": 0}
        )
    )
    return logs


@router.get("/plan/{plan_id}")
def get_plan_by_id(plan_id: str, user=Depends(get_current_user)):
    plan = progress_collection.find_one({
        "_id": ObjectId(plan_id),
        "user_id": user["email"]
    })

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    return {
        "_id": str(plan["_id"]),
        "sport": plan.get("sport"),
        "goal": plan.get("goal"),
        "fitness_plan": plan.get("fitness_plan"),
        "created_at": plan.get("created_at")
    }