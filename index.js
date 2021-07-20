const express = require('express');
const app =express();
const port =5555;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

// we have to use layouts section before the router section
 app.use(expressLayouts);
//setting up ejs engine to use html file
 app.set('view engine','ejs');
 app.set('views','./views');

 // use express route
 app.use('/',require('./routes/home'));


 
app.listen(port,(err)=>{
    if(err){
        console.log(`error in running server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});
