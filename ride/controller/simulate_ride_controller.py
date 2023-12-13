from flask import Blueprint
from flask import request, jsonify

from token_required import token_required
from ride.service.simulate_ride_service import simulate_ride_service

ride_simulateride_blueprint = Blueprint('ride_simulateride', __name__)


@ride_simulateride_blueprint.route('/simulate', methods=['POST'])
@token_required
def simulate_ride_controller():
    try:
        data_from_body = request.get_json()
        vehicles_id = data_from_body['vehicles_id']
        current_user_latitude = data_from_body["current_user_latitude"]
        current_user_longitude = data_from_body["current_user_longitude"]
        destination_latitude = data_from_body["destination_latitude"]
        destination_longitude = data_from_body["destination_longitude"]
        email = data_from_body["email"]

        return simulate_ride_service(vehicles_id, current_user_latitude, current_user_longitude, destination_latitude,
                                     destination_longitude, email)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
