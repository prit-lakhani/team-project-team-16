const mongoose = require("mongoose");

const gateSchema = new mongoose.Schema({
  gate_number: { type: String, required: false },
  terminal: { type: String, required: false },
  status: { type: String, required: false },
  flight_type: { type: String, required: false },
  from: { type: String, required: false },
  to: { type: String, required: false },
  flight: { type: String, required: false },
});

const Gate = mongoose.model("gateAssign", gateSchema);

module.exports = { Gate };
