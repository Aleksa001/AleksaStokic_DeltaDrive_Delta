from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["VegaITZadatak"]
passenger_collection = db["Passenger"]


def check_existing_passenger(email):
    return passenger_collection.find_one({'email': email})


def insert_passenger(passenger_data):
    passenger_collection.insert_one(passenger_data)