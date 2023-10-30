import React, { useState } from 'react';
import { AiFillHome, AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import AppCards from './AppCards';
import {BsFillPersonFill} from 'react-icons/bs';
import {RiTaskLine} from 'react-icons/ri'
import { Profile } from './Profile/Profile';
import Points from './Points/Points';
import Task from './Task/Task';

const User = () => {
  const [showContent, setShowContent] = useState('Home');
  const user_info = localStorage.getItem('user_info');
  const userInfoObject = JSON.parse(user_info);

  const handleButtonClick = (content) => {
    setShowContent(content);
  };
  const handleLogout = () => {
    
    localStorage.removeItem('access_code');
    localStorage.removeItem('reference_code');
    sessionStorage.clear();
  // Clear local storage
  localStorage.clear();
  // Reload the page
  window.location.reload();
    window.location.href = '/';
  };

  return (
    <div className='background-Admin'>
      <div className="navbar-container">
        <div className="topnav">
          <a className="active">{userInfoObject.name}</a>
        </div>
      </div>
    
      <div className="sidebar">

        <button className={`${showContent === 'Home' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('Home')}>
          <AiFillHome /> Home
        </button>

        <button className={`${showContent === 'Profile' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('Profile')}>
          <BsFillPersonFill /> Profile
        </button>

        <button className={` ${showContent === 'UserPoints' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('UserPoints')}>
          <AiOutlineUsergroupAdd /> Points
        </button>

        <button className={` ${showContent === 'Task' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('Task')}>
          <RiTaskLine /> Task
        </button>

        <button className={`${showContent === 'Logout' ? 'active' : 'sidebar-nav '}`} 
          onClick={handleLogout}>
          <BiLogOut /> Logout
        </button>

      </div>

      <div className="content">
        {showContent === 'Home' && <AppCards />}
        {showContent === 'Profile' && (
          <div>
            <Profile/>
          </div>
        )}
        {showContent === 'UserPoints' && (
          <div>
            <Points/>
          </div>
        )}
           {showContent === 'Task' && (
          <div>
            <Task/>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default User;
