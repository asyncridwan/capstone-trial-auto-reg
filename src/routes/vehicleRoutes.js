const express=require("express")
const router=express.Router()

const validate = require("../middlewares/validationMiddleware")
const authMiddleware=require("../middlewares/authMiddleware")
const vehicleController=require("../controllers/vehicleController")
const {createVehicleValidator} = require("../validators/vehicleValidators")
const validateObjectId = require("../middlewares/validateObjectId")

router.use(authMiddleware)
router.use(validateObjectId.validateObjectId)

router.get("/search", vehicleController.searchVehicles)

router.get("/:id" , vehicleController.getVehicle)

router.post("/",createVehicleValidator,validate,vehicleController.createVehicle)

router.get("/" , vehicleController.getMyVehicle)

router.put("/:id" ,vehicleController.updateVehicle)

router.delete("/:id" , vehicleController.deleteVehicle)

module.exports=router