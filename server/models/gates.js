const mongoose = require("mongoose");
const bookingSchema = require("./booking");
const allGatesSchema = new mongoose.Schema({
  gate_number: { type: String, required: false },
  booking: [bookingSchema],
});

const AllGatesDetails = mongoose.model("AllGatesDetails", allGatesSchema);
module.exports = { AllGatesDetails };
