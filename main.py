from flask import Flask
from flask_cors import CORS
import os

from auth.controller.sign_up_controller import auth_signup_blueprint
from auth.controller.sign_in_controller import auth_signin_blueprint
from ride.controller.available_vehicles_controller import ride_availablevehicles_blueprint
from ride.controller.book_vehicles_controller import ride_bookvehicles_blueprint
from auth.controller.sign_out_controller import auth_signout_blueprint
from ride.controller.simulate_ride_controller import ride_simulateride_blueprint
from ride.controller.ride_history_controller import ride_history_blueprint
from ride.controller.rate_driver_controller import ride_ratedriver_blueprint

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = os.environ.get('SECRET_KEY', 'VegaITZadatak')

app.register_blueprint(auth_signup_blueprint, url_prefix='/auth')
app.register_blueprint(auth_signin_blueprint, url_prefix='/auth')
app.register_blueprint(ride_availablevehicles_blueprint, url_prefix='/ride')
app.register_blueprint(ride_bookvehicles_blueprint, url_prefix='/ride')
app.register_blueprint(auth_signout_blueprint, url_prefix='/auth')
app.register_blueprint(ride_simulateride_blueprint, url_prefix='/ride')
app.register_blueprint(ride_history_blueprint, url_prefix='/ride')
app.register_blueprint(ride_ratedriver_blueprint, url_prefix='/ride')

if __name__ == '__main__':
    app.run(debug=True)

