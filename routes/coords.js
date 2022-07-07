const coordsModel = require("../models/coords");
const express = require("express");
const router = express.Router();


router.get("/init", async (req, res) => {
  let cm = await coordsModel.findOne({ user: "anon" });
  res.send(cm);
});

router.post("/savecords", async (req, res) => {
  let cm = await coordsModel.find();
  cm = cm[0];
  if (cm == null) {
    let cm = new coordsModel({ xPos: 0, yPos: 0 });
    cm.save();
  } else {
    cm.xPos = req.body.xPos;
    cm.yPos = req.body.yPos;
    cm.save();
    console.log(cm);
  }
});

module.exports = router;
