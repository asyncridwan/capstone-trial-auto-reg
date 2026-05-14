const mongoose=require("mongoose")

const userSchema= new mongoose.Schema(
    {
    username:{
        type:String,
        required:true,
        minilength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["user" , "staff" , "admin" ],
        default:"user"
    }
    },
    {timestamps: true}
)

module.exports= mongoose.model("User" , userSchema)