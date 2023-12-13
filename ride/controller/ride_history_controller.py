from flask import Blueprint
from flask import jsonify

from ride.service.ride_history_service import ride_history_service
from token_required import token_required

ride_history_blueprint = Blueprint('ride_history', __name__)


@ride_history_blueprint.route('/ridehistory/<string:email>', methods=['GET'])
@token_required
def ride_history_controller(email):
    try:
        print(email)
        return ride_history_service(email)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
