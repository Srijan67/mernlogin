import "./App.css";
import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Product from "./components/Product";
import Login from "./components/Login";
import Navbar from "./Navbar";
import Error from "./components/Error";
import Logout from "./components/Logout";
export const UserContext = createContext();
const initialState = 0;
const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
