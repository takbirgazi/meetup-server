const router = require('express').Router();

const home = router.get('/', (req, res) => {
    res.send('MeetUp microservice');
})

module.exports = home;