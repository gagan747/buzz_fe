import FriendBar from './components/FriendBar';
import './App.css';
import React, { useState } from "react"
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from "./components/forgotpassword.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.js";
import NotFound from "./pages/notfound.jsx"
import UserProfile from './components/userProfile/UserProfile';
import ViewProfile from './components/viewProfile/ViewProfile';
import GetFriendRequest from './components/getFriendRquest/GetFriendRequest';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/home" element={<> <Home />  </>} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/viewProfile' element={<ViewProfile />} />
          <Route path='/getFriendRequest' element={<GetFriendRequest />} />
          <Route path="/login/:error" element={<Login error="Not a valid TTN mail" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>);
}
export default App;
