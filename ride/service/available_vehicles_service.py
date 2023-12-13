from ride.repository.available_vehicles_repository import find_nearest_vehicles
from flask import jsonify

from ride.service.additional_function_service import calculate_distance, cost_of_ride, vehicle_rating


def available_vehicles_service(current_user_latitude, current_user_longitude, destination_latitude, destination_longitude):
    try:
        vehicles = find_nearest_vehicles(current_user_latitude, current_user_longitude)
        # Calculate distance
        distanceOfTrip = calculate_distance(current_user_latitude, current_user_longitude, destination_latitude, destination_longitude)
        for vehicle in vehicles:
            start_price = float(vehicle['startPrice'].replace("EUR", ""))
            price_per_km = float(vehicle['pricePerKM'].replace("EUR", ""))
            cost = cost_of_ride(start_price, price_per_km, distanceOfTrip)
            distanceFromPassenger = calculate_distance(vehicle['latitude'], vehicle['longitude'], current_user_latitude, current_user_longitude)
            #get rating for vehicles
            rate = vehicle_rating(str(vehicle["_id"]))
            vehicle['_id'] = str(vehicle['_id'])

            if 'location' in vehicle:
                del vehicle['location']
            if 'status' in vehicle:
                del vehicle['status']
            vehicle['totalPrice'] = cost
            vehicle['distanceFromPassenger'] = distanceFromPassenger * 1000 #m
            vehicle['rate'] = rate
        return jsonify({'vehicles': vehicles}), 200
    except Exception as e:
        return jsonify({'error': e}), 400


