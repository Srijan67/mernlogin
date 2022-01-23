import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  //using async await
  const callForLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      //   const data = await res.json();
      //   setUserData(data);
      console.log("Status currently is " + res.status);
      if (res.status !== 200) {
        const err = new Error(res.error);
        throw err;
      } else {
        dispatch({ type: "USER", payload: false });
      }
      console.log("This is login after logout");
      navigate("/login");
    } catch (error) {
      console.log("Error in Logout");
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("Calling useEffect for logout");
    callForLogout(); //becoz async can't be send through useEffect hook
  }, []);
  return (
    <>
      <h1>This is logout page</h1>
    </>
  );
};
export default Logout;
