const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    dateTime:{type:Date,required:true},
    deadLine:{type:Date,required:true},
    priority:{type:String,enum:['High','Medium','Low'],default:'Medium'},
    status:{type:String,enum:['Pending','In Progress','Completed'],default:'Pending'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})

module.exports=mongoose.model('Task',taskSchema);