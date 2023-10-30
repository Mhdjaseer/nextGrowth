import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
  const [taskData, setTaskData] = useState([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    
    axios.get('http://51.20.118.62:8000/api/user/task/compleate/', {
      headers: {
        Authorization: `JWT ${accessToken}`,
      }
    })
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  }, [accessToken]);

  return (
    <div className="task-container">
      <h2>Compleated Tasks</h2>
      <div className="task-cards">
        {taskData.map((task, index) => (
          <div key={index} className="task-card">
            <img src={task.screenshot} alt="Task Screenshot" />
            <h1>{task.app_name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
