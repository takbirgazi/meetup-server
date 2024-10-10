const jwt = require("jsonwebtoken");

// Dynamic import for livekit-server-sdk
let AccessToken;
(async () => {
  const livekit = await import("livekit-server-sdk");
  AccessToken = livekit.AccessToken;
})();

function setToken(req, res) {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  // console.log(token);

  res.send({ token });
}

const createToken = async (req, res) => {
  const roomName = req.body.roomName || "quickstart-room";
  const participantName = req.body.participantName || "participant";
  console.log(roomName, participantName)
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      ttl: "10m",
    }
  );
  at.addGrant({ roomJoin: true, room: roomName });

  try {
    const token = await at.toJwt();
    // console.log("Generated Livekit Token:", token); // Log the token

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};

module.exports = {
  setToken,
  createToken,
};
