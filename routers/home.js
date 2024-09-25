const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('MeetUp microservice');
})

module.exports = router;