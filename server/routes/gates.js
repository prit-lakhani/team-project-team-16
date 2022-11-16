const router = require("express").Router();
const { Gate } = require("../models/gateAssign");

router.post("/addgates", async (req, res) => {
  try {
    const gate = await Gate.findOne({ gate_number: req.body.gate_number });
    if (gate.gate_number == req.body.gate_number) {
      return res.status(401).send({ message: "Gate Number is not occupied" });
    } else {
      res.send({ message: "Gate is already in use" });
    }
    res.status(200).send(gate);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/unassign", async (req, res) => {
  try {
    const gate = await Gate.findOne({ gaet_number: req.body.gate_number });
    if (gate.status == "") {
      return res.send({ message: "Gate is already free" });
    } else {
      const removeGate = await Gate.updateOne({
        $unset: { terminal: "", status: "", from: "", to: "", flight: "" },
      });
      if (!removeGate) {
        res.send({ message: "Gate unassign successfully" });
      }
    }
  } catch (error) {}
});

router.get("/getgates", async (req, res) => {
  try {
    const gate = await Gate.find();
    if (gate.length > 0) {
      return res.send(gate);
    } else {
      return res.send({ message: "No gates found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
