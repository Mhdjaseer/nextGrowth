import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://51.20.118.62:8000/auth/jwt/create/', {
        email,
        password,
      },{
        mode: "no-cors" 
      });

      if (response.status === 200) {
        const data = response.data;
        const { access, refresh } = data;

        // Store tokens in localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        
        // after user checking admin or not if admin redirect to admin else redirect to user profile 
        const accessToken = localStorage.getItem('access_token');


        try{

          if (accessToken){
            const responseUser =axios.create({
              baseURL: 'http://127.0.0.1:8000/api/check/', 
              headers: {

                'Content-Type': 'application/json',
                Authorization: `JWT ${accessToken}`, 

              },

            });

            responseUser
            .get('') 
            .then(response => {
                // response data 
                const user_info=response.data.user_info;

                // respose data storing in local storage
                localStorage.setItem('user_info', JSON.stringify(user_info));
                
                if (user_info.is_superuser){

                  window.location.href = '/admin';
                }else{
                  window.location.href='/user'
                }
            })

          }
        }
        catch{
          console.error("Error:", error);
        }


      
      } else{
        console.log("error")
      }
    } catch (error) {
      alert("check your email and password ")

    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <a href="/register">click to register</a>

      </div>
    </div>
  );
};

export default Login;
