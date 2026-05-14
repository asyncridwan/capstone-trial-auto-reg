const router =
require("express").Router()

const renewalController =
require("../controllers/renewalController")

const auth =
require("../middlewares/authMiddleware")

const validateObjectId =
require("../middlewares/validateObjectId")

router.use(validateObjectId.validateObjectId)

router.post(
  "/:vehicleId",
  auth,
  renewalController.renewVehicle
)

module.exports = router