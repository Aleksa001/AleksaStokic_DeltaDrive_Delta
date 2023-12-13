import React, {useState} from 'react';
import Card from '../templates/Card'
import {SignUpService} from '../../service/Service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        birthday: ''
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const handleSignup = (e) => {
        e.preventDefault();
        if (
            signUpData.email === '' ||
            signUpData.password === '' ||
            signUpData.firstname === '' ||
            signUpData.lastname === '' ||
            signUpData.birthday === ''
        ) {
            toast.error('Please fill in all fields!', {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        if (!validateEmail(signUpData.email)) {
            toast.error('Please enter a valid email address!', {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        console.log(signUpData)
        sendDataToServer(signUpData)
    };
    const sendDataToServer = async (signUpData) => {
        try {
          const result = await SignUpService(signUpData);
          //redirect to sign in
          toast.success(`${result}`, {
            position: "top-center",
            autoClose: 3000,
            });
            navigate('/');
  
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <Card>
      <form onSubmit={handleSignup}>
        <h2>Sign up</h2>
        <div className='form-group'>
            <input
             type="text" 
             placeholder="Email" 
             name="email"
             value={signUpData.email}
             onChange={handleInputChange}
             />
        </div>
        <div className='form-group'>
            <input 
            type="password"
            placeholder="Password"
            name="password"
            value={signUpData.password}
            onChange={handleInputChange} />
        </div>
        <div className='form-group'>
            <input
            type="text" 
            placeholder="First Name"
            name="firstname"
            value={signUpData.firstname}
            onChange={handleInputChange} />
        </div>
        <div className='form-group'>
            <input 
            type="text" 
            placeholder="Last Name"
            name="lastname"
            value={signUpData.lastname}
            onChange={handleInputChange} />
        </div>
        <div className='form-group'>
            <input 
            type="date" 
            placeholder="Birthday"
            name="birthday"
            value={signUpData.birthday}
            onChange={handleInputChange}/>
        </div>
       <div className='form-group'>
            <button type="submit">Sign Up</button>
       </div>
      </form>
    </Card>
  );
};

export default SignUp;
