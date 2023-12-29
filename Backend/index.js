const express = require("express");
const cors = require("cors");
require("./DataBase/Config");
const users = require("./DataBase/Users");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  try {
    const data = await users.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.post("/sign-up", async (req, res) => {
  const data = new users(req.body);
  const result = await data.save();
  console.log(req.body);
  console.log(result);
  res.send(result);
});
app.listen(5000);
