import React, {useState} from 'react';
import Card from '../templates/Card';
import { toast } from 'react-toastify';
import { SignInService } from '../../service/Service';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignInData({ ...signInData, [name]: value });
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const handleSignin = (e) => {
        e.preventDefault();
        if (
            signInData.email === '' ||
            signInData.password === '' 
           
        ) {
            toast.error('Please fill in all fields!', {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        if (!validateEmail(signInData.email)) {
            toast.error('Please enter a valid email address!', {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
        console.log(signInData)
        //service
        sendDataToServer(signInData)
    };
    const sendDataToServer = async (signinData) => {
        try {
          
            console.log(signinData)
            const result = await SignInService(signinData);
            console.log(result.token)
            sessionStorage.setItem('token',String(result.token))
            sessionStorage.setItem('email', signInData.email)
          
            toast.success(`Succesfully sign in!`, {
                position: "top-center",
                autoClose: 3000,
            });
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <Card>
      <form onSubmit={handleSignin}>
        <h2>Sign in</h2>
        <div className='form-group'>
            <input
             type="text" 
             placeholder="Email" 
             name="email"
             value={signInData.email}
             onChange={handleInputChange}
             />
        </div>
        <div className='form-group'>
            <input 
            type="password"
            placeholder="Password"
            name="password"
            value={signInData.password}
            onChange={handleInputChange} />
        </div>
       <div className='form-group'>
            <button type="submit">Sign In</button>
       </div>
      </form>
      <p className="register-link">
        You don't have account? <a href="/signup">Register here.</a>
      </p>
    </Card>
  );
};

export default SignIn;
