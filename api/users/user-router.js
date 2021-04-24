const router = require('express').Router();
const userModel = require('./user-model.js');
const restricted = require('../auth/auth-middleware.js');
const bcryptjs = require('bcryptjs');

const checkinfo = ( req, res, next ) => {
    if( !req.body.password ){
        res.status(401).json("Password required")
    } else {
        next();
    }
}


router.get('/:id', restricted, async ( req, res ) =>{
    try{
        const user = await userModel.findById(req.params.id);
        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', restricted, checkinfo, async (req, res) => {
    try{
        const hash = bcryptjs.hashSync(req.body.password, 10);
        req.body.password = hash;

        await userModel.updateById(req.params.id, req.body);
        res.status(201).json({ message: "User updated successfully."});
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;