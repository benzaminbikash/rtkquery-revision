const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//Export the model
module.exports = mongoose.model("User", userSchema);
