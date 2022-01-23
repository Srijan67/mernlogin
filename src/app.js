const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("./db/conn");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./router/auth"));

//routing
// app.get("/", (req, res) => {
//   res.send("This is Root directory.");
// });
// app.get("/product", (req, res) => {
//   res.send("This is product directory.");
// });

// app.get("/register", (req, res) => {
//   res.send("This is Register (Sign Up) directory.");
// });

//heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log("project successfully launched at port: " + port);
});
