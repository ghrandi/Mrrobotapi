const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
      username: String,
    email: String,
    object: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
