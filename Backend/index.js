const express = require("express");
const cors = require("cors");
require("./DataBase/Config");
const users = require("./DataBase/Users");
const Products = require("./DataBase/Products");

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
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  console.log(req.body);
  console.log(result);
  res.send(result);
});
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const data = await users.findOne(req.body).select("-password");
    if (data) {
      res.send(data);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Give it a valid username and password" });
  }
});
app.post("/add-product", async (req, res) => {
  const data = new Products(req.body);
  const result = await data.save();
  res.send(result);
  console.log(req.body);
  console.log(result);
});
app.get("/productsList", async (req, res) => {
  const data = await Products.find();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "No result found" });
  }
});
app.listen(5000);
