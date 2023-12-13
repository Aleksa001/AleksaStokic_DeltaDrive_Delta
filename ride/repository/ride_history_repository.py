from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["VegaITZadatak"]
ride_history_collection = db["Ride_History"]


def get_ride_history(email):
    return list(ride_history_collection.find({'user': email}))
