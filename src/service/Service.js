import axios from "axios";

export  const SignUpService = async(formData) =>{
    try {
        const response = await axios.post("http://127.0.0.1:5000/auth/signup", formData,{
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
          crossDomain: true, 
        });
        console.log(response.data.message);
        return response.data.message;
    } catch (error) {
        console.error("Error while signing up:", error);
        return error;
    }
}
export  const SignInService = async(formData) =>{
  try {
      const response = await axios.post("http://127.0.0.1:5000/auth/signin", formData,{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
        crossDomain: true, 
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("Error while signing in:", error);
      return error;
  }
}
export  const SignOutService = async() =>{
  const token = sessionStorage.getItem('token')
  console.log(token)
  try {
      const response = await axios.post("http://127.0.0.1:5000/auth/signout",null,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true, 
        crossDomain: true, 
      });
      console.log(response.data.message);
      return response.data;
  } catch (error) {
      console.error("Error while signing out:", error);
      return error;
  }
}
export  const FindAvailableVehiclesService = async(locationData) =>{
  const token = sessionStorage.getItem('token')
  console.log(token)
  console.log(locationData)
  try {
    const response = await axios.post("http://127.0.0.1:5000/ride/availablevehicles", locationData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true, 
      crossDomain: true, 
    });
      console.log(response.data.message);
      return response.data;
  } catch (error) {
      console.error("Error while getting available vehicles:", error);
      return error;
  }
}
export  const BookVehicleService = async(vehicleId) =>{
  const token = sessionStorage.getItem('token')
  console.log(token)
  console.log(vehicleId)
  try {
    const response = await axios.post("http://127.0.0.1:5000/ride/bookvehicles", vehicleId,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true, 
      crossDomain: true, 
    });
      console.log(response.data.message);
      return response.data;
  } catch (error) {
      console.error("Error while booking vehicles:", error);
      return error;
  }
}
export  const SimulateRideService = async(simulateData) =>{
  const token = sessionStorage.getItem('token')
  console.log(token)
  console.log(simulateData)
  try {
    const response = await axios.post("http://127.0.0.1:5000/ride/simulate", simulateData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true, 
      crossDomain: true, 
    });
   
      console.log(response.data.message);
      return response.data;
  } catch (error) {
      console.error("Error while simulating ride:", error);
      return error;
  }
}
export  const RideHistoryService = async() =>{
  const token = sessionStorage.getItem('token');
  const email = sessionStorage.getItem('email');
  console.log(email)
  try {
      const response = await axios.get(`http://127.0.0.1:5000/ride/ridehistory/${email}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true, 
        crossDomain: true, 
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("Error while getting ride history:", error);
      return error;
  }
}
export  const RateRideService = async(rateData) =>{
  const token = sessionStorage.getItem('token');
  console.log(rateData)
  try {
      const response = await axios.post(`http://127.0.0.1:5000/ride/ratedriver`,rateData,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true, 
        crossDomain: true, 
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("Error while rate ride:", error);
      return error;
  }
}