const jwt = require('jsonwebtoken');

function setToken (req, res){
    const user = req.body;
    const token = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    // console.log(token);

    res
    .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        partitioned: true,
    })
    .send({success: true, token});
}

function clearToken (req, res){
    const user = req.body;
    res
    .clearCookie('token',{maxAge: 0})
    .send({success: true});
}

module.exports = {
    setToken,
    clearToken
}