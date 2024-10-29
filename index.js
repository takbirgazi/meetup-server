const express = require("express");
require("dotenv").config();
const cors = require("cors");
const home = require("./routers/home");
const userRoute = require("./routers/user");
const meetingRoute = require("./routers/meeting");
const todoRoute = require("./routers/todo");
const workspace = require("./routers/workspace");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://meetup-9da89.web.app" ,"https://meetup-d48c4.web.app"],
    credentials: true,
  })
);

// Routes
app.use("/", home);
app.use("/", userRoute);
app.use("/", meetingRoute);
app.use("/", todoRoute);
app.use("/", workspace);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
