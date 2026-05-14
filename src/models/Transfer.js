const mongoose = require("mongoose")

const transferSchema = new mongoose.Schema({

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },

  fromOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  toOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected"
    ],
    default: "pending"
  },

  reason: String

}, { timestamps: true })

module.exports =
mongoose.model("Transfer", transferSchema)