import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <Router>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </React.StrictMode>
    </Router>,
    rootElement
  );
}
