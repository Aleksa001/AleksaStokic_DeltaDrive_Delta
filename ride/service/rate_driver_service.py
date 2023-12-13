from flask import jsonify

from ride.repository.rate_driver_repository import insert_rating


def rate_driver_service(vehicles_id, rate, comment, email):
    try:
        rate_data = {
            'user': email,
            'vehicle_id': vehicles_id,
            'rate': float(rate),
            'comment': comment
        }
        insert_rating(rate_data)
        return jsonify({'message': 'Rating successfully saved!'}), 200
    except Exception as e:
        return jsonify({'error': e}), 400
