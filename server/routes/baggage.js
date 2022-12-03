const router = require("express").Router();
const db = require("../db");
var moment = require("moment");
const { AllBaggageCaros } = require("../models/baggage");
const { AddFlight } = require("../models/addFlight");

router.post("/allbaggages", async (req, res) => {
  try {
    const letterArr = ["C"];
    var baggageArr = [];
    for (var i = 0; i < letterArr.length; i++) {
      for (var j = 1; j <= 15; j++) {
        var baggageCarNumber = "";
        baggageCarNumber += letterArr[i];
        baggageCarNumber += j;
        baggageArr.push(baggageCarNumber);
      }
    }
    console.log(baggageArr);
    var data = [];
    baggageArr.forEach(async (g) => {
      data.push({
        carosuel_number: g,
        carosuel_status: "",
        airline: "",
        flight_type: "",
        time_from: "",
        time_to: "",
        booking: [],
      });
    });
    console.log("DATA :", data.length);
    const gateCheck = await AllBaggageCaros.findOne(data.gate);
    if (gateCheck) {
      return res.send({
        message: " Carosuel is already added in the database",
      });
    }
    await AllBaggageCaros.insertMany(data)
      .then(() => {
        console.log("Data inserted"); // Success
        return;
      })
      .catch((error) => {
        console.log(error); // Failure
      });
    res.send({ message: "Gate numbers" + baggageArr });
  } catch (error) {
    res.send(error);
  }
});

router.post("/assign/carousel", async (req, res) => {
  console.log("Hitting assign carousel api");

  // console.log("Obj from front end :", req.body._id);
  // const flightData = req.body;
  // console.log("Flight Data :", flightData);

  // try {
  //   const oneFlightData = await AddFlight.findById(req.body._id);
  //   console.log("oneFlightData", oneFlightData);
  //   console.log("Start time ", oneFlightData.time);

  //   var start_time = moment(oneFlightData.time);
  //   var end_time = start_time;

  //   end_time = moment(start_time).add(1, "hours");

  //   const start = moment(start_time).format("lll");
  //   const end = moment(end_time).format("lll");

  //   var new_start = start;
  //   var new_end = end;

  //   console.log("Start time ", new_start);

  //   console.log("End time ", new_end);
  // } catch (error) {
  //   res.send(error);
  // }

  try {
    const oneFlightData = await AddFlight.findById(req.body._id);
    console.log("oneFlightData", oneFlightData);
    console.log("Start time ", oneFlightData.time);

    var start_time = moment(oneFlightData.time);
    var end_time = start_time;

    end_time = moment(start_time).add(1, "hours");

    const start = moment(start_time).format("lll");
    const end = moment(end_time).format("lll");

    var new_start = start;
    var new_end = end;

    console.log("Start time ", new_start);

    console.log("End time ", new_end);
    var data = await AllBaggageCaros.find();
    // console.log("Carousels : ", data);
    let currentIndex = data.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [data[currentIndex], data[randomIndex]] = [
        data[randomIndex],
        data[currentIndex],
      ];
    }
    var gate = {};
    var booked = 0;
    data.forEach((g) => {
      if (booked == 0) {
        g.booking.forEach((time) => {
          if (
            moment(new_start).isBetween(time.end, time.start) ||
            moment(new_end).isBetween(time.end, time.start) ||
            moment(time.end).isBetween(moment(new_start), moment(new_end)) ||
            moment(time.start).isBetween(moment(new_start), moment(new_end))
          ) {
            booked = 1;
          }
        });
        if (booked == 0) {
          gate = g;
          booked = 1;
        }
      }
    });

    console.log("Carosuel : ", gate.carosuel_number);
    gate.booking.push({
      time_from: new_start,
      time_to: new_end,
      flight_id: req.body._id,
      gate_status: "in use",
    });
    gate.save();
    await AddFlight.findByIdAndUpdate(req.body._id, {
      bag_claim: gate.carosuel_number,
    });
    res.send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
