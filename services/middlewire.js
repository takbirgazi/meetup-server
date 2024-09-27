// middlewares 
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    // console.log("token in the middleware ", token);
    if(!token){
        res.status(401).send({message: "Unauthorized Access!!"});
    }else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).send({message: "Unauthorized Access!!"});
            }
            req.user = decoded;
        })
    }
    next();
}

module.exports = { verifyToken };