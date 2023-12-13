from flask import jsonify

from ride.repository.ride_history_repository import get_ride_history


def ride_history_service(email):
    try:
        ride_history = get_ride_history(email)
        for ride in ride_history:
            ride['_id'] = str(ride['_id'])
        return jsonify({'ride_history': ride_history}), 200
    except Exception as e:
        return jsonify({'error': e}), 400
