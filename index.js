const express = require('express');
require('dotenv').config()
const cors = require('cors');
const home = require('./routers/home');
const userRoute = require('./routers/user');
const meetingRoute = require('./routers/meeting');


const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);


// Routes
app.get('/', home);
app.use('/', userRoute);
app.use('/',meetingRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});