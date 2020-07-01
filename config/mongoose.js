//require mongoose library
const mongoose=require('mongoose');

//connect db
mongoose.connect('mongodb+srv://skb:f7zlMvEAi91vZ5fY@todoapp.efdc9.mongodb.net/todoappDB?retryWrites=true&w=majority');

//ACQUIRE connection if successful
const db=mongoose.connection;

//if error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running
db.once('open',function()
{
    console.log('successful connection to db');
})
