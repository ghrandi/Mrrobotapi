const mongoose = require("mongoose");

const SmatSchema = mongoose.Schema(
   {
    content: String,
    idMat: String,
   
    nom: 
       String
     
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Smat", SmatSchema);
