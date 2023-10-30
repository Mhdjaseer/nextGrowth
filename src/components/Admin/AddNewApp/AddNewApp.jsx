import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FiImage} from 'react-icons/fi'

const AddNewApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    app_link: '',
    app_category: '',
    app_subcategory: '',
    points: '',
    appImage: null,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const accessToken = localStorage.getItem('access_token');
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
    validateForm(); 
  };

  const validateForm = () => {
    // Check all fields have values
    if (
      formData.name &&
      formData.app_link &&
      formData.app_category &&
      formData.app_subcategory &&
      formData.points
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };




  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://51.20.118.62:8000/api/admin/app-categories/',{
        headers:{
          Authorization: `JWT ${accessToken}`,
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(`http://51.20.118.62:8000/api/admin/subcategories/?category=${categoryId}`,{
        headers:{
          Authorization: `JWT ${accessToken}`,
        }
      });
      setSubcategories(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data ={
      'name':formData.name,
      'app_category_name':parseInt(formData.app_category),
      'app_subcategory_name':parseInt(formData.app_subcategory),
      'points':parseInt(formData.points),
      'appImage':formData.appImage,
      'app_link':formData.app_link
    };
    
    console.log(data)

    try {
      await axios.post('http://51.20.118.62:8000/api/admin/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${accessToken}`, 
        },
      });
      alert('App created successfully!');
      window.location.reload();
      
    } catch (error) {
      console.error('Error creating app:', error);
    }
  };
  // handleDragOver function
const handleDragOver = (e) => {
  e.preventDefault();
};

//  handleDrop function
const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    setFormData({ ...formData, appImage: file });
  }
};

//  imageDropAreaStyle
const imageDropAreaStyle = {

  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};



  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* image drag and drop only  */}
        <div onDragOver={handleDragOver} onDrop={handleDrop} style={imageDropAreaStyle}>
          {formData.appImage ? (
            <img
              src={URL.createObjectURL(formData.appImage)}
              alt="Selected Image"
              style={{ width: '200px', height: '200px' }}
            />
          ) : (
            <p><FiImage style={{ width: '200px', height: '150px',color:'gray' }}/></p>
          )}
        </div>

        <div className='flex-container'>
          <div className='row'>
            <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required />
          </div>
          <div className='row'> 
            <input type="text" placeholder='AppLink' name="app_link" value={formData.app_link} onChange={handleChange} required />
          </div>
        </div>

        <div className='flex-container'>
          <div className='row'>
            <select name="app_category" value={formData.app_category} onChange={(e) => {
              handleChange(e);
              fetchSubcategories(e.target.value); 
            }} required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        <div className='row'>
          <select name="app_subcategory" value={formData.app_subcategory} onChange={handleChange} required>
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div>
        </div>
        </div>
        <div className="flex-container points">
          <input type="number" placeholder='points' name="points" value={formData.points} onChange={handleChange} required />
        </div>

        <div className="flex-container">
        {isFormValid ? (
        <button type="submit">Submit</button>
      ) : (
        <p></p>
      )}
        </div>
       
        
      </form>
    </div>
  );
};

export default AddNewApp;
