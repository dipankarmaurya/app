const express = require('express');
const port =5555;

const app =express();


app.listen(port,(err)=>{
    if(err){
        console.log(`error in running server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});