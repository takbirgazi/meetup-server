const express = require('express');
require('dotenv').config()
const cors = require('cors');
const home = require('./routers/home');
const userRoute = require('./routers/user');


const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);



app.get('/', home);
app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});