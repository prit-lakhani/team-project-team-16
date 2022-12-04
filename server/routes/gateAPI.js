// const router = require("express").Router();
// const db = require("../db");
// var moment = require("moment");

// const { Gate } = require("../models/gateAssign");
// const { AllGatesDetails } = require("../models/gates");
// const { AddFlight } = require("../models/addFlight");

// //function to check gate number
// function checkGateNumber(gate) {
//   console.log(gate);
//   var letter = gate.slice(0, 1);
//   console.log("letter :", letter);
//   var last2letter = parseInt(gate.slice(-2));
//   console.log("last2letter :", last2letter);

//   if (gate.length > 3) {
//     return false;
//   }
//   if (letter !== "A" && letter !== "B" && letter !== "C") {
//     console.log("Letter is not A/B/C");
//     return false;
//   }
//   if (last2letter < 1 || last2letter > 32) {
//     console.log("Numbers are not valid");

//     return false;
//   }
//   return true;
// }

// //Generating random gate
// const randomGate = () => {
//   var result = "";
//   var characters = "ABC";
//   result += characters.charAt(Math.floor(Math.random() * 3));
//   result += Math.floor(Math.random() * (32 - 1)) + 1;
//   return result;
// };

// //Unassigning gates
// router.post("/unassign", async (req, res) => {
//   try {
//     console.log("STATUS :", req.body.status);
//     console.log("GATE NUMBER :", req.body.gate_number);
//     if (!checkGateNumber(req.body.gate_number)) {
//       res.send({ message: "Gate nunmber is invlaid" });
//     }
//     const gate = await Gate.findOne({ gate_number: req.body.gate_number });
//     console.log("Gate to be updated:", gate);
//     if (gate.status === "") {
//       return res.send({ message: "Gate is already free" });
//     } else {
//       const removeGate = await Gate.updateOne(
//         { gate_number: req.body.gate_number },
//         {
//           terminal: "",
//           status: "",
//           from: "",
//           to: "",
//           flight: "",
//         }
//       );
//       console.log("Gate is not empty");
//       if (removeGate) {
//         res.send({ message: "Gate unassign successfully" });
//       } else {
//         res.send({ message: "Gate unassign unsuccessful" });
//       }
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

// //Assigning gates
// router.post("/assign", async (req, res) => {
//   try {
//     console.log("STATUS :", req.body.status);
//     if (!checkGateNumber(req.body.gate_number)) {
//       res.send({ message: "Gate nunmber is invlaid" });
//     }
//     console.log("GATE NUMBER :", req.body.gate_number);
//     const gate = await Gate.findOne({ gate_number: req.body.gate_number });
//     console.log("Gate to be updated:", gate);
//     if (gate.status === "") {
//       const assignGate = await Gate.updateOne(
//         { gate_number: req.body.gate_number },
//         {
//           terminal: "Test",
//           status: "Test",
//           from: "Test",
//           to: "Test",
//           flight: "Test",
//         }
//       );
//       if (assignGate) {
//         res.send({ message: "Gate assign successfully" });
//       } else {
//         res.send({ message: "Gate assign unsuccessful" });
//       }
//     } else {
//       return res.send({ message: "Gate could not assign" });
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

// //Getting gate details
// router.get("/getgates", async (req, res) => {
//   try {
//     const gate = await AllGatesDetails.find();
//     // console.log("Gates:", gate);
//     if (gate.length > 0) {
//       return res.send(gate);
//     } else {
//       return res.send({ message: "No gates found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// router.get("/getgate/:id", async (req, res) => {
//   try {
//     //console.log("IDS:", req.params);
//     const gate = await Gate.findOne({ flight_id: req.params.id });
//     //console.log("Gates:", gate);
//     if (gate) {
//       res.send({ gate: gate.gate_number });
//     } else {
//       res.send({ gate: "" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// router.post("/addgate", async (req, res) => {
//   console.log("Actucal gate no:", randomGate());

//   try {
//     if (!checkGateNumber(req.body.gate_number)) {
//       return res.send({ message: "Gate nunmber is invlaid" });
//     }
//     const checkGate = await Gate.findOne({ gate_number: req.body.gate_number });
//     console.log("checkGate: ", checkGate);
//     if (checkGate) {
//       return res.send({ message: "Gate number is already added" });
//     } else {
//       await new Gate(req.body).save();
//     }
//     res.send({ message: "Gate added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// //Creating API to randomly assign gates
// router.post("/random/assign", async (req, res) => {
//   try {
//     var new_start = req.body.time;
//     var new_end = req.body.end;
//     var data = await AllGatesDetails.find();

//     let currentIndex = data.length,
//       randomIndex;
//     while (currentIndex != 0) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       [data[currentIndex], data[randomIndex]] = [
//         data[randomIndex],
//         data[currentIndex],
//       ];
//     }
//     var gate = {};
//     var booked = 0;

//     data.forEach((g) => {
//       if (booked == 0) {
//         g.booking.forEach((time) => {
//             //Checking for time conflicts
//           if (
//             moment(new_start).isBetween(time.end, time.start) ||
//             moment(new_end).isBetween(time.end, time.start) ||
//             moment(time.end).isBetween(moment(new_start), moment(new_end)) ||
//             moment(time.start).isBetween(moment(new_start), moment(new_end))
//           ) {
//             booked = 1;
//           }
//         });

