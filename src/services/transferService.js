const Transfer = require("../models/Transfer");
const Vehicle = require("../models/Vehicle");

exports.requestTransfer = async (vehicleId, fromOwnerId, toOwnerId, reason) => {
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.owner.toString() !== fromOwnerId) {
      throw new Error("Only the vehicle owner can request a transfer");
    }

    if (vehicle.status === "pending" || vehicle.status === "under_review" || vehicle.status === "in_inspection") {
      throw new Error("Cannot transfer a vehicle that is not approved");
    }

    if (vehicle.status === "rejected") {
      throw new Error("Cannot transfer a rejected vehicle");
    }

    // Check for existing pending transfer
    const existingTransfer = await Transfer.findOne({
      vehicle: vehicleId,
      status: "pending"
    });

    if (existingTransfer) {
      throw new Error("A pending transfer already exists for this vehicle");
    }

    if (fromOwnerId === toOwnerId) {
      throw new Error("Cannot transfer vehicle to yourself");
    }

    const transfer = new Transfer({vehicle: vehicleId,fromOwner: fromOwnerId,toOwner: toOwnerId,reason: reason});

    await transfer.save();
    return transfer;
  } catch (error) {
    throw error;
  }
};

exports.approveTransfer = async (transferId) => {
  try {
    const transfer = await Transfer.findById(transferId);
    if (!transfer) {throw new Error("Transfer not found");}

    if (transfer.status !== "pending") {throw new Error("Transfer is not pending");}

    transfer.status = "approved";
    await transfer.save();
    const vehicle = await Vehicle.findById(transfer.vehicle);
    vehicle.owner = transfer.toOwner;
    await vehicle.save();

    return transfer;
  } catch (error) {
    throw error;
  }
};
