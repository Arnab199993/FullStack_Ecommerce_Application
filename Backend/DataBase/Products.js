const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
  files: String,
});
module.exports = mongoose.model("products", ProductSchema);
