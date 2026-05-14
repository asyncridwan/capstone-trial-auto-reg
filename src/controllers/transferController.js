const transferService =
require("../services/transferService")
const emailService = require("../services/emailService")
const User = require("../models/User")

exports.requestTransfer =
async (req, res) => {
try {
    const {toOwner,reason} = req.body

    const transfer =
      await transferService.requestTransfer(
        req.params.vehicleId,
        req.user.id,
        toOwner,
        reason
      )

    // Send email notification to recipient
    const toUser = await User.findById(toOwner)
    if (toUser) {
      await emailService.sendEmail(
        toUser.email,
        "Vehicle Transfer Request",
        `You have received a vehicle transfer request. Please review and approve if you accept this transfer. Reason: ${reason}`
      )
    }

    res.status(201).json(transfer)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.approveTransfer =
async (req, res) => {
  try {
    const transfer =
      await transferService.approveTransfer(
        req.params.transferId
      )

    // Send email notifications
    const fromOwner = await User.findById(transfer.fromOwner)
    const toOwner = await User.findById(transfer.toOwner)

    if (fromOwner) {
      await emailService.sendEmail(
        fromOwner.email,
        "Vehicle Transfer Approved",
        `Your vehicle transfer request has been approved. The vehicle is now owned by ${toOwner ? toOwner.email : 'the new owner'}.`
      )
    }

    if (toOwner) {
      await emailService.sendEmail(
        toOwner.email,
        "Vehicle Transfer Completed",
        `A vehicle has been successfully transferred to you. Please check your vehicle dashboard for details.`
      )
    }

    res.json(transfer)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}