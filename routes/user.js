const express =require ('express');
const router= express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');


router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.updateUser);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-up'}
), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports=router;