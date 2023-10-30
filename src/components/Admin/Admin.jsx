import React, { useState } from 'react';
import { AiFillHome, AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import AppList from './AppList';
import AddNewApp from './AddNewApp/AddNewApp';
import AppCategoties from './AddNewApp/AppCategories';
import UserList from './UserPointList/UserList';

const Admin = () => {
  const [showContent, setShowContent] = useState('Home');

  const handleButtonClick = (content) => {
    setShowContent(content);
  };
  const handleLogout = () => {
    // Clear the access codefrom local storage 
    localStorage.removeItem('access_code');
    localStorage.removeItem('reference_code');
    sessionStorage.clear();
  // Clear local storage
  localStorage.clear();
  // Reload the page
  window.location.reload();
    window.location.href = '/'; // Redirect to the login page
  };

  return (
    <div className='background-Admin'>
      <div className="navbar-container">
        <div className="topnav">
          <a className="active">Admin</a>
        </div>
      </div>
      
      <div className="sidebar">

        <button className={`${showContent === 'Home' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('Home')}>
          <AiFillHome /> Home
        </button>

        <button className={`${showContent === 'AddNew' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('AddNew')}>
          <AiOutlinePlus /> Add new
        </button>

        <button className={` ${showContent === 'UserPoints' ? 'active' : 'sidebar-nav '}`} 
          onClick={() => handleButtonClick('UserPoints')}>
          <AiOutlineUsergroupAdd /> User Points
        </button>

        <button className={`${showContent === 'Logout' ? 'active' : 'sidebar-nav '}`} 
          onClick={handleLogout}>
          <BiLogOut /> Logout
        </button>

      </div>

      <div className="content">
        {showContent === 'Home' && <AppList />}
        {showContent === 'AddNew' && (
          <div>
            <AddNewApp/>
            <AppCategoties/>
          </div>
        )}
        {showContent === 'UserPoints' && (
          <div>
            <UserList/>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Admin;
