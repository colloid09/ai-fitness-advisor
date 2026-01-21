from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db = client["fitness_advisor"]

users_collection = db["users"]
progress_collection = db["progress"]
calorie_collection = db["calorie_logs"]
