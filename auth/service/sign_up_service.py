from auth.repository.sign_up_repository import check_existing_passenger, insert_passenger
import bcrypt
from flask import jsonify


def sign_up_service(email, password, first_name, last_name, birthday):
    # First check if email is unique
    if check_existing_passenger(email):
        return jsonify({'message': 'User with this email already exist!'}), 400
    # If email is unique hash password and send to database
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    passenger_data = {
        'email': email,
        'password': hashed_password,
        'first_name': first_name,
        'last_name': last_name,
        'birthday': birthday
    }
    try:
        insert_passenger(passenger_data)
        return jsonify({'message': 'Passenger successfully signed up!'}), 200
    except Exception as e:
        return jsonify({'error': e}), 400
