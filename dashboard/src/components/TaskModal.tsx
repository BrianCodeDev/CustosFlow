import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import '../App.css';
import avatar from '../assets/img/avatar.svg';

interface User {
  firstName: string;
  profileImage: string;
}

interface TaskModalProps {
  show: boolean;
  userEmail: string; // Add userEmail as a required prop
  handleClose: () => void;
  handleAdd: (text: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ show, userEmail, handleClose, handleAdd })  => {
  const [taskText, setTaskText] = useState('');
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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (taskText.trim() !== '') {
      handleAdd(taskText);
      setTaskText('');
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-display-header">
          <div className="modal-one">
            <button className='add-button'><h1 onClick={handleClose}>Close</h1></button>
          </div>
          <div className="modal-two">
            <h5>{user ? user.firstName : 'Loading...'} Post</h5>
            <div className="mem mem-one hvr-float"><img src={avatar} alt="" width={"30px"} height={"30px"}/></div>
          </div>
        </div>
        <div className="justify-between">
          <div className="title-one">
            <h6>Fill Post Title</h6>
            <input 
              type="text" 
              placeholder="Task Name" 
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </div>
          <div className="title-two">
            <FontAwesomeIcon className='faImage' icon={faImage} />
            <h6>Upload Pictures or files</h6>
          </div>
        </div>
        <div className="bottom-content-one">
          <h6>Fill Post Description</h6>
          <input 
            type="text" 
            placeholder="Task Description" 
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>
        <button className='submit-modal-button' onClick={handleSubmit}><FontAwesomeIcon icon={faPlus} /> Submit</button>
      </div>
    </div>
  );
};

export default TaskModal;
