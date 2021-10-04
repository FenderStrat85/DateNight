const router = require('express').Router();
const controllers = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

//register - post
router.post('/register', controllers.create);
//login - post - return saved restaurants
router.post('/login', controllers.login);
//save
router.post('/save', authMiddleware, controllers.saveRestaurant);
//delete
//id in this case being the photo code that we have created as the id for the linked db
router.delete('/delete/:id', authMiddleware, controllers.deleteRestaurant);
//logout post
router.post('/logout', authMiddleware, controllers.logout);

module.exports = router;
