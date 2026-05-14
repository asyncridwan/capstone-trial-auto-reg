const renewalService =
require("../services/renewalService")

exports.renewVehicle =
async (req, res) => {

  try {

    const renewal =
      await renewalService.renewVehicle(

        req.params.vehicleId,

        req.user.id
      )

    res.json(renewal)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}