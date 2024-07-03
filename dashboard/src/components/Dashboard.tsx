import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../assets/img/Component 2 (7).svg';
import welcomedashboard from '../assets/img/welcome-board.svg';
import banner from '../assets/img/banner.svg';
import ToDo from './ToDo';
import leaf from '../assets/img/leaf.svg';
import avatar from '../assets/img/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface DashboardProps {
  userEmail: string;
}

interface User {
  firstName: string;
  profileImage: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail }) => {
  const [user, setUser] = useState<User | null>(null); // State to hold the user data

  useEffect(() => {
    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users`);
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Assuming API returns the user object with firstName
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userEmail]);

  return (
    <div className='dashboard-body'>
      <div className="dashboard-layout">
        <div className="sidebar">
          <div className="logo-center">
            <img src={logo} alt="logo-sidebar" />
          </div>
          <ul>
            <li className='overview'>
              <a href="#">
                <img src={leaf} alt="" />
                Overview
                <a href="#" className='hvr-icon-spin'>
                  <FontAwesomeIcon className='hvr-icon faShare' icon={faShare} />
                </a>
              </a>
            </li>
            <li className='custom'><a href="#"><FontAwesomeIcon className='faServer' icon={faServer} /> Custom</a></li>
            <li><a href="#">Deployments</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">API Flow</a></li>
            <li className='teams'><a href="#"><FontAwesomeIcon className='faUserPlus' icon={faUserPlus} /> Teams</a></li>
            <li><a href="#">Boarding</a></li>
            <li><a href="#">Scheduling</a></li>
            <li><a href="#">Sharing</a></li>
            <li><a href="#">Adding Teams</a></li>
            <hr />
            <h5>More Options</h5>
            <div className="center-extra">
              <button>Github</button> <br />
              <button>Upgrade</button>
              <h6 style={{textAlign: "center", marginTop: "20px"}}>Welcome, {user ? user.firstName : 'Loading...'}!</h6>
            </div>
            

          </ul>
        </div>
        <div className="main-content">
          <nav className="navbar">
            <div>
              <ul className="navbar-links">
                <li> <a href="#">Home</a></li>
                <li> <a href="#">Support</a></li>
                <div className="input-search">
                  <FontAwesomeIcon className='faMagnifyingGlass' icon={faMagnifyingGlass} />
                  <input type="text" placeholder='Search ' />
                </div>
              </ul>
            </div>
            <ul className="navbar-links">
              <div className="members">
                {[1, 2, 3, 4, 5, 6].map((mem, index) => (
                  <div key={index} className={`mem mem-${mem}`}></div>
                ))}
                <div className="mem mem-seven">
                  {user ? (
                    <img src={user.profileImage} alt="Profile" className="profile-image" />
                  ) : (
                    <span>Loading...</span>
                  )}
                </div>
              </div>
              <button>Invite</button>
            </ul>
          </nav>
          <div className="center-image">
            <img src={banner} alt="ad-banner" width={"96%"} />
          </div>
          <div className="todo-cards">
            <ToDo userEmail={''} />
          </div>
          <div className="main">
            <div className="welcome-index">
              <img src={welcomedashboard} alt="welcome-index" />
            </div>
   
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
