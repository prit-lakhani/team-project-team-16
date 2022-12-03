const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  console.log("Hitting server");
  res.status(200).send("Done");
});

module.exports = router;
