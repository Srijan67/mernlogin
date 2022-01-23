import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);

  const [userData, setUserData] = useState("");
  const homeName = async () => {
    try {
      const res = await fetch("/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status !== 200) {
        setUserData("");
        const err = new Error(res.error);
        throw err;
      } else {
        dispatch({ type: "USER", payload: true });

        setUserData(data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("checking user last login");
    homeName(); //becoz async can't be send through useEffect hook
  }, []);

  return (
    <>
      <h1>Welcome! {userData === "" ? "" : `${userData}`}</h1>
      <h2>We are mern developer</h2>
    </>
  );
};
export default Home;
