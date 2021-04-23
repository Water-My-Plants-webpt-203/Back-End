const router = require('express').Router();
const userModel = require('./user-model.js');
const restricted = require('../auth/auth-middleware.js');


router.get('/:id', restricted, async ( req, res ) =>{
    try{
        const user = await userModel.findById(req.params.id);
        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;