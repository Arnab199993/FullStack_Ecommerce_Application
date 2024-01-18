const mongoose = require("mongoose");
const filesSchema = mongoose.Schema({
  file: String,
});
module.exports = mongoose.model("files", filesSchema);
