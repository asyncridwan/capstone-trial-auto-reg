const Renewal =
require("../models/Renewal")

const Vehicle =
require("../models/Vehicle")

exports.renewVehicle =
async (vehicleId, ownerId) => {

  const vehicle =
    await Vehicle.findById(vehicleId)

  if (!vehicle) {
    throw new Error(
      "Vehicle not found"
    )
  }

  // ownership check
  if (
    vehicle.owner.toString()
    !== ownerId
  ) {
    throw new Error(
      "Unauthorized"
    )
  }

  const oldExpiryDate =
    vehicle.certificate.expiresAt

  const newExpiryDate =
    new Date(oldExpiryDate)

  newExpiryDate.setFullYear(
    newExpiryDate.getFullYear() + 1
  )

  // update vehicle
  vehicle.certificate.expiresAt =
    newExpiryDate

  await vehicle.save()

  // create renewal record
  const renewal =
    await Renewal.create({

      vehicle: vehicleId,

      owner: ownerId,

      oldExpiryDate,

      newExpiryDate,

      paymentStatus: "paid"
    })

  return renewal
}