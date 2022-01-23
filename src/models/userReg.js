const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//converting password into hash
userRegSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  }
  next();
});

//generating json web token
userRegSchema.methods.generateAuthToken = async function (req, res) {
  try {
    let token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    console.log(token);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
//store the message
userRegSchema.methods.addMessage = async function (
  name,
  email,
  phone,
  message
) {
  try {
    // console.log("1st Check" + this.messages.concat({ message }));
    // console.log(
    //   "SEC Check" + this.messages.concat(name, email, phone, message)
    // );

    this.messages = this.messages.concat({ name, email, phone, message });

    console.log("messages function added");
    await this.save();
    return this.messages;
  } catch (error) {
    console.log("This is add message error in this function: " + error);
  }
};

//Model
const UserReg = new mongoose.model("UserReg", userRegSchema);

module.exports = UserReg;
