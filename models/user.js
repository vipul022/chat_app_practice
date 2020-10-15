const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    // min_length: 3,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
    // min_length: 6,
  },
});

User.plugin(require("mongoose-bcrypt"));

module.exports = mongoose.model("User", User);
