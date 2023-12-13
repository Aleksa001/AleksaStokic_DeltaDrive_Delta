from flask import Blueprint
from flask import request, jsonify

from ride.service.rate_driver_service import rate_driver_service
from token_required import token_required

ride_ratedriver_blueprint = Blueprint('ride_ratedriver', __name__)


@ride_ratedriver_blueprint.route('/ratedriver', methods=['POST'])
@token_required
def rate_driver_controller():
    try:
        data_from_body = request.get_json()
        vehicle_id = data_from_body['vehicle_id']
        rate = data_from_body['rate']
        comment = data_from_body['comment']
        email = data_from_body['email']
        if not rate or not vehicle_id:
            return jsonify({'message': 'Rate and/or vehicle id must not be null!'}), 400
        if float(rate) > 5 or float(rate) < 0:
            return jsonify({'message': 'Rate have range from 1 to 5!'}), 400
        return rate_driver_service(vehicle_id, rate, comment, email)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
