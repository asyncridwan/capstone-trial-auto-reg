const express=require("express")
const router=express.Router()

const authMiddleware=require("../middlewares/authMiddleware")
const authorizeRoles=require("../middlewares/roleMiddleware")

const vehicleController=require("../controllers/vehicleController")

router.use(authMiddleware)
router.use(authorizeRoles("staff" , "admin"))

router.get("/vehicles" , vehicleController.getAllVehicles)

router.patch("/review/:id" , vehicleController.reviewVehicle)

module.exports=router