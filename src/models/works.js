const Work = mongoose.model('Work',{
    Description:{
        type: String,
        required: true,
        trim: true
    },
    Completed:{
        type: Boolean,
        default: false
    }
})

const work= new Work({
    Description: "Tutorial    ",
})

work.save().then((work)=>{
  
    console.log(work)

}).catch((error)=>{

  console.log("Error", error)

})