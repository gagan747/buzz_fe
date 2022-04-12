import logo from './logo.svg';
import './App.css';
import React from "react"
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
<ToastContainer />
    <Login />
    <Signup />
  
     
    </>);
}

export default App;