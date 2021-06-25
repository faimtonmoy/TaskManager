const express= require('express')
const router= new express.Router()
const auth= require('../middleware/auth')
const Task= require('../models/tasks')

router.post ('/tasks', auth, async (req, res)=>{

    //const task= new Task(req.body)
    const task= new Task({
        ...req.body,
        Owner: req.user._id
    })
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
router.get('/tasks',auth,async (req, res)=>{
    try{
      
       const task= await Task.find({Owner: req.user._id})
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

router.get('/tasks/:id', auth, async (req, res) => {
    const _id= req.params.id
    try{
        //const task= await Task.findById(_id)
        const task = await Task.findOne({ _id, Owner: req.user._id })
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
router.patch('/tasks/:id', auth, async(req, res)=>{
    const updates= Object.keys(req.body)
    const allowUpdates= ['Description', 'Completed']
    const validOperation= updates.every((update)=> allowUpdates.includes(update))
    if(!validOperation){
        return res.status(400).send({error:'Invalid Value'})
    }
    try{
        //const task= await Task.findById(req.params.id)
        const task= await Task.findOne({_id: req.params.id, Owner: req.user._id})
        
        //const update= await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task)
        {
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]= req.body[update])
        await task.save()
        res.send(task)

    }catch(e){
         res.status(400).send(e)
    }
    

})
router.delete('/tasks/:id', auth, async (req, res)=>{
    try{
       const task= await Task.findOneAndDelete({_id: req.params.id, Owner: req.user._id})
       if(!task)
       {
           res.status(400).send()
       }
       res.send(task)
    }catch(e){

        res.status(404).send(e)

    }

})

module.exports= router