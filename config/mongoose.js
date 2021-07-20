const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/codeil_developement');
const db =mongoose.connection;
db.on('err',console.error.bind(console,'error occured in connectin database'));


db.once('open',function(){
    console.log("Connected to database");
});

module.exports=db;
