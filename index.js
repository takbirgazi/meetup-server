const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const home = require("./routers/home");
const userRoute = require("./routers/user");
const meetingRoute = require("./routers/meeting");
const chatRoute = require("./routers/chat");
const todoRoute = require("./routers/todo");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://meetup-9da89.web.app"],
    credentials: true,
  })
);

// Routes
app.use("/", home);
app.use("/", userRoute);
app.use("/", meetingRoute);
app.use("/", chatRoute);
app.use("/", todoRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
