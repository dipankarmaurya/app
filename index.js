const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const app =express();
const port =5555;
const db = require('./config/mongoose');
const  User = require('./models/user');

const expressLayouts = require('express-ejs-layouts');

app.use(cookieParser());
app.use(express.urlencoded());

app.use(express.static('./assets'));
// app.use(urlencoded);
// we have to use layouts section before the router section
 app.use(expressLayouts);

//extracts styles and javascript from sub pages and  render it to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


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
