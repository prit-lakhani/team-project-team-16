const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  time_from: { type: String, required: false },
  time_to: { type: String, required: false },
  flight_id: { type: String, required: false },
  gate_status: { type: String, required: false },
});

module.exports = bookingSchema;
