const router = require("express").Router()

const inspectionController =
  require("../controllers/inspectionController")

const auth =
  require("../middlewares/authMiddleware")

const role =
  require("../middlewares/roleMiddleware")

const validateObjectId =
  require("../middlewares/validateObjectId")

router.use(validateObjectId.validateObjectId)

router.patch("/start/:id",auth,role("staff", "admin"),inspectionController.startInspection)

router.patch("/complete/:id",auth,role("staff", "admin"),inspectionController.completeInspection)

module.exports = router