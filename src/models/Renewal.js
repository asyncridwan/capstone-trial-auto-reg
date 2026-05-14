const mongoose = require("mongoose")

const renewalSchema = new mongoose.Schema({

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  oldExpiryDate: Date,

  newExpiryDate: Date,

  paymentStatus: {
    type: String,
    enum: [
      "pending",
      "paid"
    ],
    default: "pending"
  }

}, { timestamps: true })

module.exports =
mongoose.model("Renewal", renewalSchema)