import FriendBar from './components/FriendBar';
import './App.css';
import React from "react"
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from "./components/forgotpassword.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.js";
import NotFound from "./pages/notfound.jsx"
import UserProfile from './components/userProfile/UserProfile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/home" element={<> <Home /> <FriendBar /> </>} />
          <Route path='/userProfile' element={<UserProfile/>} />
        </Routes>
        <ToastContainer />
      </Router>
    </>);
}

export default App;

