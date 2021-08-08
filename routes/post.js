const  express = require('express');
const router = express.Router();
const postController = require('../controller/post_controller');
const passport = require('passport');
router.post('/create',passport.checkAuthentication, postController.create);
router.get('/delete/:id', passport.checkAuthentication, postController.destroyPost);
module.exports = router;