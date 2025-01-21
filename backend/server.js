require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
// const HOST='192.168.0.107'
const connectDB=require('./src/Config/db')
const userRoutes=require('./src/Routes/userRoutes');
const taskRoutes=require('./src/Routes/taskRoutes')

app.use(cors());
app.use(express.json());
connectDB()

app.use('/user',userRoutes)
app.use('/task',taskRoutes)

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.listen(PORT, HOST, () => {
//     console.log(`Server running on http://${HOST}:${PORT}`);
//   })

  app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);

})