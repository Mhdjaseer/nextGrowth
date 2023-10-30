import React from 'react'

const AppCard = ({data}) => {
  const localhost="http://51.20.118.62:8000"
  return (
    <div>
        {data ? (
        data.map((item, index) => {
          const { Id, name, app_link, app_category_name, app_subcategory_name, points, appImage } = item;
          return (
            <div key={index} className="card">
              <div className="card-image">
                <img src={`${localhost}${appImage}`}  alt="App Image" />
              </div>
              <div className="card-content">
                <h1>{name}</h1>
                <p>App Link: <a href={app_link}>{app_link}</a></p>
                <p>App Category: {app_category_name}</p>
                <p>App Subcategory: {app_subcategory_name}</p>
                <p>Points: {points}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default AppCard