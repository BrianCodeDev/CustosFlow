import React from 'react'
import '../App.css';
import logo from '../assets/img/Component 2 (7).svg';
import welcomedashboard from '../assets/img/welcome-board.svg';
import banner from '../assets/img/banner.svg';

import ToDo from './ToDo'; // Import the ToDo component
import leaf from '../assets/img/leaf.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
const Dashboard = () => {
  return (
    <div className='dashboard-body'>
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="logo-center">
        <img src={logo} alt="logo-sidebar" />
        </div>
        <ul>
          <li className='overview'><a href="#"><img src={leaf} alt="" />Overview <FontAwesomeIcon className='faShare' icon={faShare} /></a></li>
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
            <input type="text" placeholder='Search '/>
          </div>
        </ul>
      </div>
      <ul className="navbar-links">
        <div className="members">
          <div className="mem mem-one"></div>
          <div className="mem mem-two"></div>
          <div className="mem mem-three"></div>
          <div className="mem mem-four"></div>
          <div className="mem mem-five"></div>
          <div className="mem mem-six"></div>
          <div className="mem mem-seven"></div>
          <div className="mem mem-eight"></div>
        </div>
        <h6>0 Members</h6>
         <button>Invite</button>
      </ul>
    </nav>
    <div className="center-image">
    <img src={banner} alt="ad-banner" width={"96%"}/>
    </div>
    <div className="todo-cards">
<ToDo />
</div>
       <div className="main">
       
        <div className="welcome-index">

        <img src={welcomedashboard} alt="welcome-index" />
        </div>

</div> 
      </div>
    </div>

    </div>


  )
}

export default Dashboard
