from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["VegaITZadatak"]
vehicles_collection = db["Vehicles"]
ratings_collection = db["Ratings"]

def find_nearest_vehicles(current_user_latitude, current_user_longitude):
    user_coordinates = [float(current_user_latitude), float(current_user_longitude)]
    query = {
        "status": "available",
        "location": {
            "$nearSphere": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": user_coordinates
                }
            }
        }
    }

    nearest_vehicles = vehicles_collection.find(query).limit(10)
    return list(nearest_vehicles)


def get_ratings_for_vehicle(vehicle_id):
    return ratings_collection.find({'vehicle_id': vehicle_id})