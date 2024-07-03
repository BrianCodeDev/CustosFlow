import React, { useState } from 'react';
import axios from 'axios';
import googleicon from '../assets/img/google-icon.svg';
import githubicon from '../assets/img/github-icon.svg';
import '../App.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      console.log(response.data); // Optional: handle success response

      setLoginStatus('success'); // Set login status
      setTimeout(() => {
        // Redirect to dashboard or any other route upon successful login
        window.location.href = '/dashboard';
      }, 2000); // Redirect after 2 seconds

      // Reset form fields after successful login
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Login failed', error);
      setLoginStatus('error'); // Handle login failure
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
            <h2>Login to your account</h2>
            <h3>Don't have an account? <Link to="/">Register</Link></h3> {/* Use Link for navigation */}
            <form onSubmit={handleLogin} className='form-content'>
              <div className="input-one">
                <label>Email</label> <br />
                <input type="text" placeholder='Email here: ' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-two">
                <label>Password</label> <br />
                <input type="password" placeholder='Password here: ' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
            </form>
            {loginStatus === 'success' && (
              <div className="registration-success">
                Login successful! Redirecting to dashboard...
              </div>
            )}
            {loginStatus === 'error' && (
              <div className="registration-error">
                Login failed. Please try again.
              </div>
            )}
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

export default Login;