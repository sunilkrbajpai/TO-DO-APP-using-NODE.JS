const express=require('express');   // include express
const path=require('path');     // include path
const port=8000;            //store port in variable
const db=require('./config/mongoose');    //include mongoose
const Tasks=require('./models/tasks');     //include tasks

const app=express();        // Set up Express Server

app.set('view engine','ejs');     //Setup view Engine
app.set('views',path.join(__dirname,'views'));    //Include views
app.use(express.urlencoded());        //convert response of form submit to JSON
app.use(express.static('assets'));   //include assets folder

app.get('/',function(req,res)        //set url of localhost:8000 to this response 'home.ejs'
{
    var n=0;  //variable to store incompleted tasks
    Tasks.find({},function(err,tasks)  
    {
        if(err)         //if error
        {
            console.log('Error in fetching data');    
            return;
        }
        tasks.forEach(function (item) {  //if task is incomplete then increase n value
            if(item.completed==false)
                n++;   //increase n
          });

        return res.render('home',{   // render home.ejs and also send some data in response
        title:'TO-DO LIST',
        tasks_list:tasks,
        count:n
    });
  });
});

app.post('/create_newtask',function(req,res){    // URL for creating new task
    console.log(req.body);
    Tasks.create({
        work:req.body.work,            //create new task with data work,completed, important-status,date, category
        completed:false ,               /// for marking the work is completed or not
        impStatus:false,
        date:req.body.date,
        category:req.body.category
    },function(err,newtask){
        if(err)             //if error
        {
            console.log('Error in creating a new task');
            return;
        }
        console.log('********',newtask);
        return res.redirect('back');  //redirect to same page
    });
});

app.get('/delete-task',function(req,res)   /// url for delete task
{
    let id=req.query.id;   // get id from req which task want to delete
    Tasks.findByIdAndDelete(id,function(err)    //find that task by ID and delete
    {
        if(err)   //if error
        {
            console.log('Error in deleting the task');
            return;
        }
        return res.redirect('back');   //redirect back
    });
});

app.get('/update-imp',function(req,res)    //url for updating IMPORTANT status
{
    
    let id=req.query.id;                //get id from req
    console.log(req.query.id);
    Tasks.findById({_id:id},function(err,task)           // find task by ID
    {
        if(err)    //error
        {
            console.log('Error in fetching data');
            return;
        }

        if(task.impStatus==false)               //if task is IMPORTANT update it to UNIMPORTANT
        {
            let updatedStatus = {}
            updatedStatus.work = task.work;
            updatedStatus.completed = task.completed;
            updatedStatus.impStatus=true;

            Tasks.findByIdAndUpdate(id, updatedStatus, function(err, updatedData){          //update it using ID
             if(err){ console.log(err)}
             else { console.log(updatedData)
                      //res.redirect or res.send whatever you want to do
                    }
      })
        }
        if(task.impStatus==true)            //if task is UNIMPORTANT mark it to IMPORTANt
        {
            let updatedStatus = {}
            updatedStatus.work = task.work;
            updatedStatus.completed=task.completed;
            updatedStatus.impStatus = false

            Tasks.findByIdAndUpdate(id, updatedStatus, function(err, updatedData){   //update task using ID
             if(err){ console.log(err)}
             else { console.log(updatedData)
                      //res.redirect or res.send whatever you want to do
        }
      })

        }
        return res.redirect('back');        //redirect back
    });  
});

app.get('/update-status',function(req,res)          // update completed status
{
    let id=req.query.id;
    console.log(req.query.id);
    Tasks.findById({_id:id},function(err,task)          // find task by ID
    {
        if(err)
        {
            console.log('Error in fetching data');
            return;
        }

        if(task.completed==false)   // if it is incomplete mark it to COMPLETE
        {
            let updatedStatus = {}
            updatedStatus.work = task.work;
            updatedStatus.completed = true

            Tasks.findByIdAndUpdate(id, updatedStatus, function(err, updatedData){  //update record
             if(err){ console.log(err)}
             else { console.log(updatedData)
                      //res.redirect or res.send whatever you want to do
                    }
      })
        }
        if(task.completed==true)            //if it is completed mark it as INCOMPLETE
        {
            let updatedStatus = {}
            updatedStatus.work = task.work;
            updatedStatus.completed = false

            Tasks.findByIdAndUpdate(id, updatedStatus, function(err, updatedData){
             if(err){ console.log(err)}
             else { console.log(updatedData)
                      //res.redirect or res.send whatever you want to do
        }
      })

        }
        return res.redirect('back'); //redirect back
    });  
});
app.listen(port,function(err){        //run server
    if(err)
        console.log('Error in running the server',err);
    console.log('Yup! server is running at port:',port);
});
