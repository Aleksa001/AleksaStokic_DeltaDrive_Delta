from flask import Blueprint
from flask import request, jsonify

from auth.service.additional_function_service import is_valid_email, check_fields_not_empty_signup
from auth.service.sign_up_service import sign_up_service
auth_signup_blueprint = Blueprint('auth_signup', __name__)


@auth_signup_blueprint.route('/signup', methods=['POST'])
def sign_up_controller():
    try:
        passenger_data = request.get_json()
        email = passenger_data["email"]
        password = passenger_data["password"]
        first_name = passenger_data["firstname"]
        last_name = passenger_data["lastname"]
        birthday = passenger_data["birthday"]
        # Check fields for user
        check_fields = check_fields_not_empty_signup(email, password, first_name, last_name, birthday)
        if check_fields is not True:
            return jsonify({'message': check_fields}), 400
        if not is_valid_email(email):
            return jsonify({'message': "Invalid format for email!"}), 400
        return sign_up_service(email, password, first_name, last_name, birthday)
    except Exception as e:
        return jsonify({'message': str(e)}), 500
