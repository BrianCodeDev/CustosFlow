
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import googleicon from '../assets/img/google-icon.svg';
import githubicon from '../assets/img/github-icon.svg';
import '../App.css';
import avatar from '../assets/img/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('subscribe', String(subscribe));
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      // Replace with actual API endpoint
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setRegistrationStatus('success'); // Registration successful
        setTimeout(() => {
          // Redirect to dashboard after successful registration
          window.location.href = '/dashboard';
        }, 2000); // Redirect after 2 seconds
      } else {
        setRegistrationStatus('error'); // Registration failed
      }

      // Reset form fields after submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setSubscribe(false);
      setProfilePicture(null);

    } catch (error) {
      console.error('Registration failed', error);
      setRegistrationStatus('error'); // Registration failed
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePicture(file);
  };

  return (
    <div className="register-body">
      <div className='display-register'>
        <div className="sidebar-one">
        <div className="background-white">

          <div className="register-content-sidebar">
            <p>Welcome to CustoFlow! We encourage you to do more with our task tracker system.</p>

           
            <div className="logo">
              <img src="https://i.ibb.co/HVrL9hH/Tropical-Leaves-SIlhouettes-14-1-1.png" alt="logo-leaf" />
              <h1>CustosFlow</h1>
            </div>
            <h2>Register to your account</h2>
            <h3>Already have an account? <Link to="/login">Log in</Link></h3>
            <form onSubmit={handleRegister} className='form-content'>
            <div className='profile-upload'>
              <img src={avatar} alt="avatar" width={"70px"} height={"70px"}/>
               
                <FontAwesomeIcon className='faImage' icon={faImage} />
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="input-one">
                <label>First Name</label> <br />
                <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="input-one">
                <label>Last Name</label> <br />
                <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="input-one">
                <label>Email</label> <br />
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-two">
                <label>Password</label> <br />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button type="submit" className='register-button'>Register</button>
            </form>
            <div className="notification">
            {registrationStatus === 'success' && (
              <div className="registration-success">
                Registration successful! Redirecting to dashboard...
              </div>
            )}
            {registrationStatus === 'error' && (
              <div className="registration-error">
                Registration failed. Please try again later.
              </div>
            )}
            </div>
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
    </div>
  );
};

export default Register;
