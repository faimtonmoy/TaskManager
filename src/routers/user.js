
const express= require('express')
const router= new express.Router()
const auth= require('../middleware/auth')
const User= require('../models/users')


router.post ('/users', async (req, res)=>{

    const user= new User(req.body)
    /*user.save().then(()=>{
           res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })*/
    try{
        await user.save()
        const token= await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token= await user.generateAuthToken()
        res.send({user, token})
        //res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/users/logout', auth, async(req,res)=>{
    try{
      req.user.tokens= req.user.tokens.filter((token)=>{
        return token.token !== req.token
      })
      await req.user.save()
      res.send()
    }catch(e){
       res.status(500).send(e)
    }
})
router.post('/users/logoutAll', auth, async(req, res)=>{
    try{
     req.user.tokens=[]
     await req.user.save()
     res.send()
    } catch(e){
        res.status(500).send(e)

    }
})
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async(req, res)=>{
    const updates= Object.keys(req.body)
    const allowUpdates= ['name', 'email', 'password', 'age']
    const validOperation= updates.every((update)=> allowUpdates.includes(update))
    if(!validOperation){
        return res.status(400).send({error:'Invalid Value'})
    }
    try{
        const user= await User.findById(req.params.id)
        updates.forEach((update)=> user[update]= req.body[update])

        await user.save()
        
        /*const update= await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})*/
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)

    }catch(e){
         res.status(400).send(e)
    }
    

})
router.delete('/users/:id', async (req, res)=>{
    try{
       const user= await User.findByIdAndDelete(req.params.id)
       if(!user)
       {
           res.status(400).send()
       }
       res.send(user)
    }catch(e){

        res.status(404).send(e)

    }

})

module.exports= router