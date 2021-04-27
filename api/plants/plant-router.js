const router = require('express').Router();
const restricted = require('../auth/auth-middleware.js');
const plantModel = require('../plants/plant-model.js');



router.get('/:plant_id', restricted,  async (req, res) => {
    try{
        const plant = await plantModel.findById(req.params.plant_id);
        res.status(200).json(plant);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.get('/:user_id/plants', restricted, async (req, res) => {
    try{
        const plant = await plantModel.findByUserId(req.params.user_id);
        res.status(200).json(plant);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.post('/:user_id/plants', restricted, async (req, res) => {
    try{
        await plantModel.insert(req.params.user_id, req.body);
        res.status(201).json({ message: "Plant created successfully."});
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.put('/:plant_id', restricted,  async (req, res) => {
    try{
        await plantModel.updateById(req.params.plant_id, req.body);
        res.status(201).json({ message: `Plant ${req.params.plant_id} was successfully updated.`})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:plant_id', restricted,  async (req, res) => {
    try{
        await plantModel.remove(req.params.plant_id);
        res.status(201).json({ message: `Plant ${req.params.plant_id} was successfully deleted.`})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;