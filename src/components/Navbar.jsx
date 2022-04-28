import React, { useEffect, useState } from "react";
import "../components/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
function Navbar() {
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const navigate = useNavigate();
  const islogged = async () => {
    try {
      const response = await fetch("http://localhost:3000/home", {
        method: "GET",
      });

      const data = await response.json();
      console.log(data);
      setName(data.fName + " " + data.lName);
      setProfileImg(data.profileImg);
      if (response.status === 307) {
        navigate("/login");
        toast.error("User Not logged In");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    islogged();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <a className="navbar-brand">BUZZ</a>
        <form className="navbar-form form-inline">
          <div className="input-group search-box">
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search"
            ></input>
            <span className="input-group-addon">
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </span>
          </div>
        </form>
        <div className="navbar-nav ml-auto ">
          <a className="nav-item nav-link notifications">
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            <span className="badge">1</span>
          </a>
          <a className="nav-item nav-link messages">
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            <span className="badge">10</span>
          </a>{" "}
          <Link to={"/userProfile"}>
            <img className="addFeedImg" src={profileImg} alt="profileImg" />
            <span className="user">{name}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
