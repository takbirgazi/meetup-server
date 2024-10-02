const jwt = require("jsonwebtoken");

function setToken(req, res) {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  // console.log(token);

  res.send({ token });
}

module.exports = {
  setToken,
};
