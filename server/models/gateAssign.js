const mongoose = require("mongoose");

const gateSchema = new mongoose.Schema({
  gate_number: { type: String, required: false },
  terminal: { type: String, required: false },
  flight_type: { type: String, required: false },
  time_from: { type: Date, required: false },
  time_to: { type: Date, required: false },
  airline: { type: String, required: false },
  flight_id: { type: String, required: false },
});

const Gate = mongoose.model("gateAssign", gateSchema);

module.exports = { Gate };
