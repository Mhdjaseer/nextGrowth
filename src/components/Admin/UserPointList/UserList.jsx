import React,{useState,useEffect} from 'react';
import axios from 'axios';

const UserList = () => {
  const [responseData, setResponseData] = useState([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://51.20.118.62:8000/api/admin/user-points/`,{
          headers:{
            Authorization: `JWT ${accessToken}`,
          }
        });
        setResponseData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
    <h2 style={{textAlign:'center'}}>User Points List</h2>
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Points Earned</th>
        </tr>
      </thead>
      <tbody>
        {responseData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.points_earned}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};



export default UserList