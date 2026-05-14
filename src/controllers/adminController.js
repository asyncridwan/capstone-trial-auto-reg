const vehicleServices=require("../services/vehicleService")
const auditServices=require("../services/auditServices")
const generatePlateNumber =require("../utility/generatePlateNumber")
const generateCertificateNumber =require("../utility/generateCertificateNumber")
const emailService =require("../services/emailService")
const User =require("../models/User")

exports.approveVehicle=async (req , res) => {
    try {
        const vehicle=await vehicleServices.getVehicle(req.params.id)
        if(!vehicle){
            return res.status(404).json({message:"Vehicle Not found"})
        }
        
        if (vehicle.status === "approved") {
            return res.status(400).json({message:"Vehicle is already approved"})
        }

        if (vehicle.status === "rejected") {
            return res.status(400).json({message:"Cannot approve a rejected vehicle"})
        }
        
        vehicle.status = "approved"
        vehicle.plateNumber = generatePlateNumber()
        
        const issuedAt = new Date()
        const expiresAt = new Date()
        expiresAt.setFullYear(expiresAt.getFullYear() + 1)
        
        vehicle.certificate = {
            certificateNumber: generateCertificateNumber(),
            issuedAt,
            expiresAt
        }
        
        await vehicle.save()
        const owner =
await User.findById(vehicle.owner)

        if (owner) {
            await emailService.sendEmail(
                owner.email,
                "Vehicle Approved",
                `Your vehicle has been approved. Plate Number: ${vehicle.plateNumber}`
            )
        }

        await auditServices.createLog({
            user:req.user.id,
            action:"APPROVED",
            vehicle:vehicle._id
        })
        
        res.json(vehicle)


    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.rejectVehicle=async (req , res ) => {
    try {
        const vehicle=await vehicleServices.getVehicle(req.params.id)
        if(!vehicle){
            return res.status(404).json({message:"vehicle Not found"})
        }
        vehicle.status="rejected"
        await vehicle.save()

        const owner = await User.findById(vehicle.owner)
        if (owner) {
            await emailService.sendEmail(
                owner.email,
                "Vehicle Registration Rejected",
                `Your vehicle registration has been rejected. Please contact support for more information.`
            )
        }

        await auditServices.createLog({
            user:req.user.id,
            action:"REJECTED",
            vehicle:vehicle._id
        })
        
        res.json(vehicle)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getStats = async (req, res) => {
  try {

    const stats =
      await vehicleServices.getDashboardStats()

    res.json(stats)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}