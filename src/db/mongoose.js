const mongoose= require('mongoose')

const { string } = require('yargs')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})



/*const me= new User({
    name: "Faim      ",
    email: "bhuiyanfaim@gmail.com     ",
    age: 24,
    password:"1234567"
})

me.save().then((me)=>{
  
    console.log(me)

}).catch((error)=>{

  console.log("Error", error)

})*/

