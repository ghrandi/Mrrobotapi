const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema(
  {
    title: String,
    mat: 
       String,
   
 
    smat: String,
    file: String,
	thou: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", ContentSchema);
