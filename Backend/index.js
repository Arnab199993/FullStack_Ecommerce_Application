const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
require("./DataBase/Config");
const users = require("./DataBase/Users");
const Products = require("./DataBase/Products");
const Jwt = require("jsonwebtoken");
const jwtKey = "E-Commerce";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/Uploads", express.static("Uploads"));

const uploadDirectory = "Uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("file");

app.get("/", verifyToken, async (req, res) => {
  try {
    const data = await users.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
// app.post("/sign-up", async (req, res) => {
//   const data = new users(req.body);
//   let result = await data.save();
//   result = result.toObject();
//   delete result.password;
//   console.log(req.body);
//   console.log(result);
//   Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//     if (err) {
//       res.send("Something went wrong!Please try again after some time");
//     }
//     res.send({ result, auth: token });
//   });
// });
app.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ result: "Please provide all required fields" });
    }
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ result: "Email is already registered" });
    }

    const data = new users(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res
          .status(500)
          .send("Something went wrong! Please try again after some time");
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const data = await users.findOne(req.body).select("-password");
      if (data) {
        Jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.send("Something went wrong!Please try again after some time");
          }
          res.send({ data, auth: token });
        });
      }
    } else {
      res.send({ result: "Give it a valid username and password" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/add-product", upload, verifyToken, async (req, res) => {
  try {
    const data = new Products(req.body);
    data.files = req.file.path;
    const result = await data.save();
    if (!data || !data.files) {
      res.send({ status: 400, message: "Bad request" });
    } else {
      res.send(result);
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});
app.get("/productsList", verifyToken, async (req, res) => {
  const data = await Products.find();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "No result found" });
  }
});
app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const data = await Products.deleteOne({ _id: req.params.id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ data: "No record found" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.put("/product/:id", verifyToken, async (req, res) => {
  try {
    let result = await Products.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
    console.log("resulttt", result);
  } catch (error) {
    console.log(error);
  }
});
app.get("/search/:key", verifyToken, async (req, res) => {
  const data = await Products.find({
    $or: [
      {
        name: { $regex: req.params.key, $options: "i" },
      },
      {
        company: { $regex: req.params.key, $options: "i" },
      },
      {
        Category: { $regex: req.params.key, $options: "i" },
      },
      {
        price: { $regex: req.params.key, $options: "i" },
      },
    ],
  });
  res.send(data);
});
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
        // console.log("Middlewear Called", token);
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000);
