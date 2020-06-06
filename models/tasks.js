const mongoose=require('mongoose');       // require MONGOOSE

const tasksSchema=new mongoose.Schema({  //Create schema to add tasks
    work:{
        type:String,                              //work
        required:true
    },
    completed:{
        type:Boolean,                             //completed or NOT
        required:true
    },
    impStatus:
    {
        type:Boolean,                              //Important or NOT
        required:true
    },
    date:{
        type:Date,                                  //Store DATE
        required:true
    },
    category:{                                      //store category
        type:String,
        required:true
    }
});
const Tasks=mongoose.model('Tasks',tasksSchema);
module.exports=Tasks;                           // export it with name--->> Tasks