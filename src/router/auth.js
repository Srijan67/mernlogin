const express = require("express");
const router = new express.Router();
const middleware = require("../middleware/middleware");

const UserReg = require("../models/userReg");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
let token;

router.post("/", (req, res) => {
  console.log("This is post / page");
  res.send("This is root router dir");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  const user = new UserReg({ name, email, phone, work, password, cpassword });
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).send("Fill all the fields!");
  } else if (cpassword !== password) {
    return res.status(422).send("password and confirm password are not same.");
  }
  try {
    const findUser = await UserReg.findOne({ email: email });
    if (findUser) {
      return res.status(422).send("User Already Exist!");
    }
    await user.save();
    return res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(500).send(`Error is ${error}`);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "fill the fields" });
  }

  try {
    const findUser = await UserReg.findOne({ email });
    const compare = await bcrypt.compare(password, findUser.password);

    // email = "";
    // password = "";
    if (!findUser) {
      return res.status(404).json({ message: "Invalid Data" });
    } else if (!compare) {
      return res.status(400).json({ message: "Invalid Data" });
    } else {
      token = await findUser.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 259200000),
        httpOnly: true,
      });
      return res.status(200).json({ message: "Logged In successfully" });
    }
  } catch (e) {
    res.status(400).json({ message: e });
  }
});
router.get("/home", middleware, (req, res) => {
  res.send(req.rootUser);
});
router.get("/about", middleware, (req, res) => {
  res.send(req.rootUser);
});
router.get("/getdata", middleware, (req, res) => {
  res.send(req.rootUser);
});
router.post("/contact", middleware, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.status(400).json({ error: "message error" });
    }
    const userContact = await UserReg.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();

      res.status(200).json({ message: "user contact sucessful" });
      console.log("Saved successful");
    }
  } catch (error) {
    console.log("this is auth contact user error: " + error);
  }
});

//logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  console.log("This is clearing cookie");

  res.status(200).send("Cookie Cleard");
});

module.exports = router;
