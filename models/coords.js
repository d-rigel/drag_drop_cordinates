const mongoose = require("mongoose");

const coordsSchema = new mongoose.Schema({
  xPos: {
    type: Number, 
    required: true
  },
  yPos: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model("coords", coordsSchema);