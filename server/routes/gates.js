const router = require("express").Router();
const db = require("../db");
const { Gate } = require("../models/gateAssign");
const { AllGatesDetails } = require("../models/gates");

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

const randomGate = () => {
  var result = "";
  var characters = "ABC";
  result += characters.charAt(Math.floor(Math.random() * 3));
  result += Math.floor(Math.random() * (32 - 1)) + 1;
  return result;
};

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

router.get("/getgate/:id", async (req, res) => {
  try {
    //console.log("IDS:", req.params);
    const gate = await Gate.findOne({ flight_id: req.params.id });
    //console.log("Gates:", gate);
    if (gate) {
      res.send({ gate: gate.gate_number });
    } else {
      res.send({ gate: "" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/addgate", async (req, res) => {
  console.log("Actucal gate no:", randomGate());

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

router.post("/random/assign", async (req, res) => {
  //   try {
  //     const ext_gate = await Gate.findOne({ flight_id: req.body.flight_id });
  //     if (ext_gate) {
  //       res.send({ message: "Gate already assigned" });
  //       return;
  //     }
  //     for (var i = 0; i < 20; i++) {
  //       const gateRandom = randomGate();
  //       const gate = await Gate.findOne({ gate_number: gateRandom });
  //       if (gate) {
  //         if (gate.flight_id === "") {
  //           await Gate.updateOne(
  //             { gate_number: gateRandom },
  //             {
  //               terminal: req.body.terminal,
  //               flight_type: req.body.flight_type,
  //               time_from: req.body.time,
  //               time_to: req.body.time,
  //               airline: req.body.airline,
  //               flight_id: req.body.flight_id,
  //             }
  //           );
  //           await Gate.updateOne(
  //             { gate_number: gateRandom },
  //             {
  //               $set: { time_to: { $add: ["$time_from", 10 * 60 * 1000] } },
  //             }
  //           );
  //           res.send({
  //             gateNum: gateRandom,
  //             message: "Gate:" + gateRandom + " assign successfully",
  //           });
  //           return;
  //         }
  //       } else {
  //         await new Gate({
  //           gate_number: gateRandom,
  //           terminal: req.body.terminal,
  //           flight_type: req.body.flight_type,
  //           time_from: req.body.time,
  //           time_to: req.body.time,
  //           airline: req.body.airline,
  //           flight_id: req.body.flight_id,
  //         }).save();
  //         res.send({
  //           gateNum: gateRandom,
  //           message: "Gate:" + gateRandom + " created succesfully",
  //         });
  //         return;
  //       }
  //     }
  //     res.send({ message: "Gate could not assign" });
  //   } catch (error) {
  //     res.send(error);
  //   }
  try {
    // console.log(req.body);
    // console.log("data");
    // console.log("Req body:", req.body);
    //add 1 hour to scheduled time
    console.log("time from frontend: ", req.body.time);
    var start = req.body.time;
    var end = req.body.end;

    // end.setTime(end.getTime() + 60 * 60 * 1000);

    console.log("Start :", start, "End : ", end);
    // const formatted_start = moment(start).format("lll");
    // console.log("formatted_start :", formatted_start);

    var data = [];
    data = await AllGatesDetails.find();
    // console.log(data);

    // data.forEach((e) => {
    //   // logic
    //   console.log(e.gate_number);
    // });

    let currentIndex = data.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }
    console.log("Shuffed data lenght :", data.length);

    const randomGateNumber = Math.floor(Math.random() * (32 - 1)) + 1;
    console.log("randomGateNumber", randomGateNumber);
    console.log("randomGateNumber data", data[randomGateNumber]);

    data.forEach(async (e) => {
      //   e.booking.forEach((time) => {
      //     if (time.end <= start) {
      //       return true;
      //     }
      //     return false;
      //   });

      //   if (e) break;
      // if(gateData.booking )
      //for booking - start and end - check for all booking
      // assign - database (flight, allgate)

      //   console.log("E :", e);
      const gateObj = {
        gate_number: e.gate_number,
        terminal: req.body.terminal,
        flight_type: req.body.flight_type,
        time_from: start,
        time_to: end,
        airline: req.body.airline,
        flight_id: req.body.flight_id,
        booking: [
          {
            start: start,
            end: end,
            flight_id: req.body.flight_id,
          },
        ],
      };

      const gateData = await AllGatesDetails.updateOne(
        { gate_number: e.gate_number },
        gateObj
      );
      if (gateData) {
        return res.send({
          message:
            "Gate details added successfully into all gates detials document.",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/allgates", async (req, res) => {
  //   for (var i = 0; i < 96; i++) {
  // var j = 0;
  try {
    const letterArr = ["A", "B", "C"];
    var gateNumArr = [];
    for (var i = 0; i < letterArr.length; i++) {
      for (var j = 1; j <= 32; j++) {
        var gateNumber = "";
        gateNumber += letterArr[i];
        gateNumber += j;
        gateNumArr.push(gateNumber);
      }
    }
    console.log(gateNumArr);
    var data = [];

    gateNumArr.forEach(async (g) => {
      data.push({
        gate_number: g,
        gate_status: "",
        terminal: "",
        airline: "",
        flight_type: "",
        time_from: "",
        time_to: "",
        booking: [
          {
            start: "",
            end: "",
            flight_id: "",
          },
        ],
      });
    });
    console.log("DATA :", data.length);

    const gateCheck = await AllGatesDetails.findOne(data.gate);
    if (gateCheck) {
      return res.send({ message: " Gate is already added in the database" });
    }

    await AllGatesDetails.insertMany(data)
      .then(() => {
        console.log("Data inserted"); // Success
        return;
      })
      .catch((error) => {
        console.log(error); // Failure
      });
    res.send({ message: "Gate numbers" + gateNumArr });
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
