const Vehicle = require("../models/Vehicle");

exports.renewVehicle = async (vehicleId, userId) => {
  try {
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.owner.toString() !== userId) {
      throw new Error("You do not own this vehicle");
    }

    if (vehicle.status === "rejected") {
      throw new Error("Cannot renew a rejected vehicle");
    }

    if (vehicle.status !== "approved") {
      throw new Error("Only approved vehicles can be renewed");
    }

    if (vehicle.certificate.expiresAt && new Date() < vehicle.certificate.expiresAt) {
      throw new Error("Vehicle certificate has not expired yet");
    }

    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    vehicle.certificate.expiresAt = expiresAt;

    await vehicle.save();

    return vehicle;
  } catch (error) {
    throw error;
  }
};
