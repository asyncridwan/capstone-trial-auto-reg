const router =
require("express").Router()

const transferController =
require("../controllers/transferController")

const auth =
require("../middlewares/authMiddleware")

const role =
require("../middlewares/roleMiddleware")

const validateObjectId =
require("../middlewares/validateObjectId")

router.use(validateObjectId.validateObjectId)

router.post(
  "/request/:vehicleId",
  auth,
  transferController.requestTransfer
)

router.patch("/approve/:transferId", auth, role("admin", "staff"), transferController.approveTransfer)

module.exports = router