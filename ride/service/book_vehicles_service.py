from flask import jsonify

from ride.repository.book_vehicles_repository import check_existing_vehicles, book_vehicles
from ride.service.additional_function_service import simulate_driver_decision

def book_vehicles_service(vehicles_id):
    #1.check if id exsist
    if not check_existing_vehicles(vehicles_id):
        return jsonify({'message': 'Vehicle with this id does not exist!'}), 400

    #2.simulate driver accept
    decision = simulate_driver_decision()
    if decision == "Accept":
        print("Driver accepted the request.")
        try:
            count_of_booked = book_vehicles(vehicles_id)
            return jsonify({'message': 'Successfully booked vehicle!'}), 200
        except Exception as e:
            return jsonify({'error': e}), 400
    else:
        print("Driver rejected the request.")
        return jsonify({'message': 'Driver does not accept this ride. Try with another vehicle!'}), 200




