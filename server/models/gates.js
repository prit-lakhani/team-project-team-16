const mongoose = require("mongoose");

const allGatesSchema = new mongoose.Schema({
  gate_number: { type: String, required: false },
  gate_status: { type: String, required: false },
  terminal: { type: String, required: false },
  airline: { type: String, required: false },
  flight_type: { type: String, required: false },
  time_from: { type: String, required: false },
  time_to: { type: String, required: false },
});

const AllGatesDetails = mongoose.model("AllGatesDetails", allGatesSchema);
module.exports = { AllGatesDetails };
