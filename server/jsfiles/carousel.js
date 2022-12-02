const mongoose = require("mongoose");
const bookingSchema = require("./booking");
const allcarouselsSchema = new mongoose.Schema({
  carousel_number: { type: String, required: false },
  booking: [bookingSchema],
});

const AllcarouselsDetails = mongoose.model("AllcarouselsDetails", allcarouselsSchema);
module.exports = { AllcarouselsDetails };