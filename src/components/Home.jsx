import React from 'react'

const Home = () => {
  return (
    <div className='home'>
        <div className='home-btn'>
        <button className='home-button'
        onClick={() => {
            window.location.href = '/login'; 
        }}
        >Login</button>

            <button className='home-button'
            onClick={()=>{
                window.location.href='/register'
            }}
            >Register</button>
        </div>
    </div>
  )
}

export default Home