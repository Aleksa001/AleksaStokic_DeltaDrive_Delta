import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import {useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import Home from './components/home/Home';
import RideHistory from './components/ridehistory/RideHistory';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
      <Routes>
        
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<ProtectedRoute element={Home} />}/>
        <Route path='/ridehistory' element={<ProtectedRoute element={RideHistory} />}/>
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
