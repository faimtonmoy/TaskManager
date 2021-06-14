
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

router.patch('/users/me', auth, async(req, res)=>{
    const updates= Object.keys(req.body)
    const allowUpdates= ['name', 'email', 'password', 'age']
    const validOperation= updates.every((update)=> allowUpdates.includes(update))
    if(!validOperation){
        return res.status(400).send({error:'Invalid Value'})
    }
    try{
        
        updates.forEach((update)=> req.user[update]= req.body[update])

        await req.user.save()
        
        /*const update= await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})*/
       
        res.send(req.user)

    }catch(e){
         res.status(400).send(e)
    }
    

})
router.delete('/users/me', auth, async (req, res)=>{
    try{
       //const user= await User.findByIdAndDelete(req.user._id)
       //if(!user)
       //{
         //  res.status(400).send()
       //}
       await req.user.remove()
       res.send(req.user)
    }catch(e){

        res.status(404).send(e)

    }

})

module.exports= router