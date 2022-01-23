import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "./App";
import React, { useContext } from "react";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const Renderer = () => {
    if (!state) {
      return (
        <>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/product"
          >
            Product
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/signup"
          >
            Sign Up
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/product"
          >
            Product
          </NavLink>
          <NavLink
            className="navlink"
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to="/logout"
          >
            Logout
          </NavLink>
        </>
      );
    }
  };

  return (
    <>
      <div className="Navbar">
        <p className="App"> this is navbar </p>

        <Renderer />
      </div>
      <Outlet />
    </>
  );
}
export default Navbar;
