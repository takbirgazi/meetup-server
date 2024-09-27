const { setToken, clearToken } = require('../services/tokenService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('MeetUp microservice');
})

router.post('/jwt', setToken);
router.post('/logout', clearToken);

module.exports = router;