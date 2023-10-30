import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskImage from './TaskImage';

const AppDetails = ({ app, onClose }) => {
  return (
    <div className='appDetials'>
    <div className='card'>
     <img src={app.appImage} alt="Image" />
                <div className="card-content">
                  <h1 className="heading">{app.name}</h1>
                  <a href={app.app_link} className="subheading">{app.app_link}</a>
                </div>
                <p className="number-box">{app.points}</p>
                
      
    </div>
    <TaskImage app={app}/>
    <div className="btn-center ">
    <button className='close-btn' onClick={onClose}>back</button>
    </div>
    </div>
  );
};

const AppCards = () => {
  const [appData, setAppData] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('access_token');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    axios
      .get('http://51.20.118.62:8000/api/user/', {
        headers: {
          Authorization: `JWT ${accessToken}`,
        }
      })
      .then((response) => {
        setAppData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching app data:', error);
      });
  }, [accessToken]);

  const handleCardClick = (app) => {
    setSelectedApp(app);
  };

  const handleCloseDetails = () => {
    setSelectedApp(null);
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          {selectedApp ? (
            <AppDetails app={selectedApp} onClose={handleCloseDetails} />
          ) : (
            appData.map((app, index) => (
              <div className="card" key={index} onClick={() => handleCardClick(app)}>
                <img src={app.appImage} alt="Image" />
                <div className="card-content">
                  <h1 className="heading">{app.name}</h1>
                  <p className="subheading">Click for Details</p>
                </div>
                <p className="number-box">{app.points}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppCards;
