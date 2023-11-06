const mongoose = require("mongoose");

const ProfSchema = mongoose.Schema(
  {
    fname: String,
    lname: String,
   
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prof", ProfSchema);
