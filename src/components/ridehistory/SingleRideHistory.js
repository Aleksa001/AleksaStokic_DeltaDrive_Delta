import React from 'react';
import './SingleRideHistory.css'

const SingleRideHistory = ({ rideHistoryData }) => {
  return (
    <div>
     
      <div className="ride-cards">
        {rideHistoryData.map((ride, index) => (
          <div key={index} className="ride-card">
            <h2>Ride {ride._id}</h2>
            <p>Driver: {ride.driver_name}</p>
            <p>Cost: {ride.cost}EUR</p>
            <p>Start point:  {ride.start_latitude}, {ride.start_longitude}</p>
            <p>Destination: {ride.destination_latitude}, {ride.destination_longitude}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleRideHistory;
