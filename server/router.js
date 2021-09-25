const router = require('express').Router();
const controllers = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

//register - post
router.post('/register', controllers.create);
//login - post - return saved restaurants
router.post('/login', controllers.login);
//save put / delete
router.post('/save', controllers.saveRestaurant);
//logout post
router.post('/logout', authMiddleware, controllers.logout);

module.exports = router;
