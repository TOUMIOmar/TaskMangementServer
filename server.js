const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB=require('./config/ConnectDB')
dotenv.config({path:"./config/.env"})
const port=process.env.PORT || 5000
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/v1',require('./routes/UserRoutes'))
app.use('/api/v1',require('./routes/TaskRoutes'))
app.listen(port,(err)=>{
err? console.log(err):console.log("Server is running in port :",port)
})