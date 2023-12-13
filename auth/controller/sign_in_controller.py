from flask import Blueprint
from flask import request, jsonify

from auth.service.additional_function_service import check_fields_not_empty_signin, is_valid_email
from auth.service.sign_in_service import sign_in_service
auth_signin_blueprint = Blueprint('auth_signin', __name__)


@auth_signin_blueprint.route('/signin', methods=['POST'])
def sign_in_controller():
    try:
        passenger_data = request.get_json()
        print(passenger_data)
        email = passenger_data["email"]
        password = passenger_data["password"]
        # Check fields for user
        check_fields = check_fields_not_empty_signin(email, password)
        if check_fields is not True:
            return jsonify({'message': check_fields}), 400
        if not is_valid_email(email):
            return jsonify({'message': "Invalid format for email!"}), 400
        return sign_in_service(email, password)
    except Exception as e:
        return jsonify({'message': str(e)}), 500



