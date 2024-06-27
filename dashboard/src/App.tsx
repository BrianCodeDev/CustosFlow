import React from 'react';
import Navbar from './components/Navbar';
import Register from './components/Register';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Register />
      {/* Other content of your application */}
    </div>
  );
};

export default App;
