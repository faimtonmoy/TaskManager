const express= require('express')
require ('./db/mongoose')
const User= require('./models/users')
const Task= require('./models/tasks')

const app= express()

const port= process.env.PORT || 3000

app.use(express.json())

app.post ('/users', async (req, res)=>{

    const user= new User(req.body)
    /*user.save().then(()=>{
           res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })*/
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/users', async (req,res)=>{
    try{
        const user= await User.find({})
        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
    /*User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{

        res.status(400).send(e)

    })*/
})
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try{

        const user= await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch(e){
        res.status(500).send(e)
    }
    /*User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })*/
})
app.patch('/users/:id', async(req, res)=>{
    const updates= Object.keys(req.body)
    const allowUpdates= ['name', 'email', 'password', 'age']
    const validOperation= updates.every((update)=> allowUpdates.includes(update))
    if(!validOperation){
        return res.status(400).send({error:'Invalid Value'})
    }
    try{
        
        const update= await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!update)
        {
            return res.status(404).send()
        }
        res.send(update)

    }catch(e){
         res.status(400).send(e)
    }
    

})
app.post ('/tasks', async (req, res)=>{

    const task= new Task(req.body)
    try{
       await task.save()
       res.status(201).send(task)
    } catch(e){
       res.status(400).send(e)
    }
    /*task.save().then(()=>{
           res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })*/
})
app.get('/tasks',async (req, res)=>{
    try{
      
       const task= await Task.find({})
       res.send(task)

    } catch(e){
       res.send(e)
    }
    /*Task.find({}).then((tasks)=>{
      res.send(tasks)
    }).catch((e)=>{
        res.status(404).send(e)
    })*/
})

app.get('/tasks/:id', async (req, res)=>{
    const _id= req.params.id
    try{
        const task= await Task.findById(_id)
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
    /*Task.findById(_id).then((task)=>{
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send(e)
    })*/
})
app.patch('/tasks/:id', async)

app.listen(port, ()=>{
    console.log("Server is running on port " + port)
})