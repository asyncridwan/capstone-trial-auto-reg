const Vehicle = require("../models/Vehicle")

exports.createVehicle=async (data , userId) => {
    const vehicle = await Vehicle.create({
        ...data,
        owner:userId
    })
    return vehicle
}

exports.getMyVehicle=async (userId) => {
    return await Vehicle.find({owner : userId})
}

exports.getVehicle=async (id) => {
    return await Vehicle.findById(id)
}

exports.updateVehicle=async (id , date ) => {
    return await Vehicle.findByIdAndUpdate(id , date , {new:true})
}

exports.deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndDelete(id)
}

exports.getAllVehicles = async () => {
  return await Vehicle.find()
}

exports.searchVehicles = async (query) => {

  const filter = {}

  if (query.status) {
    filter.status = query.status
  }

  if (query.manufacturer) {
    filter.manufacturer = {
      $regex: query.manufacturer,
      $options: "i"
    }
  }

  if (query.plateNumber) {
    filter.plateNumber = {
      $regex: query.plateNumber,
      $options: "i"
    }
  }

  if (query.year) {
    filter.year = Number(query.year)
  }

  return await Vehicle.find(filter)
}

exports.getVehicles = async (query) => {

  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const skip = (page - 1) * limit

  const filter = {}

  if (query.status) {
    filter.status = query.status
  }

  if (query.manufacturer) {
    filter.manufacturer = {
      $regex: query.manufacturer,
      $options: "i"
    }
  }

  const vehicles = await Vehicle.find(filter)
    .skip(skip)
    .limit(limit)

  const total = await Vehicle.countDocuments(filter)

  return {
    data: vehicles,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  }
}

exports.getDashboardStats = async () => {

  const totalVehicles = await Vehicle.countDocuments()

  const approvedVehicles = await Vehicle.countDocuments({
    status: "approved"
  })

  const pendingVehicles = await Vehicle.countDocuments({
    status: "pending"
  })

  const rejectedVehicles = await Vehicle.countDocuments({
    status: "rejected"
  })

  return {
    totalVehicles,
    approvedVehicles,
    pendingVehicles,
    rejectedVehicles
  }
}

exports.startInspection = async (vehicleId, userId) => {

  const vehicle =
    await Vehicle.findById(vehicleId)

  if (!vehicle) {
    throw new Error("Vehicle not found")
  }

  vehicle.status = "in_inspection"

  vehicle.inspection = {
    status: "pending",
    inspectedBy: userId,
    inspectedAt: new Date()
  }

  return await vehicle.save()
}

exports.completeInspection = async (
  vehicleId,
  result,
  notes
) => {

  const vehicle =
    await Vehicle.findById(vehicleId)

  if (!vehicle) {
    throw new Error("Vehicle not found")
  }

  vehicle.inspection.status = result
  vehicle.inspection.notes = notes

  vehicle.status =
    result === "passed"? "approved": "rejected"

  return await vehicle.save()
}