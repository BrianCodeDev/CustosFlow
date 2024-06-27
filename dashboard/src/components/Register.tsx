import React, { useState } from 'react';
import '../App.css'; // Assuming App.css is now located inside src/ directory
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

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
    <MDBContainer fluid className='register form-content'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          {/* Your existing content */}
        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className=''>
            <MDBCardBody className='form-padding-one'>
              {/* Form inputs */}
              {/* Example: */}
              <MDBInput wrapperClass='mb-4' label='First name' id='firstName' type='text' onChange={(e) => setFirstName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Last name' id='lastName' type='text' onChange={(e) => setLastName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' onChange={(e) => setPassword(e.target.value)} />
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' onChange={() => setSubscribe(!subscribe)} />
              </div>
              {/* Register button */}
              <MDBBtn className='w-100 mb-4' onClick={handleRegister}>Sign Up</MDBBtn>
              {/* Social sign-up */}
              <div className="text-center">
                <p>or sign up with:</p>
                {/* Your existing social buttons */}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default App;
