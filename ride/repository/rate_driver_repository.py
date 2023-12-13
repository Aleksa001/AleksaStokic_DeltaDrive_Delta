from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["VegaITZadatak"]
ratings_collection = db["Ratings"]


def insert_rating(rate_data):
    ratings_collection.insert_one(rate_data)
