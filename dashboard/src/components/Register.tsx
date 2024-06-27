import React, { useState } from 'react';
import '../App.css'; // Assuming App.css is now located inside src/ directory
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
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
      </div>
      </div>
    </div>
    </div>
  );
};

export default App;
