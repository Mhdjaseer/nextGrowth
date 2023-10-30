    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
import AppCard from './AppCard';

    const AppList = () => {
    const [data, setData] = useState(null);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchData = async () => {
        try {
           
            const response = await axios.get('http://51.20.118.62:8000/api/admin/', {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
            });
            setData(response.data);
        
        } catch (error) {
            // errors
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [accessToken]); 

 

    return (
        <div>
        <h1 >AppList</h1>
            <AppCard data={data}/>
        </div>
    );
    };

    export default AppList;
