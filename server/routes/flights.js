const router = require("express").Router();
const { AddFlight } = require("../models/addFlight");
const url = require("url");
const { AllGatesDetails } = require("../models/gates");

router.post("/", async (req, res) => {
  try {
    await new AddFlight(req.body).save();
    res.status(201).send({ message: "Flight added" });
  } catch (error) {
    console.log(error);
    console.log("no data added");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await AddFlight.find();
    res.send(data);
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/arrivals", async (req, res) => {
  try {
    const data = await AddFlight.find({ flight_type: { $eq: "arriving" } });
    res.send(data);
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/departures", async (req, res) => {
  try {
    const data = await AddFlight.find({ flight_type: { $eq: "departing" } });
    res.send(data);
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    console.log("ID", req.params.id);
    const data = await AddFlight.findById(req.params.id);
    if (!data) {
      res.send({ message: "No data found for ID : " + req.params.id });
    } else {
      res.status(201).send(data);
    }
  } catch (error) {
    console.log("Error", error);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    console.log("BODY", req.body);
    const updatedOBJ = {
      airline: req.body.UpdateAirline,
      arriving_from: req.body.UpdateArrivinFrom,
      flight_type: req.body.UpdateFlightType,
      time: req.body.UpdateTime,
      terminal: req.body.UpdateTerminal,
      gate: "",
      bag_claim: req.body.UpdateBagClaim,
    };

    const updatedData = await AddFlight.findByIdAndUpdate(
      req.params.id,
      updatedOBJ
    );
    console.log("UPDATAED DATA", updatedData);
    if (!updatedData) {
      res.send({ message: "Data not updated" });
    } else {
      res.send(updatedData);
    }
  } catch (error) {
    console.log("Error : ", error);
  }
});

router.post("/update/gate/:id", async (req, res) => {
  try {
    console.log("BODY", req.body);

    const updatedOBJ = {
      $set: { gate: req.body.gate },
    };
    console.log("Updated object :", updatedOBJ);

    const updatedData = await AddFlight.updateOne(
      { _id: req.params.id },
      updatedOBJ
    );
    console.log("UPDATAED DATA", updatedData);
    if (!updatedData) {
      res.send({ message: "Data not updated" });
    } else {
      res.send(updatedData);
    }
  } catch (error) {
    console.log("Error : ", error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const queryObject = url.parse(req.url, true).query;
    const id = await AddFlight.findByIdAndDelete(queryObject.id);
    console.log("Delete request");
    res.send(id);
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/getgates/:id", async (req, res) => {
  try {
    var bookingGate;
    const Gid = req.params.id;
    console.log("GID:", Gid);
    const flight = await AddFlight.findById(Gid);
    const gate = await AllGatesDetails.findOne({ gate_number: flight.gate });
    // console.log(flight);
    // console.log(JSON.stringify(gate));
    var rus = gate.booking.filter((b) => b.flight_id != Gid);
    gate.booking = rus;
    gate.save();
    // if (gate.length > 0) {
    //   gate.forEach(async (e) => {
    //     e.booking.forEach(async (book) => {
    //       if (book) {
    //         if (book.flight_id === Gid) {
    //           const bookID = book._id;
    //           console.log("desired booking :", bookID);
    //           const deletedGate = await AllGatesDetails.updateMany({}, {
    //             $pull: {
    //               booking:
    //               {
    //                 flight_id: Gid
    //               }
    //             }
    //           })
    //           // gate name - object
    //           // booking =
    //           // filter =
    //           // object.save()

    //           console.log("Update : ", deletedGate);
    //         }
    //       }
    //     });

    //   });
    //   return res.send({ message: "Booking retrived successfully" });
    // } else {
    //   return res.send({ message: "No gates found" });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
