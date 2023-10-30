import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
  
    const apiUrl = 'http://51.20.118.62:8000/api/admin/app-categories/'; 

    // Define custom headers
    const headers = {
        Authorization: `JWT ${accessToken}`, 
    
    };

    axios
      .get(apiUrl, {
        headers: headers,
      })
      .then((response) => {
        // successful response
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        //  errors
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
//   useEffect(() => {
//     // Log the data whenever it changes
//     if (data) {
//     console.log(data);
//     }
// }, [data]);

  return (
    <div>
     
    </div>
  );
};

export default AppCategories;
