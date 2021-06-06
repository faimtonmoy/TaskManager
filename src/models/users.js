const mongoose= require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
        
    },
    age:{
        type: Number
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                 throw new Error("Password can not include the word 'passoword'")
            }
        }
    }

})
userSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 8)
    }


    next()

})

const User= mongoose.model('User', userSchema)
module.exports= User