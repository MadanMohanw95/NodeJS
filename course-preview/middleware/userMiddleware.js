const { User } = require('../mongo');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')

const userMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")
    const decodedValue = jwt.verify(token[1], JWT_SECRET);
    if (decodedValue.username) {
        next();
    } else {
        res.status(403).json({msg: "You are not authenticated"})
    }
}


module.exports = userMiddleware