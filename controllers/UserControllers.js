const USER=require('../models/UserSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const Registre=async(req,res)=>{
   
try {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({msg:errors.array()})
    }
    else{
        const {name,age,email,password}=req.body
        const existUser=await USER.findOne({email:email})
        if(existUser){
            res.status(400).json({msg:"User already exist! Pls login"})
        }
        else{
            const hashPW=await bcrypt.hash(password,10)
            const newUser=await USER.create({name,age,email,password:hashPW})
            const token=await jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
            res.status(201).json({msg:"Registre Done!",token})
    
        }
    }
 
   
} catch (error) {
    res.status(500).json({msg:"Something went wrong"})
}

}

const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser=await USER.findOne({email:email})
        if(!existUser){
            res.status(400).json({msg:"Make sure to register first!"})
        }
        else{
           const VerifyPW=await bcrypt.compare(password,existUser.password) 
           if(!VerifyPW){
            res.status(400).json({msg:"Wrong password! Pls try again!"})
           }
           else{
            const token=await jwt.sign({id:existUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
            res.status(200).json({msg:"Login done!",token})
           }
        }
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}

const UserData=async(req,res)=>{
    try {
        const user=await USER.findOne({_id:req.body.userId})
        if(!user){
            res.status(400).json({msg:"user not exist"})
        }
        else{
            res.status(200).json({msg:"Get user data!",user})
        }
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})

    }
}


module.exports={Registre,Login,UserData}