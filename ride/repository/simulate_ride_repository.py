from bson import ObjectId
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["VegaITZadatak"]
ride_history_collection = db["Ride_History"]
vehicles_collection = db["Vehicles"]


def get_vehicle_info(vehicles_id):
    return vehicles_collection.find_one({'_id': ObjectId(vehicles_id)})


def insert_ride(ride_data):
    ride_history_collection.insert_one(ride_data)


def set_vehicle_available_and_new_position(vehicles_id, latitude, longitude):
    result = vehicles_collection.update_many(
        {"_id": ObjectId(vehicles_id)},
        {"$set": {"status": "available",
                        "latitude": float(latitude),
                        "longitude": float(longitude),
                        "location.coordinates": [float(longitude), float(latitude)]}}
    )
    print(f"Modified {result.modified_count} documents. Status set to 'booked' for specified vehicles.")
