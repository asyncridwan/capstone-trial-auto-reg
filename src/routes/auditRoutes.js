const express=require("express")
const router=express.Router()

const authMiddleware=require("../middlewares/authMiddleware")
const authorizeRoles=require("../middlewares/roleMiddleware")
const auditLog=require("../models/AuditLog")

router.get("/" , authMiddleware , authorizeRoles("admin") ,
async (req , res ) => {
    try {
        const logs=await auditLog.find()
        .populate("user" , "email" )
        .populate("vehicle" , "plateNumber")

        res.json(logs)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports=router