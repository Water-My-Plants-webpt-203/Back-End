const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets/secret.js');
const bcryptjs = require('bcryptjs');
const userModel = require('../users/user-model.js')

const checkPayLoad = (req, res, next) => {
    if( !req.body.username || !req.body.password ){
        res.status(401).json( "Username and Password required" )
    } else {
        next();
    }
}

const checkusername = async (req, res, next) => {
    try{
        const user = await userModel.findUsername(req.body.username);
        if(user === undefined){
            next();
        } else {
            res.status(401).json({ message: "Username Taken" })
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}

router.post('/register', checkPayLoad, checkusername, async (req, res) => {
    const credentials = req.body;
    try{
        const hash = bcryptjs.hashSync(credentials.password, 10);
        credentials.password = hash;

        await userModel.insert(credentials);
        res.status(200).json({ message: "User Created" })
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.post('/login', checkPayLoad, async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await userModel.findByUsername(username);
        if(user && bcryptjs.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome, ${user.username}`, user_id:user.user_id, token: token })
        } else {
            res.status(401).json({ message: ' Invalid Credentials '})
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
})

const generateToken = (user) => {
    const options = {
        expiresIn: '1 day'
    };
    const payload = {
        user_id: user.user_id,
        username: user.username,
        password: user.password
    };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;