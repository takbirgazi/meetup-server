const userController = require('../controllers/userController');

const router = require('express').Router();

router.get('/users', userController.get);
router.post('/addUser', userController.post);
router.put('/updateUser', userController.put);
router.delete('/deleteUser', userController.delete);

module.exports = router;