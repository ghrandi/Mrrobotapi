const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "The name is unique"],
    },
    quantity: String,
    description: String,
    price: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
