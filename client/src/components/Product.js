import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Product = () => {
  const { state, dispatch } = useContext(UserContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const callContactData = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if (!data || res.status !== 200) {
        console.log("no user data found");
        setUserData({
          ...userData,
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        const err = new Error(res.error);
        throw err;
      } else {
        console.log("User data found!");
        dispatch({ type: "USER", payload: true });

        setUserData({
          ...userData,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }
      console.log("completed getdata");
    } catch (err) {
      console.log("This is Error of catch: " + err);
    }
  };

  useEffect(() => {
    callContactData(); //becoz async can't be send through useEffect hook
  }, []);
  //storing data
  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //sending data
  const contactForm = async (e) => {
    e.preventDefault();
    try {
      console.log("clicked");
      const { name, email, phone, message } = userData;
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });
      const secData = await response.json();
      console.log(secData);
      if (!secData || response.status !== 200) {
        console.log("message not sent");
      } else {
        alert("message sent");
        setUserData({ ...userData, message: "" });
      }
    } catch (err) {
      console.log("This is catch Error: " + err);
    }
  };

  return (
    <>
      <h1>This is Product page</h1>
      <form method="get" className="contact-form">
        <input
          type="text"
          value={userData.name}
          name="name"
          onChange={inputChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={userData.email}
          name="email"
          onChange={inputChange}
          placeholder="Email Id"
          required
        />
        <input
          type="number"
          value={userData.phone}
          name="phone"
          onChange={inputChange}
          placeholder="Phone No."
          required
        />
        <br />
        <textarea
          rows="10"
          cols="30"
          name="message"
          value={userData.message}
          onChange={inputChange}
          placeholder="Write your message"
          required
        ></textarea>
        <br />
        <input
          type="submit"
          className="submit"
          value="Submit"
          onClick={contactForm}
        />
      </form>
    </>
  );
};
export default Product;
