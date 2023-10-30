import React from 'react'

export const Profile = () => {
    const user_info = localStorage.getItem('user_info');
    const userInfoObject = JSON.parse(user_info);
  return (
    <div className='profile'>
        <div className='profile-profile'>
            <h1>Name:{userInfoObject.name}</h1>
            <h2>Email:{userInfoObject.email}</h2>
        </div>
    </div>
  )
}

