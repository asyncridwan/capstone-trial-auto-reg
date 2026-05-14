const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.register =async(req , res) =>{
    try{
        const{username , email , password}=req.body
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }

        const hashedPassword=await bcrypt.hash(password , 10)

        const user=await User.create({
            username,
            email,
            password:hashedPassword,
            role:"user"
        })
        res.status(201).json({message:"User registered successfully"})
        }catch(error){
            res.status(500).json({message:error.message})
        }
}


exports.login=async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user=await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid user" })
    }

    if (!user.password) {
      return res.status(500).json({ message: "User password missing in DB" })
    }

    const isMatch=await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    console.log(`Token generated: ${token}`)

    res.json({ message: "Login successful", token })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

