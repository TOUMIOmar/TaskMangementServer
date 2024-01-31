const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:String,
    age:Number,
    email:{type:String,require:true},
    password:{type:String,require:true},
    

})

const USER= mongoose.model("user",UserSchema)
module.exports=USER