import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordStrong = (password) => {
    // Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegistration = async () => {
    if (!isEmailValid(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!isPasswordStrong(password)) {
      setPasswordError('Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

    try {
      const response = await axios.post('http://51.20.118.62:8000/auth/users/', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // Registration successful, you can handle success as needed
        window.location.href ='/login';
        alert('Registration successful');
        
        
      } else {
        // Handle registration failure
        alert('Registration failed');
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <div className="login-form registration-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="login-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          className="login-input"
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button onClick={handleRegistration} className="login-button">
          Register
        </button>
        <a href="/login">click to Login</a>
      </div>

    </div>
  );
};

export default Register;
