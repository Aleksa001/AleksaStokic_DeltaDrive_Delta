from flask import request, jsonify, session
import jwt
from functools import wraps
from datetime import datetime
import os


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
            else:
                token = auth_header

        if not token:
            print('Token is missing')
            return jsonify({'error': 'Token is missing'}), 401

        try:
            decoded_token = jwt.decode(token, os.environ.get('SECRET_KEY', 'VegaITZadatak'), algorithms=['HS256'])
            current_time = datetime.utcnow()
            #if not session['passenger_id']:
                #return jsonify({'error': 'No one has logged in!'}), 401
            if decoded_token['exp'] < current_time.timestamp():
                print('Token has expired!')
                return jsonify({'error': 'Token has expired!'}), 401
            #if decoded_token['passenger_id'] != session['passenger_id']:
                #return jsonify({'error': 'Token is invalid!'}), 401


        except jwt.ExpiredSignatureError:
            print('Token has expired!')
            return jsonify({'error': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            print('Invalid token!')
            return jsonify({'error': 'Invalid token!'}), 401

        return f(*args, **kwargs)
    return decorated
