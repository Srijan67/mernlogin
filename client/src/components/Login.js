import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const notify = () =>
    toast.error("Invalid Login Data!", {
      position: "top-center",
    });

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // const InputChange = (e) => {
  //   let { name, value } = e.target;
  //   setUser({ ...user, [name]: [value] });
  // };
  const verifyUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = response.json();
      console.log(response.status);
      if (response.status === 400 || response.status === 404 || !data) {
        notify();

        // alert("Invalid data");
        console.log("Invalid data!");
      } else {
        dispatch({ type: "USER", payload: true });
        alert("Successfully logged in");
        console.log("successful logged In");

        navigate("/");
      }
    } catch (error) {
      notify();

      console.log("error is: " + error);
    }
  };
  return (
    <>
      <h1>This is Login page</h1>
      <form method="POST" className="login" id="login">
        <input
          autoComplete="off"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your Email"
        />
        <input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password"
        />
        <button className="submit" type="submit" onClick={verifyUser}>
          Login
        </button>
      </form>
      <ToastContainer theme="dark" autoClose={2500} />
    </>
  );
};
export default Login;
