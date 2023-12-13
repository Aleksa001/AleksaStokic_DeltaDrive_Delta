from flask import Blueprint
from flask import jsonify

from auth.service.sign_out_service import sign_out_service
from token_required import token_required

auth_signout_blueprint = Blueprint('auth_signout', __name__)


@auth_signout_blueprint.route('/signout', methods=['POST'])
@token_required
def sign_out_controller():
    try:
        return sign_out_service()
    except Exception as e:
        return jsonify({'message': str(e)}), 500

