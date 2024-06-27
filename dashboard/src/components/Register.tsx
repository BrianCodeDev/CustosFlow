import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import logo from '../assets/img/google-icon.svg';
import '../App.css';

const App: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', {
        firstName,
        lastName,
        email,
        password,
        subscribe,
      });

      console.log(response.data); // Optional: handle success response

      // Redirect to Home.tsx or any other route upon successful registration
      // Replace this with your actual routing logic
      // Example: history.push('/home');

    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure
    }
  };

  return (
    <div className="register-body">
    <div className='display-register'>
      <div className="sidebar-one">
      <div className="register-content-sidebar">
       <p>Welcome to CustosFlow
       We encourage you to do more with our task tacker system</p>
       <div className="logo">
        <img src="https://i.ibb.co/HVrL9hH/Tropical-Leaves-SIlhouettes-14-1-1.png" alt="logo-leaf" />
       <h1>CustosFlow</h1>
       </div>
       <h2>Register to your account</h2>
       <h3>Don't have an account? <u>Sign Up</u></h3>
      <form action="" className='form-content'>
        <div className="input-one">
          <label>Email</label> <br />
          <input type="text" placeholder='Email here: '/>
        </div>
        <div className="input-two">
        <label>Password</label> <br />
        <input type="text" placeholder='Password here: '/>
        </div>
      </form>
       <div className="display-social-button">
       <div className="google-button">
      <button><img src={logo} alt="google-icon" />Google</button>
      </div>
      <div className="github-button">
      <button><img src="" alt="github-icon" />Github</button>
      </div>
       </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default App;
