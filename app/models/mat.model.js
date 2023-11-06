const mongoose = require("mongoose");

const MatSchema = mongoose.Schema(
   {
    content: String,
    
   
    nom: String,
      
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mat", MatSchema);
