const router = require("express").Router();
const { Gate } = require("../models/gateAssign");

function checkGateNumber(gate) {
  console.log(gate);
  var letter = gate.slice(0, 1);
  console.log("letter :", letter);
  var last2letter = parseInt(gate.slice(-2));
  console.log("last2letter :", last2letter);

  if (gate.length > 3) {
    return false;
  }
  if (letter !== "A" && letter !== "B" && letter !== "C") {
    console.log("Letter is not A/B/C");
    return false;
  }
  if (last2letter < 1 || last2letter > 32) {
    console.log("Numbers are not valid");

    return false;
  }
  return true;
}

router.post("/unassign", async (req, res) => {
  try {
    console.log("STATUS :", req.body.status);
    console.log("GATE NUMBER :", req.body.gate_number);
    if (!checkGateNumber(req.body.gate_number)) {
      res.send({ message: "Gate nunmber is invlaid" });
    }
    const gate = await Gate.findOne({ gate_number: req.body.gate_number });
    console.log("Gate to be updated:", gate);
    if (gate.status === "") {
      return res.send({ message: "Gate is already free" });
    } else {
      const removeGate = await Gate.updateOne(
        { gate_number: req.body.gate_number },
        {
          terminal: "",
          status: "",
          from: "",
          to: "",
          flight: "",
        }
      );
      console.log("Gate is not empty");
      if (removeGate) {
        res.send({ message: "Gate unassign successfully" });
      } else {
        res.send({ message: "Gate unassign unsuccessful" });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/assign", async (req, res) => {
  try {
    console.log("STATUS :", req.body.status);
    if (!checkGateNumber(req.body.gate_number)) {
      res.send({ message: "Gate nunmber is invlaid" });
    }
    console.log("GATE NUMBER :", req.body.gate_number);
    const gate = await Gate.findOne({ gate_number: req.body.gate_number });
    console.log("Gate to be updated:", gate);
    if (gate.status === "") {
      const assignGate = await Gate.updateOne(
        { gate_number: req.body.gate_number },
        {
          terminal: "Test",
          status: "Test",
          from: "Test",
          to: "Test",
          flight: "Test",
        }
      );
      if (assignGate) {
        res.send({ message: "Gate assign successfully" });
      } else {
        res.send({ message: "Gate assign unsuccessful" });
      }
    } else {
      return res.send({ message: "Gate could not assign" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/getgates", async (req, res) => {
  try {
    const gate = await Gate.find();
    console.log("Gates:", gate);
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

router.post("/addgate", async (req, res) => {
  try {
    if (!checkGateNumber(req.body.gate_number)) {
      return res.send({ message: "Gate nunmber is invlaid" });
    }
    const checkGate = await Gate.findOne({ gate_number: req.body.gate_number });
    console.log("checkGate: ", checkGate);
    if (checkGate) {
      return res.send({ message: "Gate number is already added" });
    } else {
      await new Gate(req.body).save();
    }
    res.send({ message: "Gate added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
