from auth.repository.sign_in_repository import check_existing_passenger
import bcrypt
from flask import jsonify, session
import jwt
from datetime import datetime, timedelta


def sign_in_service(email, password):
    # First check if email exist
    current_passenger = check_existing_passenger(email)
    if not current_passenger:
        return jsonify({'message': 'User with this email does not exist! Please check email or create account!'}), 400
    if not bcrypt.checkpw(password.encode('utf-8'), current_passenger['password']):
        return jsonify({'message': 'Wrong password!'}), 400
    try:
        session.clear()
        session['passenger_id'] = str(current_passenger['_id'])
        session['email'] = str(current_passenger['email'])
        passenger_id = str(current_passenger['_id'])
        token_payload = {
            'passenger_id': passenger_id,
            'passenger_email': current_passenger['email'],
            'exp': datetime.utcnow() + timedelta(hours=1)
        }
        secret_key = 'VegaITZadatak'
        token = jwt.encode(token_payload, secret_key, algorithm='HS256')
        return jsonify({'token': token}), 200
    except Exception as e:
        return jsonify({'error': e}), 400
