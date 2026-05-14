const mongoose = require("mongoose")
const auditLogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    action:{
        type:String,
        enum:["CREATE" , "UPDATE" , "DELETE" , "APPROVED" , "REJECTED" , "START_INSPECTION" , "COMPLETE_INSPECTION"],
        required:true
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    }
},
{timestamps:true})

module.exports=mongoose.model("AuditLog" , auditLogSchema)