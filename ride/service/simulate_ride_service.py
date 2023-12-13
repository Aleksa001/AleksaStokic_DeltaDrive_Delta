from flask import jsonify

from ride.repository.simulate_ride_repository import get_vehicle_info, set_vehicle_available_and_new_position
from ride.service.additional_function_service import simulate_ride, cost_of_ride, calculate_distance
from ride.repository.simulate_ride_repository import insert_ride


def simulate_ride_service(vehicles_id, current_user_latitude, current_user_longitude, destination_latitude, destination_longitude, email):
    #get vehicles info
    speed = 60  # km/h
    update_interval = 5  # seconds
    vehicle = get_vehicle_info(vehicles_id)

    if not vehicle:
        return jsonify({'message': 'Vehicle with this id does not exist!'}), 400

    try:
        #1.simulate ride from vehicle position to user position
        simulate_ride(speed,update_interval,float(vehicle['latitude']), float(vehicle['longitude']), float(current_user_latitude),
                    float(current_user_longitude))

        #2.simulate ride from user position to destination
        simulate_ride(speed, update_interval, float(current_user_latitude), float(current_user_longitude), float(destination_latitude),
                    float(destination_longitude))

        #add ride in history (start, destination, cost, driver name)
        start_price = float(vehicle['startPrice'].replace("EUR", ""))
        price_per_km = float(vehicle['pricePerKM'].replace("EUR", ""))
        distance = calculate_distance(float(current_user_latitude), float(current_user_longitude), float(destination_latitude), float(destination_longitude))
        cost = cost_of_ride(start_price, price_per_km, float(distance))

        ride_data = {
            'user': email,
            'start_latitude': float(current_user_latitude),
            'start_longitude': float(current_user_longitude),
            'destination_latitude': float(destination_latitude),
            'destination_longitude': float(destination_longitude),
            'cost': cost,
            'driver_name': vehicle['firstName'] + ' ' + vehicle['lastName']
        }
        # set status of vehicle to available
        # and change lat and long for vehicle
        insert_ride(ride_data)
        set_vehicle_available_and_new_position(vehicles_id, destination_latitude, destination_longitude)
        return jsonify({'message': 'Ride complete successfully!'}), 200
    except Exception as e:
        return jsonify({'error': e}), 400


