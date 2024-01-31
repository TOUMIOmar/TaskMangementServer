const mongoose=require('mongoose')

const TaskSchema=mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    createAt:{type:Date,default:new Date()},
    isDone:{type:Boolean,default:false},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})

const TASK=mongoose.model('task',TaskSchema)
module.exports=TASK