//         if (booked == 0) {
//           gate = g;
//           booked = 1;
//         }
//       }
//     });
//     //Udating booking array
//     gate.booking.push({
//       time_from: new_start,
//       time_to: new_end,
//       flight_id: req.body.flight_id,
//       gate_status: "Booked",
//     });
//     gate.save();
//     //Udating flight detials in flight table
//     await AddFlight.findByIdAndUpdate(req.body.flight_id, {
//       gate: gate.gate_number,
//     });

//     res.send();
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/disable/gate", async (req, res) => {
//   console.log("BODY :", req.body);
//   try {
//     var new_start = req.body.startTime;
//     var new_end = req.body.endTime;
//     const gateToBeDisable = req.body.selectedGate;

//     // console.log("new start: ", new_start);
//     // console.log("new end: ", new_end);

//     console.log("gateToBeDisable: ", gateToBeDisable);

//     var data = await AllGatesDetails.find();
//     var gate = {};

//     data.forEach((gate) => {
//       if (gate.gate_number === gateToBeDisable) {
//         console.log("Gate number found from backend");
//       }
//     });
//     var booked = 0;
//     const gateData = await AllGatesDetails.findOne({
//       gate_number: gateToBeDisable.toUpperCase(),
//     });

//     var bookingArr = gateData.booking;

//     bookingArr.forEach((g) => {
//       console.log("new_start :", new_start);
//       console.log("new_end :", new_end);
//       console.log("----------------------");
//       console.log("time from :", g.time_from);
//       console.log("Time to :", g.time_to);

//       // if (moment(new_start).isBetween(g.time_from, g.time_to)) {
//       //   console.log(" 1 Condition matched");
//       // } else if (moment(new_end).isBetween(g.time_from, g.time_to)) {
//       //   console.log(" 2 Condition matched");
//       // } else if (
//       //   moment(g.time_to).isBetween(moment(new_start), moment(new_end))
//       // ) {
//       //   console.log(" 3Condition matched");
//       // } else if (
//       //   moment(g.time_from).isBetween(moment(new_start), moment(new_end))
//       // ) {
//       //   console.log(" 4 Condition matched");
//       // } else {
//       //   console.log("None of the above conditions mathced ");
//       // }
//       if (
//         moment(new_start).isBetween(g.time_from, g.time_to) ||
//         moment(new_end).isBetween(g.time_from, g.time_to) ||
//         moment(g.time_to).isBetween(moment(new_start), moment(new_end)) ||
//         moment(g.time_from).isBetween(moment(new_start), moment(new_end))
//       ) {
//         booked = 1;
//         console.log("Time is overlapping ");
//       }
//     });

//     if (booked == 0) {
//       bookingArr.push({
//         time_from: new_start,
//         time_to: new_end,
//         gate_status: "Under Maintenance",
//       });
//       gateData.save();
//       res.send(200);
//     }

//     res.status(400).send("Already ");
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/enable/gate/:id", async (req, res) => {
//   // console.log("Gate body : ", req.params.id);
//   console.log("Gate body : ", req.body.sendData.gateid);
//   console.log("book id : ", req.body.sendData.bookid);

//   const gateData = await AllGatesDetails.findOne({
//     _id: req.body.sendData.gateid,
//   });
//   // res.send();
//   console.log("gateData : ", gateData);
//   // const gggg = gateData.booking.map((m) => {
//   //   console.log(m);
//   // });
//   var gate = gateData.booking.filter((g) => g._id != req.body.sendData.bookid);
//   // console.log("Filtered :", gate);

//   gateData.booking = gate;

//   gateData.save();

//   res.send(gate);
// });

// router.post("/allgates", async (req, res) => {
//   try {
//     const letterArr = ["A", "B", "C"];
//     var gateNumArr = [];
//     for (var i = 0; i < letterArr.length; i++) {
//       for (var j = 1; j <= 32; j++) {
//         var gateNumber = "";
//         gateNumber += letterArr[i];
//         gateNumber += j;
//         gateNumArr.push(gateNumber);
//       }
//     }
//     console.log(gateNumArr);
//     var data = [];

//     gateNumArr.forEach(async (g) => {
//       data.push({
//         gate_number: g,
//         gate_status: "",
//         terminal: "",
//         airline: "",
//         flight_type: "",
//         time_from: "",
//         time_to: "",
//         booking: [],
//       });
//     });
//     console.log("DATA :", data.length);

//     const gateCheck = await AllGatesDetails.findOne(data.gate);
//     if (gateCheck) {
//       return res.send({ message: " Gate is already added in the database" });
//     }

//     await AllGatesDetails.insertMany(data)
//       .then(() => {
//         console.log("Data inserted"); // Success
//         return;
//       })
//       .catch((error) => {
//         console.log(error); // Failure
//       });
//     res.send({ message: "Gate numbers" + gateNumArr });
//   } catch (error) {
//     res.send(error);
//   }
// });

// // router.post("/baggages", async (req, res) => {
// //   console.log("Hittinh baggage from baggages");
// // });

// module.exports = router;
