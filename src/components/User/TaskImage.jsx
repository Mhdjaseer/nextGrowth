import React, { useState } from 'react';
import axios from 'axios';
import {FiImage} from 'react-icons/fi'

const TaskImage = ({ app }) => {
  const [image, setImage] = useState(null);
  const user_info = localStorage.getItem('user_info');
  const userInfoObject = JSON.parse(user_info);
  const accessToken = localStorage.getItem('access_token');


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image.');
      return;
    }
    // console.log(app)
    const formData = {
        'app':app.id,
        'user':userInfoObject.id,
        'screenshot':image
    }
    console.log(formData)
    console.log(userInfoObject)

    try {
      await axios.post('http://51.20.118.62:8000/api/user/task/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${accessToken}`, 
        },
      });

      alert('Image uploaded successfully!');
      // Clear image
      setImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div onDragOver={handleDragOver} onDrop={handleDrop} style={{
            border: '2px dashed #ccc',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',}}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="selected" style={{ width: '500px', height: '300px' }} />
          ) : (
            <div>
                
                <p><FiImage style={{ width: '500px', height: '300px',color:'gray' }}/></p>
                <p>Drag & Drop an Image or Click to Select</p>
            </div>
            
          )}
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" style={{ display: 'none' }} />
        </div>
        <div className="btn-center">
        <button  className='upload-btn' type="submit">Upload Image</button>
        </div>
      </form>
      
    </div>
  );
};

export default TaskImage;
