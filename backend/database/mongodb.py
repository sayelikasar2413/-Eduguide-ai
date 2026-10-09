from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"

client = MongoClient(MONGO_URI)

db = client["eduguide"]

colleges_collection = db["colleges"]
users_collection = db["users"]


def test_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connected successfully!")
        return True

    except Exception as e:
        print("MongoDB connection failed:")
        print(e)
        return False