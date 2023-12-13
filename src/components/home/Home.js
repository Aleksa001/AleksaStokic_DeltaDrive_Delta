import React,  { useState, useRef } from "react";
import NavBar from "../navbar/NavBar";
import { toast } from 'react-toastify';
import './Home.css';
import { FindAvailableVehiclesService } from "../../service/Service";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { DivIcon } from 'leaflet'; 
import { BookVehicleService } from "../../service/Service";
import { SimulateRideService } from "../../service/Service";
import RateDriverPopup from "./RateDriverPopup";
import { RateRideService } from "../../service/Service";

const Home = () =>{
    const [availableVehicles, setAvailableVehicles] = useState({
        current_user_latitude: "",
        current_user_longitude: "",
        destination_latitude: "",
        destination_longitude: "",
       
    });
    const [bookVehicle, setBookVehicle] = useState({
        vehicles_id: ''
    });
    const [vehicleID, setVehicleId] = useState({
        vehicles_id: ''
    });
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [hoveredVehicle, setHoveredVehicle] = useState(null);
    const [vehicleData, setVehicleData] = useState([]);
    const mapRef = useRef();
    const zoom = 7;
    const containerStyle = {
        width: "100%",
        height: "800px",
        zIndex: 1
    }
    const center = {
        lat: 45.24545,
        lng:19.83603
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAvailableVehicles({ ...availableVehicles, [name]: value });
    };

    const handleFindVehicles = (e) => {
        e.preventDefault();
        if (
            availableVehicles.current_user_latitude === "" ||
            availableVehicles.current_user_longitude === "" ||
            availableVehicles.destination_latitude === "" ||
            availableVehicles.destination_longitude === "" 
           
        ) {
            toast.error('Please fill in all fields!', {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        
        sendDataToServer(availableVehicles)
    };
    const sendDataToServer = async (availableVehicles) => {
        try {
          const result = await FindAvailableVehiclesService(availableVehicles);
          
          console.log(result.vehicles)
            setVehicleData(result.vehicles)
        } catch (error) {
            console.error(error);
        }
    };
    const circleIcon = new DivIcon({
        className: 'custom-circle-icon',
        iconSize: [10, 10],
        html: '<div class="circle"></div>',
    });
    const circleIconVehickes = new DivIcon({
        className: 'custom-circle-icon',
        iconSize: [10, 10],
        html: '<div class="circleVehicles"></div>',
    });
    const handleVehicleMouseOver = (vehicleId) => {
        setHoveredVehicle(vehicleId);
    };
    const handleVehicleMouseOut = () => {
        setHoveredVehicle(null);
    };

    const handleVehicleClick = (vehicleId) => {
        console.log('Clicked vehicle ID:', vehicleId); 
        setBookVehicle(vehicleId);
        const vehicleID = {
            vehicles_id: `${vehicleId}`
        }
        BookVehicles(vehicleID)

    };
    const BookVehicles = async (vehicleId) => {
        try {
          const result = await BookVehicleService(vehicleId);
        
          
          console.log(result)
          if(result.message == 'Successfully booked vehicle!'){
            toast.info(`Successfully booked vehicle!`, {
                position: "top-center",
                autoClose: 3000,
            });  
            setVehicleId(vehicleId)
            const email = sessionStorage.getItem('email')
            
            const dataForSimulate = {
                current_user_latitude: availableVehicles.current_user_latitude,
                current_user_longitude: availableVehicles.current_user_longitude,
                destination_latitude: availableVehicles.destination_latitude,
                destination_longitude: availableVehicles.destination_longitude,
                vehicles_id: vehicleId.vehicles_id,
                email: email
            }
            SimulateRide(dataForSimulate)
          }
          else{
            toast.info(`Driver reject you. Try with another driver!`, {
                position: "top-center",
                autoClose: 3000,
            });
          }
           
        } catch (error) {
            console.error(error);
        }
    };
    const SimulateRide = async (dataForSimulate) => {
        try {
            toast.info(`Ride started!`, {
                position: "top-center",
                autoClose: 3000,
            });
            const result = await SimulateRideService(dataForSimulate);
         
            console.log(result)
           //clear map just update user location
            if(result.message == 'Ride complete successfully!'){
                toast.info(`Ride completed!`, {
                    position: "top-center",
                    autoClose: 3000,
                });
                setAvailableVehicles({current_user_latitude:availableVehicles.destination_latitude,current_user_longitude: availableVehicles.destination_longitude,
                                destination_latitude:'',destination_longitude:''})
                setVehicleData([])
                //logic for likes
                setShowRatingPopup(true);
          }
        
           
        } catch (error) {
            console.error(error);
        }
    };
    const handleRateSubmit = async (ratingData) => {
        try {
        
            const email = sessionStorage.getItem('email')
            const dataForRate = {
            vehicle_id: vehicleID.vehicles_id,
            email: email,
            rate: `${ratingData.rating}`,
            comment: ratingData.comment
            }

            console.log(ratingData)
          
            setShowRatingPopup(false);
            const result = await RateRideService(dataForRate);
            console.log(result)
        } catch (error) {
          console.error(error);
        }
    };
    const handleRatingClose = () => {
        setShowRatingPopup(false);
    };
    const renderMarkers = () => {
        const markers = [];
        
       
        if (availableVehicles.current_user_latitude && availableVehicles.current_user_longitude) {
          markers.push(
            <Marker key="user" icon={circleIcon} position={[parseFloat(availableVehicles.current_user_latitude), parseFloat(availableVehicles.current_user_longitude)]}>
              <Popup>User</Popup>
            </Marker>
          );
        }
    
       
        if (availableVehicles.destination_latitude && availableVehicles.destination_longitude) {
          markers.push(
            <Marker key="destination" icon={circleIcon} position={[parseFloat(availableVehicles.destination_latitude), parseFloat(availableVehicles.destination_longitude)]}>
              <Popup>Destination</Popup>
            </Marker>
          );
        }
    
      
        vehicleData.forEach((vehicle, index) => {
            
          markers.push(
            <Marker key={`vehicle-${index}`} icon={circleIconVehickes} position={[vehicle.latitude, vehicle.longitude]} 
            eventHandlers={{
                click: () => handleVehicleClick(vehicle._id),
                mouseover: () => handleVehicleMouseOver(vehicle._id),
                mouseout: () => handleVehicleMouseOut(),
              }}>
                {hoveredVehicle == vehicle._id && (
              <Popup>
                <div>
                    <h4>Barnd:{vehicle.brand}</h4>
                    <h4>Distance from passenger:{vehicle.distanceFromPassenger}m</h4>
                    <h4>Name:{vehicle.firstName}</h4>
                    <h4>Lastname:{vehicle.lastName}</h4>
                    <h4>Price per km:{vehicle.pricePerKM}</h4>
                    <h4>Rate:{vehicle.rate}</h4>
                    <h4>Start price:{vehicle.startPrice}</h4>
                    <h4>Total price:{vehicle.totalPrice}EUR</h4>
                </div>
               
              </Popup>
               )}
            </Marker>
          );
        });
    
        return markers;
    };

    return<>
        <NavBar></NavBar>
         <h2>Find vehicles</h2>
        <form className="form-container" onSubmit={handleFindVehicles}>
       
        <div className='form-group2'>
            <input
             type="text" 
             placeholder="User latitude" 
             name="current_user_latitude"
             value={availableVehicles.current_user_latitude}
             onChange={handleInputChange}
             />
        </div>
        <div className='form-group2'>
            <input 
            type="text"
            placeholder="User longitude"
            name="current_user_longitude"
            value={availableVehicles.current_user_longitude}
            onChange={handleInputChange} />
        </div>
        <div className='form-group2'>
            <input
            type="text" 
            placeholder="Destination latitude"
            name="destination_latitude"
            value={availableVehicles.destination_latitude}
            onChange={handleInputChange} />
        </div>
        <div className='form-group2'>
            <input 
            type="text" 
            placeholder="Destination longitude"
            name="destination_longitude"
            value={availableVehicles.destination_longitude}
            onChange={handleInputChange} />
        </div>
       
       <div className='form-group2'>
            <button type="submit">Find vehicles</button>
       </div>
      </form>
      <div>
      {showRatingPopup && (
            <RateDriverPopup onSubmit={handleRateSubmit} onClose={handleRatingClose} />
        )}
      </div>
        <div className="Map">
        <h3>Available Vehicles on Map</h3>
        <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           
           {renderMarkers()}
           
            
        </MapContainer>
        </div>
      
    </>
}


export default Home;