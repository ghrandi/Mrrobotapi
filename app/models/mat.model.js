const mongoose = require("mongoose");

const MatSchema = mongoose.Schema(
   {
    content: String,
    photo: String,
   
    nom: String,
      
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mat", MatSchema);
