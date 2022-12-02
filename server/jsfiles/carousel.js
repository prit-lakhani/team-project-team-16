const mongoose = require("mongoose");
const bookingSchema = require("./booking");
const allcarouselsSchema = new mongoose.Schema({
  carousel_number: { type: String, required: false },
  booking: [CarouselbookingSchema],
});

const AllcarouselsDetails = mongoose.model("AllcarouselsDetails", allcarouselsSchema);
module.exports = { AllcarouselsDetails };