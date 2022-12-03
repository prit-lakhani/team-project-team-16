const mongoose = require("mongoose");
const bookingSchema = require("./booking");
const allBaggagesSchema = new mongoose.Schema({
  carosuel_number: { type: String, required: false },
  booking: [bookingSchema],
});

const AllBaggageCaros = mongoose.model("AllBaggageCaros", allBaggagesSchema);
module.exports = { AllBaggageCaros };
