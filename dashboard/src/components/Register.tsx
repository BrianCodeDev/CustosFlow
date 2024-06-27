import React, { useState } from 'react';
import axios from 'axios';
import googleicon from '../assets/img/google-icon.svg';
import githubicon from '../assets/img/github-icon.svg';
import '../App.css';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior

    try {
      const response = await axios.post('/api/register', {
        firstName,
        lastName,
        email,
        password,
        subscribe,
      });

      console.log(response.data); // Optional: handle success response

      // Reset form fields after successful registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setSubscribe(false);

      // Redirect to Home.tsx or any other route upon successful registration
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
            <p>Welcome to CustoFlow! We encourage you to do more with our task tracker system.</p>
            <div className="logo">
              <img src="https://i.ibb.co/HVrL9hH/Tropical-Leaves-SIlhouettes-14-1-1.png" alt="logo-leaf" />
              <h1>CustosFlow</h1>
            </div>
            <h2>Register to your account</h2>
            <h3>Already have an account? <Link to="/login">Log in</Link></h3> {/* Use Link for navigation */}
            <form onSubmit={handleRegister} className='form-content'>
              <div className="input-one">
                <label>Email</label> <br />
                <input type="text" placeholder='Email here: ' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-two">
                <label>Password</label> <br />
                <input type="password" placeholder='Password here: ' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit">Register</button>
            </form>
            <div className="display-social-button">
              <div className="google-button">
                <button><img src={googleicon} alt="google-icon" />Google</button>
              </div>
              <div className="github-button">
                <button><img src={githubicon} alt="github-icon" />Github</button>
              </div>
            </div>
            <div className="read-more">
              <a href="#">Read More Here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
