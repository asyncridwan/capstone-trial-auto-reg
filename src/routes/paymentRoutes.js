const router =
require("express").Router()

const paymentController =require("../controllers/paymentController")

const auth =require("../middlewares/authMiddleware")

const role =require("../middlewares/roleMiddleware")

const validateObjectId =
require("../middlewares/validateObjectId")

router.use(validateObjectId.validateObjectId)

router.post("/initialize",auth,paymentController.initializePayment)

router.patch("/verify/:paymentId",auth,role("admin", "staff"),paymentController.verifyPayment)

module.exports = router