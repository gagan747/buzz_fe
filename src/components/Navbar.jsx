import React from "react";
import "../components/navbar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
function navbar() {
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
          <span className="user">Ayush Saxena</span>
        </div>
      </nav>
    </>
  );
}

export default navbar;
