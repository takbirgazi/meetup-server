// middlewares 
const verifyToken = (req, res, next) => {
    console.log('inside verify token', req.headers?.authorization || null);
    // if (!req.headers.authorization) {
    //     return res.status(401).send({ message: 'unauthorized access' });
    // }
    // const token = req.headers.authorization.split(' ')[1];
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).send({ message: 'unauthorized access' })
    //     }
    //     req.decoded = decoded;
    next();
    // })
}

module.exports = { verifyToken };