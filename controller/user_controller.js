
const User = require('../models/user');

const { model } = require("mongoose");

module.exports.profile= function(req,res){
    return res.render('user', {
        title: "User"
    });

}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated())
        return res.redirect('/users/profile');
    return res.render('sign_up_form',{
        title:"sign-up-form"
    });
}
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated())
        return res.redirect('/users/profile');
    return res.render('sign_in_form',{
        title:"sign-in-form"
    });
}
// get user sign-up data 
module.exports.create= function(req,res){
 if(req.body.password!=req.body.confirm_password){
   return res.redirect('back');  
 }
 User.findOne({email:req.body.email},function(err,user){
     if(err)
     {
         console.log("error in finding the user while signing up");
         return ;
     }
     if(!user){
         User.create(req.body,function(err,user){
            if(err)
            {
                console.log("error in creating the user while sign-up",err);
                return ;
             }
             else
                 return res.redirect('/users/sign-in');
         })
     }
     else
         return res.redirect('/users/sign-in');
 })

}
// get user sign-in data 
module.exports.createSession= function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('/')
}