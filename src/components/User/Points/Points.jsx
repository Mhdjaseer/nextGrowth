import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Points = () => {
  const [points, setPoints] = useState(0);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    axios.get('http://51.20.118.62:8000/api/user/points/', {
      headers: {
        Authorization: `JWT ${accessToken}`,
      }
    })
      .then((response) => {
        if (response.data.length > 0) {
          setPoints(response.data[0].points_earned);
        }
      })
      .catch((error) => {
        console.error('Error fetching points:', error);
      });
  }, []);

  return (
    <div className="points-container">
      <h2>Points Earned</h2>
      <div className="points">
        {points}
      </div>
    </div>
  );
};

export default Points;
