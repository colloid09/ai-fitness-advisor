# backend/database.py
import os
from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient


print("DEBUG: Loading .env from", find_dotenv())
load_dotenv(find_dotenv())

print("DEBUG: MONGO_URI =", os.getenv("MONGO_URI"))
print("DEBUG: DB_NAME =", os.getenv("DB_NAME"))


load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI") or os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "fitness_advisor")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not set in .env")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]




