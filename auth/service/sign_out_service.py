from flask import jsonify, session


def sign_out_service():
    try:
        session.clear()
        session['passenger_id'] = None
        return jsonify({'message': 'Successfully logged out!'}), 200
    except Exception as e:
        return jsonify({'error': e}), 400
