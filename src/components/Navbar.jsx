import React, { useEffect, useState, useContext } from "react";
import "../components/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { userContext } from "../pages/Home";

function Navbar() {
  const globaluser = useContext(userContext);
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [isModerator, setIsModerator] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const islogged = async () => {
    try {
      const response = await fetch("http://localhost:3000/home", {
        method: "GET",
      });
      const data = await response.json();
      if (response.status === 307) {
        navigate("/login");
        toast.error("User Not logged In");
      }
      setName(data.fName + " " + data.lName);
      setIsModerator(data.is_Admin);
      setProfileImg(data.profileImg);
      globaluser.update(data.profile_img, data.is_Admin, data.user_id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    islogged();
  }, []);
  const logout = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/logout");
      if (res.status == 200) {
        toast.success("Logout successfully");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const handleSearch = async (e) => {
    try {
      const result = await fetch(
        "http://localhost:3000/api/search/suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: e.target.value,
          }),
        }
      );
      const data = await result.json();
      if (result.status == 201) setSuggestions(data.message);
      else setSuggestions([]);
    } catch (err) {
      console.log("" + err);
    }
  };
  return (
    <>
      <nav className="sticky-top navbar navbar-expand-xl navbar-light bg-light ">
        <a className="navbar-brand">BUZZ</a>
        <span className="navbar-brand">{isModerator ? "MODERATOR" : ""}</span>
        <form className="navbar-form form-inline">
          <div className="input-group search-box">
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search"
              onChange={handleSearch}
            ></input>
            <span className="input-group-addon">
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </span>
          </div>
          <div className="suggestions">
            {suggestions.map((e) => {
              return (
                <div>
                  <img
                    className="image"
                    src={e.profile_img}
                    width="40px"
                    height="40px"
                  />
                  <span>{e.firstname + " " + e.lastname}</span>
                </div>
              );
            })}
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
          <a className="user" href="#">
            <strong
              style={{ color: "black", marginLeft: "10px" }}
              onClick={logout}
            >
              Logout
            </strong>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
