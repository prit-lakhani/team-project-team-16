const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    if (user.password !== req.body.password) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    res.status(200).send({ message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
