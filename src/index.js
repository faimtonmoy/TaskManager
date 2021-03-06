const express= require('express')
require ('./db/mongoose')
const User= require('./models/users')
const Task= require('./models/tasks')
const userRouter= require('./routers/user')
const taskRouter= require('./routers/task')

const app= express()

const port= process.env.PORT || 3000

/*app.use((req,res,next)=>{
    res.status(503).send("Site is currently down, check back soon!")
})*/

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log("Server is running on port " + port)
})