require('../src/db/mongoose')

const { count } = require('../src/models/tasks')
const Task= require('../src/models/tasks')

/*Task.findByIdAndDelete('606bf6ad62485721f4a921bd').then(()=>{
     
    return Task.countDocuments({completed: false})
}).then((result)=>{
   console.log(result)
}).catch((e)=>{
    console.log(e)
})*/
const deleteTaskandCount= async(id)=>{
    const task= await Task.findByIdAndDelete(id)
    const count= await Task.countDocuments({Completed: false})
    return count

}
deleteTaskandCount('60ad073cf66af6105c999c2a').then((count)=>{
    console.log(count)
}).catch((e)=>{
     console.log(e)
})