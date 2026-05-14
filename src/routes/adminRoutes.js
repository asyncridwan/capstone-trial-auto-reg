const express=require("express")
const router=express.Router()

const authMiddleware=require("../middlewares/authMiddleware")
const authorizeRoles=require("../middlewares/roleMiddleware")
const validateObjectId=require("../middlewares/validateObjectId")

const adminController = require("../controllers/adminController")

router.patch("/approve/:id" , authMiddleware , validateObjectId.validateObjectId, authorizeRoles("admin", "staff") , adminController.approveVehicle)

router.patch("/reject/:id" , authMiddleware , validateObjectId.validateObjectId, authorizeRoles("admin") , adminController.rejectVehicle)

router.get("/stats",authMiddleware,authorizeRoles("admin"),adminController.getStats)

module.exports=router