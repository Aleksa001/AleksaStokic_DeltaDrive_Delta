from flask import Blueprint
from flask import request, jsonify

from token_required import token_required
from ride.service.book_vehicles_service import book_vehicles_service
ride_bookvehicles_blueprint = Blueprint('ride_bookvehicles', __name__)


@ride_bookvehicles_blueprint.route('/bookvehicles', methods=['POST'])
@token_required
def book_vehicles_controller():
    try:
        data_from_body = request.get_json()
        vehicles_id = data_from_body['vehicles_id']
        return book_vehicles_service(vehicles_id)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
