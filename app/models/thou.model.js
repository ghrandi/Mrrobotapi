const mongoose = require("mongoose");

const ThouSchema = mongoose.Schema(
   {
    idsmat: String,
    
   
    nom: String,
      
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Thou", ThouSchema);
