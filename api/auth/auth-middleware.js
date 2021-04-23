const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../secrets/secret.js");

const restricted = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(token){
            jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
                if(error){
                    res.status(401).json({ message: 'Token Invalid!!' })
                }else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({ message: 'Token Required!!' })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: ' Error Validating Credentials '})
    }
}

module.exports = restricted;