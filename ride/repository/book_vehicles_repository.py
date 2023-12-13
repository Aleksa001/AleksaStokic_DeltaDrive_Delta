from bson import ObjectId
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["VegaITZadatak"]
vehicles_collection = db["Vehicles"]


def check_existing_vehicles(vehicles_id):
    return vehicles_collection.find_one({'_id': ObjectId(vehicles_id)})


def book_vehicles(vehicles_id):
    result = vehicles_collection.update_many(
        {"_id": ObjectId(vehicles_id)},
        {"$set": {"status": "booked"}}
    )
    print(f"Modified {result.modified_count} documents. Status set to 'booked' for specified vehicles.")