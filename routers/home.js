const { setToken, createToken } = require("../services/tokenService");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("MeetUp microservice");
});

router.post("/jwt", setToken);

router.get("/getToken", createToken);
// post Livekit token route
router.post("/getToken", createToken);

module.exports = router;
