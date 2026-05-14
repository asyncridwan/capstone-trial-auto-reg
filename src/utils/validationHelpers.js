const Vehicle = require("../models/Vehicle");
const Transfer = require("../models/Transfer");

/**
 * Validates vehicle exists and returns it
 */
exports.validateVehicleExists = async (vehicleId) => {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return vehicle;
};

/**
 * Validates user owns the vehicle
 */
exports.validateVehicleOwnership = (vehicle, userId) => {
  if (vehicle.owner.toString() !== userId) {
    throw new Error("You do not own this vehicle");
  }
};

/**
 * Validates user owns the resource
 */
exports.validateResourceOwnership = (resourceOwnerId, userId, resourceName = "resource") => {
  if (resourceOwnerId.toString() !== userId) {
    throw new Error(`You do not own this ${resourceName}`);
  }
};

/**
 * Standard error response handler
 */
exports.handleControllerError = (res, error, defaultStatus = 500, prefix = "") => {
  const message = error.message || "An error occurred";
  let status = defaultStatus;

  // Map common error messages to status codes
  if (message.includes("not found")) status = 404;
  if (message.includes("already") || message.includes("duplicate")) status = 400;
  if (message.includes("not own")) status = 403;
  if (message.includes("not") && message.includes("required")) status = 400;

  res.status(status).json({ 
    message: prefix ? `${prefix}: ${message}` : message 
  });
};

/**
 * Validates transfer doesn't already exist (duplicate prevention)
 */
exports.validateNoPendingTransfer = async (vehicleId) => {
  const existingTransfer = await Transfer.findOne({
    vehicle: vehicleId,
    status: "pending"
  });

  if (existingTransfer) {
    throw new Error("A pending transfer already exists for this vehicle");
  }
};
