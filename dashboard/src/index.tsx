import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <Router>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </React.StrictMode>
    </Router>,
    rootElement
  );
}
