import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Accounts/Login";
import Register from "./components/Accounts/Register";
import Home from "./components/Home";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/user" element={<User/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
