import time
from math import radians, sin, cos, sqrt, atan2
import random

from ride.repository.available_vehicles_repository import get_ratings_for_vehicle


def calculate_distance(current_user_latitude, current_user_longitude, destination_latitude, destination_longitude):
    current_user_latitude = radians(float(current_user_latitude))
    current_user_longitude = radians(float(current_user_longitude))
    destination_latitude = radians(float(destination_latitude))
    destination_longitude = radians(float(destination_longitude))
    dlon = destination_longitude - current_user_longitude
    dlat = destination_latitude - current_user_latitude
    a = sin(dlat / 2) ** 2 + cos(current_user_latitude) * cos(destination_latitude) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = 6371 * c
    return distance


def simulate_driver_decision():
    random_number = random.random()
    rejection_probability = 0.25
    if random_number < rejection_probability:
        return "Reject"
    else:
        return "Accept"


def simulate_ride(speed, update_interval, start_latitude, start_longitude,destination_latitude , destination_longitude):
    distance_of_ride = calculate_distance(start_latitude, start_longitude,
                                                         destination_latitude, destination_longitude)

    time_of_ride = distance_of_ride / speed
    total_updates = int(time_of_ride * 3600 / update_interval)

    delta_latitude = (destination_latitude - start_latitude) / total_updates
    delta_longitude = (destination_longitude - start_longitude) / total_updates
    print(f'Start point:{start_latitude}:{start_longitude}')
    print(f'Destination point:{destination_latitude}:{destination_longitude}')
    # Simulate vehicle movement
    for i in range(total_updates + 1):
        new_latitude = start_latitude + (delta_latitude * i)
        new_longitude = start_longitude + (delta_longitude * i)
        print(f"Vehicle location updated: Latitude={new_latitude}, Longitude={new_longitude}")
        time.sleep(update_interval)


def cost_of_ride(start_price, price_per_km, distance):
    cost = start_price + (distance * price_per_km)
    return cost


def vehicle_rating(vehicle_id):
    ratings = get_ratings_for_vehicle(vehicle_id)
    ratings_list = list(ratings)
    print(ratings_list)
    if ratings_list:
        total_ratings = sum(float(rating['rate']) for rating in ratings_list if 'rate' in rating)
        average_rating = total_ratings / len(ratings_list)
        return float(average_rating)
    else:
        return 0.0
