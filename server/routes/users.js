const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    await new User({ ...req.body }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/role", async (req, res) => {
  try {
    const data = await User.find();
    if (!data) {
      res.send({ message: "No user found!" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
