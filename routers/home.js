const { setToken } = require("../services/tokenService");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("MeetUp microservice");
});

router.post("/jwt", setToken);

module.exports = router;
