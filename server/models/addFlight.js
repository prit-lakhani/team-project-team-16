const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: false },
  flight: { type: String, required: false },
  arriving_from: { type: String, required: false },
  flight_type: { type: String, required: false },
  time: { type: String, required: false },
  terminal: { type: String, required: false },
  gate: { type: String, required: false },
  bag_claim: { type: String, required: false },
});

const AddFlight = mongoose.model("addFlight", flightSchema);

module.exports = { AddFlight };
