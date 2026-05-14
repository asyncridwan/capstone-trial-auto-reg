const vehicleService =require("../services/vehicleService")
const auditService=require("../services/auditServices")
const generatePlateNumber =require("../utility/generatePlateNumber")
const generateCertificateNumber=require("../utility/generateCertificateNumber")

exports.createVehicle=async (req , res) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body , req.user.id)
        await auditService.createLog({
            user: req.user.id,
            action: "CREATE",
            vehicle: vehicle._id
        })
        vehicle.plateNumber = generatePlateNumber()
        vehicle.certificate= generateCertificateNumber()
        await vehicle.save()

        res.status(201).json(vehicle)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getMyVehicle =async (req , res) => {
    try {
        const vehicle= await vehicleService.getMyVehicle(req.user.id)
        res.json(vehicle)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
} 

exports.getVehicle= async (req , res) => {
    try {
        const vehicle=await vehicleService.getVehicle(req.params.id)
        if(!vehicle){
            return res.status(404).json({message:" vehicle Not found"})
        }
        if(vehicle.owner.toString() !== req.user.id){
            return res.status(403).json({message:"Not allowed"})
        }

        res.json(vehicle)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

exports.getVehicles = async (req, res) => {
  try {

    const result =
      await vehicleService.getVehicles(req.query)

    res.json(result)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


exports.updateVehicle=async (req , res) => {
    try {
        const vehicle = await vehicleService.getVehicle(req.params.id)
        if(!vehicle){
            return res.status(404).json({message:"Not Found"})
        }
          if(vehicle.owner.toString() !== req.user.id){
            return res.status(403).json({message:"Not allowed"})
        }

        const updated=await vehicleService.updateVehicle(req.params.id , req.body)

        await auditService.createLog({
            user:req.user.id,
            action:"UPDATE",
            vehicle:updated._id
        })
        res.json(updated)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


exports.deleteVehicle=async (req , res) => {
    try {
        const vehicle = await vehicleService.getVehicle(req.params.id)

        if(!vehicle){
            return res.status(404).json({message:"Not found"})
        }
        if(vehicle.owner.toString() !== req.user.id){
            return res.status(403).json({message:"Not allowed"})
        }

        const deleted = await vehicleService.deleteVehicle(req.params.id)

        await auditService.createLog({
            user: req.user.id,
            action: "DELETE",
            vehicle: deleted._id
        })
        res.json({message: "Deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles()
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.reviewVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicle(req.params.id)

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      })
    }

    vehicle.status = "under_review"

    await vehicle.save()

    await auditService.createLog({
      user: req.user.id,
      action: "UPDATE",
      vehicle: vehicle._id
    })

    res.json(vehicle)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.searchVehicles = async (req, res) => {
  try {

    const vehicles =
      await vehicleService.searchVehicles(req.query)

    res.json(vehicles)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.startInspection = async (req, res) => {
  try {

    const vehicle =
      await vehicleService.startInspection(
        req.params.id,
        req.user.id
      )

    res.json(vehicle)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.completeInspection = async (req, res) => {
  try {

    const { status, notes } = req.body

    const vehicle =
      await vehicleService.completeInspection(
        req.params.id,
        status,
        notes
      )

    res.json(vehicle)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
