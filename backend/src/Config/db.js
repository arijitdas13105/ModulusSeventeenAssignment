const mongoose=require('mongoose')

const connectDB=async()=>{
try {
    const connect=await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`MongoDB Connected: on host=>${connect.connection.host}`)
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

module.exports=connectDB