import React,  { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar";
import { RideHistoryService } from "../../service/Service";
import SingleRideHistory from "./SingleRideHistory";

const RideHistory = () =>{
    const [rideHistory, setRideHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await RideHistoryService();
            console.log(result.ride_history);
            setRideHistory(result.ride_history)
          } catch (error) {
            console.error('Error getting ride history data:', error);
          }
        }
        fetchData();
    }, []);

    return <>
        <NavBar></NavBar>
        <div className="ride-history-container">
        <h1>Ride History:</h1>
        <div className="ride-cards">
         
            <SingleRideHistory rideHistoryData={rideHistory} />
         
        </div>
      </div>
    </>
}

export default RideHistory;