import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const InputValue = (e) => {
    const { name, value } = e.target;
    setUser((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          work: work,
          password: password,
          cpassword: cpassword,
        }),
      });
      //doubt--worked
      const data = res.json();
      console.log(res.status);
      if (res.status === 422 || !data || res.status === 404) {
        alert("Invalid Registration");
        console.log("invalid reg");
      } else {
        alert("Successful registration!");
        console.log("successful registered");
        navigate("/login");
      }
      // if (data.status === 200 || data.status === 201 || data.status == 201) {
      //   alert("Successful registration!");
      //   console.log("successful registered");
      // } else {
      //   alert("Invalid Registration");
      //   console.log("invalid reg");
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>This is Registration page</h1>
      <form method="POST" className="register" id="register">
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={InputValue}
          placeholder="Enter your full name"
        />
        <input
          autoComplete="off"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={InputValue}
          placeholder="Enter your Email"
        />
        <input
          autoComplete="off"
          type="number"
          name="phone"
          id="phone"
          value={user.phone}
          onChange={InputValue}
          placeholder="Enter your Phone number"
        />
        <input
          autoComplete="off"
          type="text"
          name="work"
          id="work"
          value={user.work}
          onChange={InputValue}
          placeholder="Enter our work"
        />
        <input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={InputValue}
          placeholder="Enter password"
        />
        <input
          autoComplete="off"
          type="password"
          name="cpassword"
          id="cpassword"
          value={user.cpassword}
          onChange={InputValue}
          placeholder="Enter confirm password"
        />
        <button className="submit" type="submit" onClick={PostData}>
          Sign Up
        </button>
      </form>
      <NavLink to="/login">Already have an account?</NavLink>
    </>
  );
};
export default SignUp;
