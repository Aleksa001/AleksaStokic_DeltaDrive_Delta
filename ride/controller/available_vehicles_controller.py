from flask import Blueprint
from flask import request, jsonify

from token_required import token_required
from ride.service.available_vehicles_service import available_vehicles_service
ride_availablevehicles_blueprint = Blueprint('ride_availablevehicles', __name__)


#POST method because with GET react does not work :(
@ride_availablevehicles_blueprint.route('/availablevehicles', methods=['POST'])
@token_required
def available_vehicles_controller():
    try:
        data_from_body = request.get_json()
        current_user_latitude = data_from_body["current_user_latitude"]
        current_user_longitude = data_from_body["current_user_longitude"]
        destination_latitude = data_from_body["destination_latitude"]
        destination_longitude = data_from_body["destination_longitude"]
        return available_vehicles_service(current_user_latitude,
                                          current_user_longitude,
                                          destination_latitude,
                                          destination_longitude)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
