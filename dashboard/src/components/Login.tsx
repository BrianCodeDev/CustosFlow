import React, { useState } from 'react';
import axios from 'axios';
import googleicon from '../assets/img/google-icon.svg';
import githubicon from '../assets/img/github-icon.svg';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
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
    <div className="Login-body">
    <h1>Hello World</h1>
    </div>
  );
};

export default Login;
