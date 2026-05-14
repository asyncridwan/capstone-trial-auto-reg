const express=require("express")
const router=express.Router()

const{register , login }=require("../controllers/authControllers")

const validate = require("../middlewares/validationMiddleware")

const {
  registerValidator,
  loginValidator
} = require("../validators/authValidator")

router.post("/register" , registerValidator, validate, register)
router.post("/login" , loginValidator, validate,     login)

module.exports=router