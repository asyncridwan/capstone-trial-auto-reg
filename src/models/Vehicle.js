const mongoose=require("mongoose")
const vehicleSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    plateNumber:{
        type:String,
        unique:true,
        sparse:true        
    },

    carModel:{
        type:String,
        required:true
    },

    manufacturer:{
        type:String,
        required:true
    },

    year:{
        type:Number,
        required:true,
        min:1886,
        max: new Date().getFullYear()
    },
   status: {
  type: String,
  enum: [
    "pending",
    "under_review",
    "in_inspection",
    "approved",
    "rejected"
  ],
  default: "pending"
},
    inspection: {
  status: {
    type: String,
    enum: ["pending", "passed", "failed"],
    default: "pending"
  },

  notes: String,

  inspectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  inspectedAt: Date
},
    certificate: {
  certificateNumber: {
    type: String,
    unique: true,
    sparse: true
  },

  issuedAt: Date,

  expiresAt: Date
},
    
},
    {timestamps:true}
)

module.exports=mongoose.model("Vehicle" , vehicleSchema)