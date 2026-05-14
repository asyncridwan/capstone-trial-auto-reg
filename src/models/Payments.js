const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },

  amount: {
    type: Number,
    required: true
  },

  purpose: {
    type: String,
    enum: [
      "registration",
      "transfer",
      "renewal"
    ],
    required: true
  },

  transactionRef: {
    type: String,
    unique: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "paid",
      "failed"
    ],
    default: "pending"
  }

}, { timestamps: true })

module.exports =
mongoose.model("Payment", paymentSchema)

