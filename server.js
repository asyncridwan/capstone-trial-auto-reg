require("dotenv").config()
const express=require("express")
const connectDB=require("./src/config/db")

const authRoutes=require("./src/routes/authRoutes")
const vehicleRoutes=require("./src/routes/vehicleRoutes")
const adminRoutes=require("./src/routes/adminRoutes")
const auditRoutes=require("./src/routes/auditRoutes")
const staffRoutes=require("./src/routes/staffRoutes")
const inspectionRoutes=require("./src/routes/inspectionRoutes")
const transferRoutes =require("./src/routes/transferRoutes")
const paymentRoutes =require("./src/routes/paymentRoutes")
const renewalRoutes =require("./src/routes/renewalRoutes")

const app=express()
connectDB()

app.use(express.json())
app.use("/staff", staffRoutes)
app.use("/admin" , adminRoutes)
app.use("/auth" , authRoutes)
app.use("/vehicle" , vehicleRoutes)
app.use("/audit" , auditRoutes)
app.use("/inspection" , inspectionRoutes)
app.use("/renewals", renewalRoutes)
app.use("/transfers", transferRoutes)
app.use("/payments", paymentRoutes)

app.use((err , req , res , next )=>{
    const status = err.message.includes('duplicate') ? 400 : err.statusCode || 500
    res.status(status).json({
        success:false,
        message:err.message
    })
})

const PORT=process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
})