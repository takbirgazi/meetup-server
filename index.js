const express = require('express');
require('dotenv').config()
const cors = require('cors');
const home = require('./routers/home');
const userRoute = require('./routers/user');
const cookieParser = require('cookie-parser');
const meetingRoute = require('./routers/meeting');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://tech-thunders-meet.web.app'
    ],
    credentials: true,
}));



// Routes
app.use('/', home);
app.use('/', userRoute);
app.use('/', meetingRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});