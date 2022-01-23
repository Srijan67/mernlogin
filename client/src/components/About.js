import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const About = () => {
  const { state, dispatch } = useContext(UserContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);

      if (res.status !== 200 || !data) {
        console.log("No user data found!");
        setUserData({ ...userData, name: "", email: "", phone: "" });
      } else {
        dispatch({ type: "USER", payload: true });

        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAboutPage(); //becoz async can't be send through useEffect hook
  }, []);
  return (
    <>
      <h1>This is About page</h1>
      <form method="GET">
        <div className="profile">
          <img
            className="profile_img"
            src={
              userData.name === ""
                ? "https://www.passportvisasexpress.com/images/example_passport_photos/rejected_photo_03.png"
                : "https://picsum.photos/200/300"
            }
            alt="your profile"
          />
          <div className="personal_info">
            <h2>{userData.name === "" ? "Your Name" : `${userData.name}`}</h2>
            <h3>
              {userData.email === "" ? "example@xyz.com" : `${userData.email}`}
            </h3>
            <p>
              My Phone Number:{" "}
              {userData.phone === "" ? "99XXXXXX12" : `${userData.phone}`}
            </p>

            <br />
            <p>my little work profession= {userData.work}</p>
          </div>
        </div>
      </form>
    </>
  );
};
export default About;
